import { Modal, Collapse } from 'bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom'
import { newUser } from '../../middleware/newUser'
import {
  FaHome, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaSchool,
  FaToolbox, FaGamepad, FaWrench, FaEnvelope, FaBlog, FaInfo, FaBars
} from 'react-icons/fa'

const MobileHeader = ({ setConfirmTitle, setOnConfirm }) => {
  const navigate = useNavigate()
  const { isLoggedIn, isAdmin, currentUser } = useContext(AuthContext)

  const { id } = useParams()
  const path = useLocation().pathname
  let page

  const pages = {
    undefined: "Etusivu",
    admin: "Admin",
    games: "Pelit",
    profile: "Profiili",
    unauthorized: "Ei pääsyä",
    contact: "Yhteydenotto",
    blogs: "Blogit",
    id: "Blogi",
    iforgot: "Salasanan palautus",
    reset_password: "Salasanan palautus",
    blogform: "Uusi blogi",
    aboutpage: "Tietoja sivusta"
  }

  if (id) {
    page = "id"
  } else {
    page = pages[path.split("/").filter(Boolean).pop()] || null
  }

  const handleLogClick = () => {
    collapseNavbar()

    if (isLoggedIn) {
      setOnConfirm(() => () => {
        navigate('/logout')
      })
      setConfirmTitle('LogoutConfirm')
    } else {
      const loginModalElement = document.getElementById('LoginModal')
      const loginModal = Modal.getInstance(loginModalElement) || new Modal(loginModalElement)
      loginModal.show()
    }
  }

  const collapseNavbar = () => {
    const navbar = document.getElementById('mainNavbar')
    const bsCollapse = Collapse.getInstance(navbar) || new Collapse(navbar, { toggle: false })
    if (navbar.classList.contains('show')) {
      bsCollapse.hide()
    } else {
      bsCollapse.show()
    }
  }

  const addUser = () => {
    collapseNavbar()
    newUser()
  }

  return (
    <header className="bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <div className="col-md-3 text-center">
          <h2>Simo Toivanen</h2>
          <h6>Ohjelmistokehittäjä</h6>
        </div>
        <div className='col-md-1 text-center'>
          <button
            className="navbar-toggler mb-1"
            type="button"
            data-bs-target="#mainNavbar"
            onClick={collapseNavbar}
          >
          <FaBars />
          </button><br />
          {page}
        </div>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={collapseNavbar}>{<FaHome />} Etusivu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/games" onClick={collapseNavbar}>{<FaGamepad />} Pelit</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs" onClick={collapseNavbar}>{<FaBlog />} Blogit</Link>
            </li>
            {!isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={collapseNavbar}>{<FaEnvelope />} Ota yhteyttä</Link>
              </li>
            )}
            {!isLoggedIn && 
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={addUser}>{<FaUserPlus />} Luo tunnukset</Link>
              </li>
            }
            <li className="nav-item">
              <Link className="nav-link" to="/aboutpage" onClick={collapseNavbar}>{<FaInfo />} Tietoa sivustosta</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to={`/profile?ref=${currentUser?.username}`} onClick={collapseNavbar}>{<FaWrench />} Profiili</Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin" onClick={collapseNavbar}>{<FaToolbox />} Admin</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={handleLogClick}>
                {isLoggedIn ? <FaSignOutAlt /> : <FaSignInAlt />} {isLoggedIn ? 'Kirjaudu ulos' : 'Kirjaudu'}
              </Link>
            </li>
          </ul>
          {isLoggedIn && (
            <span className="navbar-text text-white">
              Kirjautunut: <strong>{currentUser?.username}</strong>
            </span>
          )}
        </div>
      </nav>
    </header>
  )
}

export default MobileHeader