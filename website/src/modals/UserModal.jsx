import { Modal } from 'bootstrap'
import { useQuery } from '@apollo/client'
import { GET_USER_MESSAGES } from '../../schema/queries'

const UserModal = ({ user, isMobile }) => {
    const { data, loading, error } = useQuery(GET_USER_MESSAGES, {
        variables: { id: user.id }
    })

    const cancel = () => {
        Modal.getInstance(document.getElementById("UserModal")).hide()
    }

    return (
        <div className="modal custom-modal-animate" id="UserModal" tabIndex="-1" aria-labelledby="UserModalLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content glow">
                    <div className="modal-header">
                        <h5 className="modal-title" id="UserModalLabel">Käyttäjän tiedot</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {!isMobile ? (
                    <div className="modal-body container">
                        <div className='row mt-2'>
                            <div className='col-4'>
                                <span className='small'>Käyttäjän ID:</span>
                            </div>
                            <div className='col-4'>
                                <span className='small'>{user.id}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-4'>
                                Sähköposti:
                            </div>
                            <div className='col-4'>
                                <a href={`mailto:${user.username}`}>{user.username}</a>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-4 '>
                                Admin:
                            </div>
                            <div className='col-4'>
                                {!user.admin ? 'Ei' : 'Kyllä'}
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-4 '>
                                Puhelin:
                            </div>
                            <div className='col-4'>
                                {user.phone}
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-4 '>
                                Muuta:
                            </div>
                            <div className='col-4'>
                                {user.about}
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-4 '>
                                Viestit:
                            </div>
                            <div className='col-4'>
                               {loading ? "Ladataan..." : error ? "Virhe haettaessa" : (
                                data?.user?.messages?.length > 0
                                    ? (
                                    <ul>
                                        {data.user.messages.map(msg => (
                                        <li key={msg.id}>
                                            {msg.message} <br />
                                            <small>{new Date(Date.parse(msg.createdAt)).toLocaleString()}</small>
                                        </li>
                                        ))}
                                    </ul>
                                    ) : "Ei viestejä"
                                )}
                            </div>
                        </div>

                        <div className='text-center mt-4'>
                            <button className='btn btn-primary' onClick={cancel}>Sulje</button>
                        </div>

                    </div>
                ) : (
                    <div style={{
                        overflowX: 'scroll',
                        WebkitOverflowScrolling: 'touch',
                        width: '100vw',
                        maxWidth: '100%',
                        whiteSpace: 'nowrap',
                        }}>
                        <div style={{ minWidth: '850px', fontSize: '0.9rem', padding: '20px' }}>
                            <div className='d-flex fw-bold user-form-headers border-bottom pb-1'>
                                <div className='row'>
                                    <div className='me-3' style={{ width: '250px' }}>
                                        Käyttäjän ID:
                                    </div>
                                    <div className='me-3' style={{ width: '250px' }}>
                                        {user.id}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='me-3' style={{ width: '250px' }}>
                                        Sähköposti:
                                    </div>
                                    <div className='me-3' style={{ width: '250px' }}>
                                        <a href={`mailto:${user.username}`}>{user.username}</a>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='me-3' style={{ width: '120px' }}>
                                        Admin:
                                    </div>
                                    <div className='me-3' style={{ width: '120px' }}>
                                        {user.admin ? 'Kyllä' : 'Ei'}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='me-3' style={{ width: '200px' }}>
                                        Puhelin:
                                    </div>
                                    <div className='me-3' style={{ width: '200px' }}>
                                        {user.phone}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='me-3' style={{ width: '200px' }}>
                                        Muuta:
                                    </div>
                                    <div style={{
                                            width: '200px',
                                            flexShrink: 0,
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                        {user.about}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='me-3' style={{ width: '200px' }}>
                                        Viestit:
                                    </div>
                                    <div style={{
                                        width: '200px',
                                        flexShrink: 0,
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap'
                                        }}>
                                        {loading ? "Ladataan..." : error ? "Virhe haettaessa" : (
                                        data?.user?.messages?.length > 0
                                            ? (
                                            <ul>
                                                {data.user.messages.map(msg => (
                                                <li key={msg.id}>
                                                    {msg.message} <br />
                                                    <small>{new Date(Date.parse(msg.createdAt)).toLocaleString()}</small>
                                                </li>
                                                ))}
                                            </ul>
                                            ) : "Ei viestejä"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserModal