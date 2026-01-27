import { useMutation, useQuery } from '@apollo/client'
import { useState, useEffect, useContext } from 'react'
import { DELETE_USER, USERS, UPDATE_USER, BLOGS, DELETE_BLOG, DELETE_MANY } from '../../schema/queries'
import { AuthContext } from '../contexts/AuthContext'
import errorHandler from '../middleware/errorHandler'
import { Modal } from 'bootstrap'
import { useNavigate } from 'react-router-dom'
import AdminContent from './AdminContent'
import AdminContentMobile from './AdminContentMobile'

const Admin = ({ setConfirmTitle, setOnConfirm, isMobile }) => {
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const [usersState, setUsersState] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [blogsToDelete, setBlogsToDelete] = useState([])
    const [selectedBlogs, setSelectedBlogs] = useState([])

    const { data, loading, error, refetch } = useQuery(USERS, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
    })

    const { data: blogData, loading: blogLoading, error: blogError } = useQuery(BLOGS, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
    })

    useEffect(() => {
        if (currentUser?.admin) {
            refetch()
        }
        if (data?.users) {
            setUsersState(data.users)
        }
    }, [data, currentUser])

    useEffect(() => {
        if (blogsToDelete.length === 1) {
            setSelectedBlogs([blogsToDelete[0]])
        } else {
            setSelectedBlogs([])
        }
    }, [blogsToDelete])

    const [toggleAdmin] = useMutation(UPDATE_USER, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
    })

    const toggleAdminStatus = async (id, currentStatus) => {
        const newStatus = !currentStatus
        if (id !== currentUser.id) {
            setUsersState(prev =>
                prev.map(user =>
                    user.id === id ? { ...user, admin: newStatus } : user
                )
            )
            try {
                await toggleAdmin({ variables: { id, admin: newStatus } })
            } catch (error) {
                setConfirmTitle(`Virhe: ${error}`)
                setUsersState(prev =>
                    prev.map(user =>
                        user.id === id ? { ...user, admin: currentStatus } : user
                    )
                )
            }
        } else {
            setConfirmTitle("AdminRemove")
        }
    }

    const [deleteUser] = useMutation(DELETE_USER, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        onCompleted: () => {
            setConfirmTitle('UserRemoved')
            setOnConfirm(() => () => {})
        },
        refetchQueries: [{ query: USERS }]
    })

    const [deleteBlog] = useMutation(DELETE_BLOG, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        onCompleted: () => {
            setConfirmTitle('BlogRemoved')
            setOnConfirm(() => () => {})
        },
        refetchQueries: [{ query: BLOGS }]
    })

    const deleteUserFunction = async (user) => {
        let nameToDisplay = user.username
        if (user.id !== currentUser.id) {
            if (currentUser.username === 'test@simotoivanen.fi') {
                nameToDisplay = 'nimi piilotettu testikäyttäjältä'
            }
            setConfirmTitle(`Haluatko poistaa käyttäjän ${nameToDisplay}?`)
            setOnConfirm(() => () => {
                deleteUser({ variables: { id: user.id } })
            })
        } else {
            setConfirmTitle('SelfRemove')
        }
    }

    const deleteBlogFunction = async (blog) => {
        setConfirmTitle(`Haluatko poistaa blogin ${blog.title}?`)
        setOnConfirm(() => () => {
            deleteBlog({ variables: { id: blog.id } })
        })
    }

    const userModal = (user) => {
        setSelectedUser(user)
        setTimeout(() => {
            const modalElement = document.getElementById('UserModal')
            if (modalElement) {
                const modal = Modal.getInstance(modalElement) || new Modal(modalElement)
                modal.show()
            }
        }, 0)
    }

    const selectBlogs = (id, checked) => {
        if (checked) {
            setBlogsToDelete(prev => [...prev, id])
        } else {
            setBlogsToDelete(prev => prev.filter(blogId => blogId !== id))
        }
    }

    const editBlog = () => {
        navigate("/blogform", { state: { newblog: false, id: selectedBlogs[0] } })
    }

    const handleDeleteMany = () => {
        if (blogsToDelete.length > 0) {
            setConfirmTitle(`Haluatko poistaa ${blogsToDelete.length} blogia?`)
            try {
                setOnConfirm(() => () => {
                    deleteMany({ variables: { blogIds: blogsToDelete } })
                })
            } catch (error) {
                setConfirmTitle(`Virhe: ${error}`)
            }
        } else {
            setConfirmTitle('NoBlogs')
        }
    }

    const [deleteMany] = useMutation(DELETE_MANY, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        onCompleted: (data) => {
            const returnValue = ['BlogsRemoved', data.deleteMany.deletedCount]
            setBlogsToDelete([])
            setConfirmTitle(returnValue)
            setOnConfirm(() => () => {})
        },
        refetchQueries: [{ query: BLOGS }]
    })

    const adminCount = usersState.filter(u => u.admin).length

    return (
        <>
        {!isMobile ?
        (<AdminContent
            adminCount={adminCount} usersState={usersState} loading={loading} error={error}
            blogData={blogData} blogLoading={blogLoading} blogError={blogError}
            selectedUser={selectedUser} toggleAdminStatus={toggleAdminStatus}
            deleteUserFunction={deleteUserFunction} deleteBlogFunction={deleteBlogFunction}
            userModal={userModal} selectBlogs={selectBlogs} editBlog={editBlog}
            handleDeleteMany={handleDeleteMany} selectedBlogs={selectedBlogs}
            blogsToDelete={blogsToDelete} currentUser={currentUser}
        />
        ) : (<AdminContentMobile
            adminCount={adminCount} usersState={usersState} loading={loading} error={error}
            blogData={blogData} blogLoading={blogLoading} blogError={blogError}
            selectedUser={selectedUser} toggleAdminStatus={toggleAdminStatus}
            deleteUserFunction={deleteUserFunction} deleteBlogFunction={deleteBlogFunction}
            userModal={userModal} selectBlogs={selectBlogs} editBlog={editBlog}
            handleDeleteMany={handleDeleteMany} selectedBlogs={selectedBlogs}
            blogsToDelete={blogsToDelete} currentUser={currentUser}
        />
        )}
        </>
    )
}

export default Admin