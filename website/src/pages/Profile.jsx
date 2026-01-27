import { ME, UPDATE_PASSWORD, UPDATE_USER } from "../../schema/queries"
import { useQuery, useMutation } from "@apollo/client"
import { useState, useEffect, useContext } from 'react'
import errorHandler from '../middleware/errorHandler'
import ModalButton from "../modals/ModalButton"
import { updateUserSchema, updatePasswordSchema } from '../../schema/validateUserData'
import { useLocation } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Spinner from '../middleware/spinner'
import ErrorDiv from '../middleware/errorDiv'

const Profile = ({ setConfirmTitle, isMobile }) => {
    const [phone, setPhone] = useState('')
    const [about, setAbout] = useState('')
    const [password, setPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailConsent, setEmailConsent] = useState(false)
    const [admin] = useState(false)
    const location = useLocation()
    const ref = new URLSearchParams(location.search).get('ref')
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
        const { data, loading, error, refetch } = useQuery(ME, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
    })

    useEffect(() => {
        if (currentUser && ref && currentUser.username !== ref) {
            navigate('/unauthorized')
        }
    }, [currentUser, ref])

    useEffect(() => {
        if (data?.me?.emailConsent !== undefined) {
            setEmailConsent(data.me.emailConsent)
        }
    }, [data])

    const [updatePassword] = useMutation(UPDATE_PASSWORD, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        onCompleted: () => {
            setConfirmTitle('PwdUpdate')
            setCurrentPassword('')
            setPassword('')
            setConfirmPassword('')
        },
    })

    const [updateUser] = useMutation(UPDATE_USER, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        onCompleted: () => {
            setPhone('')
            setAbout('')
        },
    })

    const myProfile = data?.me

    const handleProfileUpdate = (event) => {
        event.preventDefault()

        const phoneFormatted = handlePhone(phone)

        const validation = updateUserSchema.safeParse({
            phone: phoneFormatted,
            about,
        })

        if (!validation.success) {
            const errorMessages = validation.error.issues.map(e => e.message).join('\n')
            errorHandler(setConfirmTitle, errorMessages)
            return
        }

        if (window.confirm('Haluatko päivittää tietosi?')) {
            const oldAbout = myProfile?.about?.trim() || ''
            const newInput = about.trim()
            const newAbout = [oldAbout, newInput].filter(Boolean).join('\n')

            updateUser({
                variables: {
                    id: myProfile.id,
                    username: myProfile.username,
                    admin: admin,
                    phone: phoneFormatted,
                    about: newAbout,
                    emailConsent: emailConsent,
                },
            })
            setConfirmTitle('ProfileUpdate')
        }
    }

    const handlePasswordChange = (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setConfirmTitle('NoMatchPwd')
            return
        }

        const validation = updatePasswordSchema.safeParse({ password })

        if (!validation.success) {
            const errorMessages = validation.error.issues.map(e => e.message).join('\n')
            errorHandler(setConfirmTitle, errorMessages)
            return
        }

        updatePassword({
            variables: {
            currentPassword,
            newPassword: password,
            },
        })
    }

    const handlePhone = (input) => {
        if (input !== '' && input !== myProfile?.phone) {
            if (input.startsWith('+358')) return input
            const number = input.replace(/^0/, '')
            return '+358' + number
        }
    }

    const setMail = (id, consent) => {
        console.log(id, consent)
        updateUser({
            variables: {
                id: id,
                emailConsent: consent,
            },
        })
    }

    if (!currentUser || !ref || loading) {
        return <Spinner text={"Ladataan..."} />
    }

    if (error) {
        return <ErrorDiv error={error} refetch={refetch} />
    }

    return (
        <div className="container profile">
            <div className="row glow">
                <div className="col-12 col-md-6">
                    <h1 className="mt-4 mb-4">Nykyiset tiedot:</h1>
                    <div
                        className="currentData"
                        style={{
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div className="row mb-2">
                            <div className="col-4 userData">
                                {isMobile ? (<span>Tunnus:</span>) : (<span>Käyttäjätunnus:</span>)}
                            </div>
                            <div className="col-8 userData">
                                <span>{myProfile?.username}</span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4 userData">
                                <span>Puhelin:</span>
                            </div>
                            <div className="col-8 userData">
                                <span>{myProfile?.phone}</span>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4 userData">
                                <span>Lisätiedot:</span>
                            </div>
                            <div className="col-8 userData">
                                <span style={{ whiteSpace: "pre-line" }}>{myProfile?.about}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-5">
                    <div className="row mt-4"></div>

                    <form onSubmit={handleProfileUpdate} className="mt-4 mb-5 add-user-column text-center">
                        <h2 style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                        }}>{myProfile ? myProfile.username : 'Haetaan käyttäjää.....'}</h2>
                        <div>
                            <input
                                type='text'
                                placeholder='Lisää tai vaihda puhelin'
                                value={phone}
                                onChange={({ target }) => setPhone(target.value)}
                                className="form-control mb-2"
                            />
                        </div>
                        <div>
                            <textarea
                                id="message"
                                placeholder="Lisätietoja (Nimi, työpaikka, status, LinkedIn jne.)"
                                value={about}
                                rows={4}
                                onChange={({ target }) => setAbout(target.value)}
                                className="form-control mb-2"
                            />
                        </div>
                        <div className="d-flex justify-content-center gap-2 flex-wrap mb-3">

                            <ModalButton
                                action={'delPhone'}
                                label={'Poista puhelin'}
                                updateUser={updateUser}
                                setConfirmTitle={setConfirmTitle}
                                id={myProfile?.id}
                                disabled={!myProfile?.phone}
                                isMobile={isMobile}
                            />

                            <ModalButton
                                action={'delAbout'}
                                label={'Poista lisätiedot'}
                                updateUser={updateUser}
                                setConfirmTitle={setConfirmTitle}
                                id={myProfile?.id}
                                disabled={!myProfile?.about}
                                isMobile={isMobile}
                            />

                            <button
                                type='submit'
                                disabled={phone.trim() === '' && about.trim() === ''}
                                className="btn btn-primary"
                            >
                                Päivitä profiili
                            </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center mb-0">
                            <label htmlFor="emailConsent" className="form-check-label mb-0" style={{marginRight: '20px'}}>
                                Ilmoitus sähköpostiini uusista blogeista:
                            </label>
                            <input
                                type="checkbox"
                                className="form-check-input mb-3"
                                id="emailConsent"
                                checked={emailConsent}
                                onChange={() => {
                                const newConsent = !emailConsent
                                setEmailConsent(newConsent)
                                setMail(myProfile?.id, newConsent)
                                }}
                            />
                            {emailConsent ? (
                                <div style={{ color: 'green', marginLeft: '20px' }}>
                                    Kyllä
                                </div>
                            ) : (
                                <div style={{ color: 'red', marginLeft: '20px' }}>
                                    Ei
                                </div>
                            )}
                        </div>
                    </form>

                    <form onSubmit={handlePasswordChange} className="mt-4 mb-5 add-user-column text-center">
                        <h2>Vaihda salasana</h2>
                        <div>
                            <input
                                type='password'
                                placeholder='Nykyinen salasana'
                                value={currentPassword}
                                onChange={({ target }) => setCurrentPassword(target.value)}
                                className="form-control mb-2"
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                placeholder='Uusi salasana'
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                className="form-control mb-2"
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                placeholder='Salasana uudelleen'
                                value={confirmPassword}
                                onChange={({ target }) => setConfirmPassword(target.value)}
                                className="form-control mb-3"
                            />
                        </div>
                        <button type='submit' className="btn btn-primary">Vaihda salasana</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile