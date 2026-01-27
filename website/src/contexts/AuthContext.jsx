import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
      const decoded = jwtDecode(savedToken)
      setCurrentUser(decoded)
      setIsAdmin(decoded.admin === true)
    }
    setIsLoading(false)
  }, [])

  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    const decoded = jwtDecode(newToken)
    setCurrentUser(decoded)
    setIsAdmin(decoded.admin === true)
    navigate('/')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAdmin(false)
    setCurrentUser(null)
    navigate('/')
  }

  const isLoggedIn = !!token

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, isAdmin, isLoading, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}