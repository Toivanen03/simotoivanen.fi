import { ADD_USER, USERS } from '../../schema/queries'
import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Modal } from 'bootstrap'
import errorHandler from '../middleware/errorHandler'
import { AuthContext } from '../contexts/AuthContext'
    
const RegisterModal = ({ setConfirmTitle }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameConfirm, setUsernameConfirm] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailConsent, setEmailConsent] = useState(false)
    const { login } = useContext(AuthContext)

    const submit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword || username !== usernameConfirm) {
            setConfirmTitle('NoMatchPwd')
            return
        }
        addUser({ variables: { username, password, emailConsent } })
    }

    const [addUser] = useMutation(ADD_USER, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        onCompleted: (data) => {
            setConfirmTitle(`Käyttäjätunnus ${data.createUser.user.username} luotu!`)
            login(data.createUser.value)
            closeModal()
        },
        refetchQueries: [{ query: USERS }],
    })

    const closeModal = () => {
        setUsername('')
        setUsernameConfirm('')
        setPassword('')
        setConfirmPassword('')
        Modal.getInstance(document.getElementById("RegisterModal")).hide()
    }

    return (
        <div className="modal custom-modal-animate" id="RegisterModal" tabIndex="-1" aria-labelledby="RegisterModalLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content glow">
                    <div className="modal-header">
                        <h5 className="modal-title" id="RegisterModalLabel">Luo käyttäjätunnus</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <form onSubmit={submit} className="col-md-12 mt-2 mb-5 add-user-column text-center">
                            <div>
                                <input
                                    value={username}
                                    placeholder='Sähköposti'
                                    onChange={({ target }) => setUsername(target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    value={usernameConfirm}
                                    placeholder='Sähköposti uudelleen'
                                    onChange={({ target }) => setUsernameConfirm(target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type='password'
                                    placeholder='Salasana'
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                />
                            </div>
                            <div className='mb-2'>
                                <input
                                    type='password'
                                    placeholder='Salasana uudelleen'
                                    value={confirmPassword}
                                    onChange={({ target }) => setConfirmPassword(target.value)}
                                />
                            </div>
                            <br />
                            <div>
                                <div style={{lineHeight: '1px'}}>
                                    <span style={{marginRight: '10px'}}>Ilmoitus sähköpostiini uusista blogeista:</span>
                                    <input
                                        type='checkbox'
                                        checked={emailConsent}
                                        onChange={() => setEmailConsent(!emailConsent)}
                                    />
                                </div>
                                <br />
                                <small>Voit peruuttaa tilauksen profiilisivultasi milloin tahansa.</small>
                            </div>
                            <div>
                                <button type='submit' className="btn btn-primary">Luo tunnukset</button>
                            </div>
                        </form>
                        <div>
                            <button onClick={closeModal} className="btn btn-primary">Sulje</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal