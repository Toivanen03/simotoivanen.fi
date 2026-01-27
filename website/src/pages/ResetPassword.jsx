import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import errorHandler from '../middleware/errorHandler'
import { AuthContext } from '../contexts/AuthContext'
import { UPDATE_PASSWORD } from '../../schema/queries'
import { useNavigate } from 'react-router-dom'

const ResetPassword = ({ setConfirmTitle }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { login } = useContext(AuthContext)

    const token = new URLSearchParams(window.location.search).get('token')
    const navigate = useNavigate()

    const submit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setConfirmTitle('NoMatchPwd')
            return
        }
        updatePassword({ variables: { currentPassword: password, newPassword: password, token: token } })
    }

    const [updatePassword] = useMutation(UPDATE_PASSWORD, {
        onError: (error) => {
            errorHandler(setConfirmTitle, error)
        },
        onCompleted: (data) => {
            setConfirmTitle('PwdUpdate')
            login(token)
            setPassword('')
            setConfirmPassword('')
            navigate('/')
        },
    })

    return (
        <div className="container mt-5">
            <form onSubmit={submit} className="col-8 offset-2 mt-2 mb-5 add-user-column text-center">
                <h2>Vaihda salasana</h2>
                <div>
                    <input
                        type='password'
                        placeholder='Salasana'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Salasana uudelleen'
                        value={confirmPassword}
                        onChange={({ target }) => setConfirmPassword(target.value)}
                    />
                </div>
                <div>
                    <button type='submit' className="btn btn-primary">Vaihda salasana</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword