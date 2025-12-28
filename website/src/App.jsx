import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './layout/App.scss'
import Header from './layout/Header'
import Footer from './layout/Footer'
import MobileHeader from './layout/mobile/MobileHeader'
import MobileFooter from './layout/mobile/MobileFooter'

import LoginModal from './modals/LoginModal'
import RegisterModal from './modals/RegisterModal'
import ConfirmModal from './modals/ConfirmModal'
import NewContentNotification from './modals/NewContentNotification'
import UpdateNotice from './modals/UpdateNotice'

import config from '../config/config'
import RequireAuth from './contexts/RequireAuth'
import RequireAdmin from './contexts/RequireAdmin'
import { AuthProvider } from './contexts/AuthContext'

import Admin from './pages/Admin'
import Home from './pages/Home'
import LogoutHandler from './pages/LogoutHandler'
import Contact from './pages/Contact'
import Unauthorized from './pages/Unauthorized'
import Games from './pages/Games'
import Profile from './pages/Profile'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Iforgot from './pages/Iforgot'
import ResetPassword from './pages/ResetPassword'
import BlogForm from './pages/BlogForm'
import NotFound from './pages/NotFound'
import AboutPage from './pages/AboutPage'

function App() {
  const [confirmTitle, setConfirmTitle] = useState(null)
  const [onConfirm, setOnConfirm] = useState(() => () => {})
  const [newContent, setNewContent] = useState(false)
  const [showNotice, setShowNotice] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const buildDate = new Date(import.meta.env.VITE_BUILD_TIME)
  const now = new Date()

  const diff = (now - buildDate) / (1000 * 60 * 60 * 24)

  let baseURL = config()

  const NavigateHelper = () => {
    const navigate = useNavigate()

    useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const route = params.get("route")
      if (route) {
        navigate(`/${route}`)
      }
    }, [])

    return null
  }

  if (import.meta.env.VITE_BACKEND_URL_MOBILE === 'true') {
    const url = new URL(baseURL)
    url.port = ''
    baseURL = url.toString().slice(0, -1) + ':'
  }

  useEffect(() => {
    const alreadySeen = localStorage.getItem('updateNoticeSeen')
    if (!alreadySeen && diff < 30) {
      setShowNotice(true)
    }
  }, [diff])

  useEffect(() => {
    if (showNotice) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showNotice])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const dismissNotice = () => {
    localStorage.setItem('updateNoticeSeen', 'true')
    setShowNotice(false)
  }

  useEffect(() => {
  if (confirmTitle === null) {
    setOnConfirm(() => () => {})
    }
  }, [confirmTitle])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const rawLastCheck = localStorage.getItem('lastCheck')
      const isValidDate = rawLastCheck && !isNaN(Date.parse(rawLastCheck))
      const lastCheck = isValidDate
        ? new Date(rawLastCheck).toISOString()
        : new Date(0).toISOString()

      fetch(`${baseURL}/api/check-new-content?lastCheck=${encodeURIComponent(lastCheck)}`)
        .then(res => res.json())
        .then(data => {
          if (data.hasNewContent) {
            setNewContent(true)
          }
          localStorage.setItem('lastCheck', new Date(data.now).toISOString())
        })
        .catch(console.error)
      }, 60000)

      return () => clearInterval(intervalId)
    }, [])

  return (
    <Router>
      <AuthProvider>
        <NavigateHelper />
        {showNotice && <UpdateNotice onClose={dismissNotice} />}
        <div className="app-wrapper">
          {!isMobile ? (<Header setConfirmTitle={setConfirmTitle} setOnConfirm={setOnConfirm} />
          ) : (
            <MobileHeader setConfirmTitle={setConfirmTitle} setOnConfirm={setOnConfirm} />
          )}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home isMobile={isMobile} />} />
                <Route path="/admin" element={<RequireAdmin><Admin setConfirmTitle={setConfirmTitle} setOnConfirm={setOnConfirm} isMobile={isMobile} /></RequireAdmin>} />
                <Route path="/games" element={<Games />} />
                <Route path="/profile" element={<RequireAuth><Profile setConfirmTitle={setConfirmTitle} isMobile={isMobile} /></RequireAuth>} />
                <Route path="/logout" element={<LogoutHandler />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/contact" element={<Contact setConfirmTitle={setConfirmTitle} setOnConfirm={setOnConfirm} />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/blog/:id' element={<Blog />} />
                <Route path='/iforgot' element={<Iforgot setConfirmTitle={setConfirmTitle} />} />
                <Route path='/reset_password' element={<ResetPassword setConfirmTitle={setConfirmTitle} />} />
                <Route path='/blogform' element={<RequireAdmin><BlogForm setConfirmTitle={setConfirmTitle} setOnConfirm={setOnConfirm} /></ RequireAdmin>} />
                <Route path="*" element={<NotFound />} />
                <Route path="/aboutpage" element={<AboutPage isMobile={isMobile} />} />
              </Routes>
            </main>
          </div>
          {!isMobile ? <Footer /> : <MobileFooter />}
        <NewContentNotification visible={newContent} onClose={() => setNewContent(false)} />
        <LoginModal setConfirmTitle={setConfirmTitle} />
        <RegisterModal setConfirmTitle={setConfirmTitle} />
        <ConfirmModal title={confirmTitle} setConfirmTitle={setConfirmTitle} onConfirm={onConfirm} />
      </AuthProvider>
    </Router>
  )
}

export default App