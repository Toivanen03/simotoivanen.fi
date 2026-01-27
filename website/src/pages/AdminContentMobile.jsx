import UserModal from '../modals/UserModal'
import { FaTrash, FaLock, FaLink } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminContentMobile = ({
    loading, error, blogData, blogLoading, blogError,
    selectedUser, toggleAdminStatus, deleteUserFunction, deleteBlogFunction, userModal,
    selectBlogs, editBlog, handleDeleteMany, adminCount, usersState,
    selectedBlogs, blogsToDelete, currentUser
}) => {
    
    return (
    <div className="container" style={{ minWidth: '100%'}}>
        <h2 className='mt-5'>Käyttäjät</h2>
        <div className="row justify-content-center">
            <div className='col-12 mt-4'>
                {loading && <p>Ladataan käyttäjiä...</p>}
                {error && <p>Virhe käyttäjien haussa</p>}
                <div style={{
                        overflowX: 'scroll',
                        WebkitOverflowScrolling: 'touch',
                        width: '100vw',
                        maxWidth: '100%',
                        whiteSpace: 'nowrap',
                    }}>
                    <div style={{ minWidth: '850px', fontSize: '0.9rem' }}>
                        <div className='d-flex fw-bold user-form-headers border-bottom pb-1'>
                            <div className='me-3' style={{ width: '250px' }}>id</div>
                            <div className='me-3' style={{ width: '250px' }}>Käyttäjänimi</div>
                            <div className='me-3' style={{ width: '100px' }}>Rooli</div>
                            <div className='me-3 text-center' style={{ width: '70px' }}>Poista</div>
                            <div className='me-3 text-center' style={{ width: '70px' }}>Admin</div>
                            <div className='text-center' style={{ width: '70px' }}>Lupa?</div>
                        </div>

                        {usersState.map(user => {
                            const isCurrentUser = user.id === currentUser.id
                            return (
                                <div key={user.id} className='d-flex align-items-center border-bottom py-1 user-form-content'>
                                    {currentUser.username !== 'test@simotoivanen.fi' ? (
                                        <div className={`me-3 ${isCurrentUser ? 'fw-bold' : ''}`} style={{ width: '250px' }}>
                                            <span onClick={() => userModal(user)} style={{ cursor: 'pointer' }}>{user.id}</span>
                                        </div>
                                    ) : (
                                        <div className={`me-3 ${isCurrentUser ? 'fw-bold' : ''}`} style={{ width: '250px' }}>
                                            <span style={{ cursor: 'pointer' }}>{'Piilotettu testikäyttäjältä'}</span>
                                        </div>
                                    )}
                                    {currentUser.username !== 'test@simotoivanen.fi' ? (
                                        <div className={`me-3 ${isCurrentUser ? 'fw-bold' : ''}`} style={{ width: '250px' }}>
                                            <span onClick={() => userModal(user)} style={{ cursor: 'pointer' }}>{user.username}</span>
                                        </div>
                                    ) : (
                                        <div className={`me-3 ${isCurrentUser ? 'fw-bold' : ''}`} style={{ width: '250px' }}>
                                            <span style={{ cursor: 'pointer' }}>{'Piilotettu testikäyttäjältä'}</span>
                                        </div>
                                    )}

                                    <div className={`me-3 ${isCurrentUser ? 'fw-bold' : ''}`} style={{ width: '100px' }}>
                                        {user.admin ? 'Admin' : 'User'}
                                    </div>

                                    <div className='me-3 d-flex justify-content-center align-items-center' style={{ width: '70px', height: '100%' }}>
                                        {(user.admin && adminCount === 1) || user.id === currentUser.id ? (
                                            <FaLock title="Et voi poistaa tätä käyttäjää" />
                                        ) : (
                                            <FaTrash className='btn-icon text-danger' onClick={() => deleteUserFunction(user)} />
                                        )}
                                    </div>

                                    <div className='me-3 d-flex justify-content-center align-items-center' style={{ width: '70px', height: '100%' }}>
                                        {(user.id === currentUser.id || (user.admin && adminCount === 1)) ? (
                                            <FaLock title="Et voi muuttaa admin-statusta" />
                                        ) : (
                                            <input type="checkbox" checked={user.admin} onChange={() => toggleAdminStatus(user.id, user.admin)} />
                                        )}
                                    </div>

                                    <div className='d-flex justify-content-center align-items-center' style={{ width: '70px', height: '100%' }}>
                                        <input type="checkbox" checked={user.emailConsent} disabled />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

        {selectedUser && <UserModal user={selectedUser} />}

        <h2 className='mt-5'>Blogit</h2>
        <div className="row justify-content-center">
            <div className='col-12 mt-4'>
                {blogLoading && <p>Ladataan blogeja...</p>}
                {blogError && <p>Virhe blogien haussa</p>}

                <div style={{
                    overflowX: 'scroll',
                    WebkitOverflowScrolling: 'touch',
                    width: '100vw',
                    maxWidth: '100%',
                    whiteSpace: 'nowrap',
                }}>
                    <div style={{ minWidth: '850px', fontSize: '0.9rem' }}>
                        <div className='d-flex fw-bold user-form-headers border-bottom pb-1'>
                            <div className='me-3' style={{ width: '250px' }}>id</div>
                            <div className='me-3' style={{ width: '200px' }}>Otsikko</div>
                            <div className='me-3' style={{ width: '200px' }}>Alaotsikko</div>
                            <div className='me-3 text-center' style={{ width: '70px' }}>Linkki</div>
                            <div className='me-3 text-center' style={{ width: '70px' }}>Poista</div>
                            <div className='text-center' style={{ width: '70px' }}>Valitse</div>
                        </div>

                        {blogData?.blogs?.map(blog =>
                            <div key={blog.id} className='d-flex align-items-center border-bottom py-1 user-form-content'>
                                <div className='me-3' style={{ width: '250px' }}>{blog.id}</div>

                                <div className='me-3' style={{ width: '200px' }}>
                                    {blog.title.split(' ')[0] + '...'}
                                </div>

                                <div className='me-3' style={{ width: '200px' }}>
                                    {blog.subtitle?.split(' ')[0] + '...'}
                                </div>

                                <div className='me-3 d-flex justify-content-center align-items-center' style={{ width: '70px', height: '100%' }}>
                                    <Link to={`/blog/${blog.id}`}>
                                        <FaLink className='btn-icon' />
                                    </Link>
                                </div>

                                <div className='me-3 d-flex justify-content-center align-items-center' style={{ width: '70px', height: '100%' }}>
                                    <FaTrash className='btn-icon text-danger' onClick={() => deleteBlogFunction(blog)} />
                                </div>

                                <div className='d-flex justify-content-center align-items-center' style={{ width: '70px', height: '100%' }}>
                                    <input type="checkbox" onChange={(e) => selectBlogs(blog.id, e.target.checked)} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="row justify-content-center mt-4 mb-5">
            <div className='col-12 col-md-10 mt-2 p-3'>
                <div className="row mb-4 mt-4 d-flex justify-content-center align-items-center">
                {selectedBlogs.length !== 1 ? (
                    <div className='col-6 text-center mb-2'>
                        <Link to="/blogform" state={{ newblog: true }}>
                            <button type='button' className='btn btn-primary'>
                                Luo blogi
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="col-6 text-center mb-2">
                        <button type="button"
                            className="btn btn-primary"
                            disabled={selectedBlogs.length === 0}
                            onClick={editBlog}
                        >
                            Muokkaa blogia
                        </button>
                    </div>
                )}
                    <div className="col-6 text-center mb-2">
                        <button
                            type='button'
                            className='btn btn-danger'
                            disabled={blogsToDelete.length === 0} 
                            onClick={() => handleDeleteMany()}>
                                Poista valitut blogit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminContentMobile