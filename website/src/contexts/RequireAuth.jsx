import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Spinner from '../middleware/spinner'

const RequireAuth = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)
  const location = useLocation()

  if (isLoading) {
    return <Spinner text={"Ladataan käyttäjätietoja..."} />
  }

  if (!isLoggedIn) {
    return <Navigate to="/unauthorized" state={{ from: location, reason: 'not_logged' }} replace />
  }

  return children
}

export default RequireAuth