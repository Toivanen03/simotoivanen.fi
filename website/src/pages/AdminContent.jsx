import UserModal from '../modals/UserModal'
import { FaTrash, FaLock, FaLink } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const AdminContent = ({
    loading, error, logData, logLoading, logError, blogData, blogLoading, blogError,
    selectedUser, toggleAdminStatus, deleteUserFunction, deleteBlogFunction, userModal,
    selectBlogs, editBlog, handleDeleteMany, HandleClearLogs, adminCount, usersState,
    selectedBlogs, blogsToDelete, currentUser
}) => {

    const [showCount, setShowCount] = useState(10)

    const logsToShow = logData?.logs
        ?.slice()
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .slice(0, showCount)

    return (
        <div className="container">
            <h2 className='mt-5'>Käyttäjät</h2>
            <div className="row justify-content-center">
                <div className='col-md-10 mt-5 add-user-column'>
                    {loading && <p>Ladataan käyttäjiä...</p>}
                    {error && <p>Virhe käyttäjien haussa</p>}
                        <div className='row user-form-headers'>
                            <div className='col-4'>
                                id
                            </div>
                            <div className='col-3'>
                                Käyttäjänimi
                            </div>
                            <div className='col-1'>
                                Rooli
                            </div>
                            <div className='col-1'>
                                Poista
                            </div>
                            <div className='col-1 text-center'>
                                Admin
                            </div>
                            <div className='col-1 text-center'>
                                Lupa?
                            </div>
                        </div>
                        {usersState.map(user => {
                            const isCurrentUser = user.id === currentUser.id

                            return (
                            <div key={user.id} className='row user-form-content'>
                                {currentUser.username !== 'test@simotoivanen.fi' ? (
                                    <div className={isCurrentUser ? 'fw-bold col-4' : 'col-4'}>
                                        <span onClick={() => userModal(user)} style={{ cursor: 'pointer' }}>{user.id}</span>
                                    </div>
                                ) : (
                                    <div className={isCurrentUser ? 'fw-bold col-4' : 'col-4'}>
                                        <span style={{ cursor: 'pointer' }}>{'Piilotettu testikäyttäjältä'}</span>
                                    </div>
                                )}
                                {currentUser.username !== 'test@simotoivanen.fi' ? (
                                    <div className={isCurrentUser ? 'fw-bold col-3' : 'col-3'}>
                                        <span onClick={() => userModal(user)} style={{ cursor: 'pointer' }}>{user.username}</span>
                                    </div>
                                ) : (
                                    <div className={isCurrentUser ? 'fw-bold col-3' : 'col-3'}>
                                        <span style={{ cursor: 'pointer' }}>{'Piilotettu testikäyttäjältä'}</span>
                                    </div>
                                )}
                                <div className={isCurrentUser ? 'fw-bold col-1' : 'col-1'}>
                                    {user.admin ? 'Admin' : 'User'}
                                </div>
                                <div className='col-1 text-center'>
                                    {(user.admin && adminCount === 1) || user.id === currentUser.id ? (
                                        <span className="text-muted" title={
                                            user.admin && adminCount === 1
                                                ? "Et voi poistaa ainoaa adminia"
                                                : "Et voi poistaa itseäsi"
                                        }>
                                            <FaLock style={{ width: 'auto', height: 'auto'}} />
                                        </span>
                                    ) : (
                                        <FaTrash
                                            className='btn btn-danger'
                                            style={{ width: 'auto', height: 'auto', cursor: 'pointer' }}
                                            onClick={() => deleteUserFunction(user)}
                                        />
                                    )}
                                </div>
                                <div className='col-1'>
                                    <label className="d-flex justify-content-center" style={{ marginTop: "-0.5em" }}>
                                        {(user.id === currentUser.id || (user.admin && adminCount === 1)) ? (
                                        <span className="text-muted" title={
                                            user.id === currentUser.id
                                            ? "Et voi muuttaa omaa admin-statustasi"
                                            : "Et voi poistaa ainoaa adminia"
                                        }>
                                            <FaLock style={{ width: 'auto', height: 'auto', marginTop: "0.9em" }} />
                                        </span>
                                        ) : (
                                        <input
                                            type="checkbox"
                                            checked={user.admin}
                                            onChange={() => toggleAdminStatus(user.id, user.admin)}
                                        />
                                        )}
                                    </label>
                                </div>
                                <div className='col-1 text-center' style={{ marginTop: "-0.5em" }}>
                                    <input
                                        type="checkbox"
                                        checked={user.emailConsent}
                                        disabled
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {selectedUser && <UserModal user={selectedUser} />}

            <h2 className='mt-5'>Blogit</h2>
            <div className="row justify-content-center">
                <div className='col-md-10 mt-2 add-user-column' style={{padding: '40px'}}>
                    {blogLoading && <p>Ladataan blogeja...</p>}
                    {blogError && <p>Virhe blogien haussa</p>}
                        <div className='row user-form-headers'>
                            <div className='col-3'>
                                id
                            </div>
                            <div className='col-3'>
                                Otsikko
                            </div>
                            <div className='col-3'>
                                Alaotsikko
                            </div>
                            <div className='col-1'>
                                Linkki
                            </div>
                            <div className='col-1'>
                                Poista
                            </div>
                            <div className='col-1'>
                                Valitse
                            </div>
                        </div>
                        {blogData?.blogs?.map(blog => 
                            <div key={blog.id} className='row user-form-content'>
                                <div className='col-3'>
                                    <span>{blog.id}</span>
                                </div>
                                <div className='col-3'>
                                    {blog.title}
                                </div>
                                <div className='col-3'>
                                    {blog.subtitle.split(' ')[0] + '...'}
                                </div>
                                <div className='col-1'>
                                    <Link to={`/blog/${blog.id}`}>
                                        <FaLink
                                            className='btn'
                                            style={{ width: 'auto', height: 'auto', cursor: 'pointer' }}
                                        />
                                    </Link>
                                </div>
                                <div className='col-1 text-center'>
                                    <FaTrash
                                        className='btn btn-danger'
                                        style={{ width: 'auto', height: 'auto', cursor: 'pointer' }}
                                        onClick={() => deleteBlogFunction(blog)}
                                    />
                                </div>
                                <div className='col-1 text-center'>
                                    <input
                                        type="checkbox"
                                        style={{ marginTop: '5px' }}
                                        onChange={(e) => selectBlogs(blog.id, e.target.checked)}
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="row mt-4 mb-5 gap-5 justify-content-center">
            {selectedBlogs.length !== 1 ? (
                <div className="col-auto">
                    <Link to="/blogform" state={{ newblog: true }}>
                        <button type="button" className="btn btn-primary">
                            Luo blogi
                        </button>
                    </Link>
                </div>
                ) : (
                <div className="col-auto">
                    <button type="button"
                        className="btn btn-primary"
                        onClick={editBlog}
                    >
                        Muokkaa blogia
                    </button>
                </div>
                )}
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-danger"
                        style={{ minWidth: 'fit-content'}}
                        disabled={blogsToDelete.length === 0}
                        onClick={handleDeleteMany}
                    >
                    <small>Poista valitut blogit</small>
                    </button>
                </div>
            </div>

            <div className='mt-5' style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <h2>Backend-lokit</h2>
                <span>(24h)</span>
            </div>
            <div className="row justify-content-center">
                <div className='col-md-8 mt-2 mb-4 add-user-column' style={{padding: '40px'}}>
                    {logLoading && <p>Ladataan lokeja...</p>}
                    {logError && <p>Virhe lokien haussa</p>}
                    {logsToShow?.map((log, index) => (
                    <div className="row" key={index}>
                        <div className='col-2'>
                            {(logData.logs.length - index) + '.'}
                        </div>
                        <div className="col-5">
                            <div className='row'>
                            Pvm: {new Date(Number(log.createdAt)).toLocaleDateString('fi-FI')}
                            </div>
                            <div className='row'>
                            Klo: {new Date(Number(log.createdAt)).toLocaleTimeString('fi-FI')}
                            </div>
                            <br />
                        </div>
                        <div className="col-5">
                            <p>{log.content}</p>
                        </div>
                    </div>
                ))}
                </div>
                <div className="row mb-4 d-flex justify-content-center">
                    <div className='col-auto'>
                        {logData?.logs?.length > 10 && (
                        <button
                            onClick={() => setShowCount(showCount === 10 ? 100 : 10)}
                            className="btn btn-primary"
                        >
                            {showCount === 10 ? 'Näytä 100' : 'Näytä 10'}
                        </button>
                        )}
                    </div>
                    <div className='col-auto'>
                        {showCount === 100 && (
                        <button
                            onClick={() => setShowCount(Infinity)}
                            className="btn btn-primary"
                        >
                            Näytä kaikki
                        </button>
                        )}
                    </div>
                    <div className='col-auto'>
                        <button
                            type="button"
                            className="btn btn-danger"
                            disabled={logData?.logs?.length === 0}
                            onClick={HandleClearLogs}
                        >
                        <small>Tyhjennä lokitiedot</small>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminContent