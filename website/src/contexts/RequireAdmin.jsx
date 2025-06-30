import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const RequireAdmin = ({ children }) => {
  const { isLoggedIn, isAdmin, isLoading } = useContext(AuthContext)
  const location = useLocation()

  if (isLoading) {
    return <p>Ladataan käyttäjätietoja...</p>
  }

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/unauthorized" state={{ from: location, reason: 'not_admin' }} replace />
  }

  return children
}

export default RequireAdmin