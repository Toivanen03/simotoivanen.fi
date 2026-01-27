import { useState, useEffect } from 'react'
import errorHandler from '../middleware/errorHandler'
import { BLOGS, NEW_BLOG, UPDATE_BLOG, GET_BLOG } from '../../schema/queries'
import { useMutation, useQuery } from '@apollo/client'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const BlogForm = ({ setConfirmTitle, setOnConfirm }) => {
    const { currentUser } = useContext(AuthContext)
    const location = useLocation()
    const newblog = location.state?.newblog ?? true
    const blogId = location.state?.id
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [content, setContent] = useState('')

    const { data } = useQuery(GET_BLOG, {
        variables: { id: blogId },
        skip: newblog,
    })

    useEffect(() => {
        if (currentUser.username === 'test@simotoivanen.fi') {
            setTitle('TESTIOTSIKKO, ei voi muuttaa')
        }
    }, [currentUser])

    useEffect(() => {
        if (!newblog && data?.getBlog) {
            setTitle(data.getBlog.title || '')
            setSubtitle(data.getBlog.subtitle || '')
            setContent(data.getBlog.content || '')
        }
    }, [data, newblog])

    const [sendBlog] = useMutation(NEW_BLOG, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
    })

    const [updateBlog] = useMutation(UPDATE_BLOG, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        refetchQueries: [{ query: BLOGS }]
    })

    const submitNew = async (event) => {
        event.preventDefault()
        await sendBlog({
            variables: { title, subtitle, content }
        })
        if (currentUser.username !== 'test@simotoivanen.fi') {
            setConfirmTitle('BlogOk')
        } else {
            setConfirmTitle('BlogOkTester')
        }
        setOnConfirm(() => () => {})
        setTitle('')
        setSubtitle('')
        setContent('')
        sendEmailNotification({ title, subtitle, content })
        navigate(-1)
    }

    const submitChanges = async (event) => {
        event.preventDefault()
        await updateBlog({
            variables: { id: blogId, title, subtitle, content }
        })
        if (currentUser.username !== 'test@simotoivanen.fi') {
            setConfirmTitle('BlogUpdate')
        } else {
            setConfirmTitle('BlogUpdateTester')
        }
        setOnConfirm(() => () => {})
        setTitle('')
        setSubtitle('')
        setContent('')
        navigate(-1)
    }

    const sendEmailNotification = async (blogData) => {
        try {
            const response = await fetch('/api/blogsender', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            })

            if (!response.ok) {
                const errorData = await response.json()
                errorHandler(setConfirmTitle, errorData.error)
            } else {
                if (currentUser.username !== 'test@simotoivanen.fi') {
                    setConfirmTitle('MailSent')
                }
            }
        } catch (error) {
            errorHandler(setConfirmTitle, 'Verkkovirhe tai palvelin ei vastaa')
        }
    }

    return (
        <div className="container text-center">
            {newblog ? (<h2 className='mt-5'>Kirjoita blogi</h2>) : (<h2 className='mt-5'>Muokkaa blogia</h2>)}
            <form className="row justify-content-center mt-5">
                <div className="col-12 col-md-6 mb-3">
                    {currentUser.username === 'test@simotoivanen.fi' ? (
                        <input
                            value='TESTIOTSIKKO, ei voi muuttaa'
                            readOnly
                            className="form-control"
                        />
                    ) : (
                        <input
                            value={title}
                            placeholder='Otsikko'
                            onChange={({ target }) => setTitle(target.value)}
                            className="form-control"
                        />
                    )}
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <input
                        value={subtitle}
                        placeholder='Alaotsikko'
                        onChange={({ target }) => setSubtitle(target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <textarea
                        value={content}
                        placeholder='Sisältö'
                        onChange={({ target }) => setContent(target.value)}
                        rows={5}
                        className="form-control"
                    />
                </div>
                {newblog ? (
                    <div className="col-12 col-md-6">
                        <button
                            type='button'
                            className="btn btn-primary w-100"
                            onClick={submitNew}>Lähetä</button>
                    </div>
                ) : (
                    <div className="col-12 col-md-6">
                        <button
                            type='button'
                            className="btn btn-primary w-100"
                            onClick={submitChanges}>Tallenna muutokset</button>
                    </div>
                )}
            </form>
        </div>
        )
}

export default BlogForm