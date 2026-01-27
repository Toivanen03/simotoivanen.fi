import { Modal } from 'bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { newUser } from '../middleware/newUser'
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaSchool, FaToolbox, FaGamepad, FaWrench, FaEnvelope, FaBlog, FaInfo } from 'react-icons/fa'
import useWindowWidth from '../middleware/useWindowWidth'

const Header = ({ setConfirmTitle, setOnConfirm }) => {
  const width = useWindowWidth()
  const navigate = useNavigate()
  const { isLoggedIn, isAdmin, currentUser } = useContext(AuthContext)

  const iconSize = width < 768 ? '1.2em' : width < 992 ? '1.8em' : '3em'
  const fontSize = width < 785 ? { fontSize: '0.7em' } : width < 1497 ? { fontSize: '0.85em' } : { fontSize: '1em' }

  const homeIcon = (<FaHome size={iconSize} className="text-white" />)
  const addUserIcon = (<FaUserPlus size={iconSize} className="text-white" />)
  const loginIcon = (<FaSignInAlt size={iconSize} className="text-white" />)
  const logoutIcon = (<FaSignOutAlt size={iconSize} className="text-white" />)
  const adminIcon = (<FaToolbox size={iconSize} className='text-white' />)
  const gamesIcon = (<FaGamepad size={iconSize} className='text-white' />)
  const settingsIcon = (<FaWrench size={iconSize} className='text-white' />)
  const contactIcon = (<FaEnvelope size={iconSize} className='text-white' />)
  const blogIcon = (<FaBlog size={iconSize} className='text-white' />)
  const infoIcon = (<FaInfo size={iconSize} className='text-white' />)

  const handleLogClick = () => {
    if (isLoggedIn) {
      setOnConfirm(() => () => navigate('/logout'))
      setConfirmTitle('LogoutConfirm')
    } else {
      const loginModalElement = document.getElementById('LoginModal')
      const loginModal = Modal.getInstance(loginModalElement) || new Modal(loginModalElement)
      loginModal.show()
    }
  }

  return (
    <header className="bg-dark text-white">
      <div className='row align-items-center'>
        <div className="col-md-3 text-center">
          <h1>Simo Toivanen</h1>
          <h5>Ohjelmistokehittäjä</h5>
        </div>

        <div className='col text-center highlight'>
          <Link to={'/'} className="text-white text-decoration-none d-flex flex-column align-items-center">
            {homeIcon}
            <span style={fontSize} className='mt-2'>Etusivu</span>
          </Link>
        </div>

        <div className='col text-center highlight'>
          <Link to={'/games'} className="text-white text-decoration-none d-flex flex-column align-items-center">
            {gamesIcon}
            <span style={fontSize} className='mt-2'>Pelit</span>
          </Link>
        </div>

        <div className='col text-center highlight'>
          <Link to={'/blogs'} className="text-white text-decoration-none d-flex flex-column align-items-center">
            {blogIcon}
            <span style={fontSize} className='mt-2'>Blogit</span>
          </Link>
        </div>

        <div className='col text-center highlight'>
          <Link to={'/contact'} className="text-white text-decoration-none d-flex flex-column align-items-center">
            {contactIcon}
            <span style={fontSize} className='mt-2'>
              {width > 1495 ? 'Ota yhteyttä' : 'Viesti'}
            </span>
          </Link>
        </div>

        {!isLoggedIn && 
          <div className="col text-center highlight">
            <div onClick={newUser} style={{ cursor: 'pointer' }}>
              {addUserIcon}
            </div>
            <div className='mt-2'>
              <Link onClick={newUser} className='text-white text-decoration-none' style={fontSize}>Luo tunnukset</Link>
            </div>
          </div>
        }

        <div className='col text-center highlight'>
          <Link to={'/aboutpage'} className="text-white text-decoration-none d-flex flex-column align-items-center">
            {infoIcon}
            <span style={fontSize} className='mt-2'>
              <small>{width > 1495 ? 'Tietoa sivustosta' : 'Tietoa'}</small>
            </span>
          </Link>
        </div>

        <div className='col text-center highlight'>
          {isLoggedIn && (<Link to={`/profile?ref=${currentUser?.username}`} className="text-white text-decoration-none d-flex flex-column align-items-center">
            {settingsIcon}
            <span style={fontSize} className="mt-2">Profiili</span>
          </Link>)}
        </div>

        <div className="col text-center highlight">
          {isAdmin && (<Link to="/admin" className="text-white text-decoration-none d-flex flex-column align-items-center">
            {adminIcon}
            <span style={fontSize} className="mt-2">Admin</span>
          </Link>)}
        </div>

        <div className="col text-center highlight" style={{ cursor: 'pointer' }}>
          <div onClick={handleLogClick}>
            {isLoggedIn ? logoutIcon : loginIcon}
          </div>
          <div className="mt-2">
            {isLoggedIn ? (
              <span style={fontSize}>{width > 1522 ? 'Kirjaudu ulos' : 'Poistu'}</span>
            ) : (
              <span style={fontSize}>Kirjaudu</span>
            )}
          </div>
        </div>
      </div>
      {isLoggedIn && (
        <div className='row' style={{ marginRight: '20px' }}>
          <small className='text-end'><strong>{currentUser?.username}</strong></small>
        </div>
      )}
    </header>
  )
}

export default Header