import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const LogoutHandler = () => {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate('/', { replace: true })
    }, [logout, navigate])
    
    return 'Kirjaudutaan ulos...'
}

export default LogoutHandler
