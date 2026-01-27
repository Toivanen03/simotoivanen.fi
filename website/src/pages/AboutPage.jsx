import CodeExpand from '../middleware/CodeExpand'

const AboutPage = ({ isMobile }) => {
  const buildDate = new Date(import.meta.env.VITE_BUILD_TIME)

  const Example = ({ code, header }) => {
      return (
          <div className="d-flex mt-4 mb-4 justify-content-center">
              {!isMobile ? (<div style={{ width: '90%' }}>
                <h4>{header}</h4>
                <CodeExpand code={code} />
              </div>
              ) : (
              <div style={{ width: '110%' }}>
                <h4>{header}</h4>
                <CodeExpand code={code} />
              </div>
              )}
          </div>
      )
  }

    return (
      <div className='blogsBg'>
        <div className='container mt-5'>
          <div className='row mb-5 glow'>
            <div className='col-4'>
              <h1 className='text-center fw-bold'>Tietoa sivustosta</h1>
                </div>
            </div>

            <div className='col-12 col-md-10 offset-md-1'>
              <div className='card shadow-sm h-100 glow mb-5'>
                <div className='card-body blogsCard'>
                  <h5 className='card-subtitle text-muted'>Päivitetty {`${String(buildDate.getDate()).padStart(2,'0')}.${String(buildDate.getMonth()+1).padStart(2,'0')}.${buildDate.getFullYear()}`}</h5>
                  <section className="container my-5">
                    <h2 className="mb-4">Simotoivanen.fi - tekninen esittely</h2>
                    <p>
                      <strong>Simotoivanen.fi</strong> on rakennettu moderneilla JavaScript-tekniikoilla. Sivun frontend on toteutettu <strong>React</strong>illa käyttäen
                      <strong> React Router</strong>ia reititykseen, <strong>Bootstrap</strong>ia tyylittelyyn ja <strong>Vite</strong>ä
                        kehitysympäristönä sekä ympäristömuuttujien hallintaan. Sivuston data tallentuu <strong>MongoDb</strong>-tietokantaan, josta <strong>Raspberry Pi 4</strong>:llä pyörivä backend hakee mm. blogit ja käyttäjätiedot.
                    </p>

                    <hr className="my-4" />

                    <h4 className="mb-4 mt-5">Frontend-rakenne</h4>
                            
                    <p><strong>Komponenttipohjainen arkkitehtuuri:</strong> Sivun layout (header, footer, sisältöalue) koostuvat uudelleenkäytettävistä React-komponenteista.</p>
<Example header={'Header.jsx:'} code={`
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
  const studiesIcon = (<FaSchool size={iconSize} className='text-white' />)
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

        {!isAdmin ? (
          <div className='col text-center highlight'>
            <Link to={'/contact'} className="text-white text-decoration-none d-flex flex-column align-items-center">
              {contactIcon}
              <span style={fontSize} className='mt-2'>
                {width > 1495 ? 'Ota yhteyttä' : 'Viesti'}
              </span>
            </Link>
          </div>
        ) : (
          <div className='col text-center highlight'></div>
        )}

        {!isLoggedIn ? (
          <div className="col text-center highlight">
            <div onClick={newUser} style={{ cursor: 'pointer' }}>
              {addUserIcon}
            </div>
            <div className='mt-2'>
              <Link onClick={newUser} className='text-white text-decoration-none' style={fontSize}>Luo tunnukset</Link>
            </div>
          </div>
        ) : (
          <div className='col text-center highlight'>
            <Link to={'/exercises'} className="text-white text-decoration-none d-flex flex-column align-items-center">
              {studiesIcon}
              <span style={fontSize} className='mt-2'>Opintoni</span>
            </Link>
          </div>
        )}

        <div className='col text-center highlight'>
          <Link to={'/aboutpage'} className="text-white text-decoration-none d-flex flex-column align-items-center">
            {infoIcon}
            <span style={fontSize} className='mt-2'>
              <small>{width > 1495 ? 'Tietoa sivustosta' : 'Tietoa'}</small>
            </span>
          </Link>
        </div>

        {width > 785 && (
          <div className='col text-center highlight'>
            <div style={{ height: '100%' }}></div>
          </div>
        )}

        <div className="col text-center highlight">
          {isAdmin ? (
            <Link to="/admin" className="text-white text-decoration-none d-flex flex-column align-items-center">
              {adminIcon}
              <span style={fontSize} className="mt-2">Admin</span>
            </Link>
          ) : isLoggedIn ? (
            <Link to="/profile" className="text-white text-decoration-none d-flex flex-column align-items-center">
              {settingsIcon}
              <span style={fontSize} className="mt-2">Profiili</span>
            </Link>
          ) : (
            <div style={{ height: '100%' }}></div>
          )}
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
`} />
<Example header={'ConfirmModal.jsx'} code={`
import { useEffect } from 'react'
import { Modal } from 'bootstrap'

const ConfirmModal = ({ title, setConfirmTitle, onConfirm }) => {
    let button = 'Ok'
    let message
    let twoButtons = false
    let isError = false

    const titlesList = {
        InvalidCredentials: (<div className='text-danger fw-bold'>Virheellinen käyttäjätunnus tai salasana.</div>),
        LoginConnectionError: (<div className='text-danger fw-bold'>Kirjautuminen epäonnistui. Tarkista yhteys.</div>),
        NoMatchPwd: (<div className='text-danger fw-bold text-center'>Sähköpostin tai salasanan vahvistus ei täsmää!</div>),
        AdminRemove: 'Et voi poistaa admin-statusta itseltäsi.',
        UserRemoved: 'Käyttäjä poistettu!',
        SelfRemove: 'Et voi poistaa itseäsi.',
        PwdUpdate: 'Salasana vaihdettu!',
        MessageSent: 'Kiitos viestistäsi, vastaan mahdollisimman pian!',
        ProfileUpdate: 'Profiilisi on päivitetty onnistuneesti!',
        PhoneRemoved: 'Puhelinnumero poistettu.',
        AboutRemoved: 'Lisätiedot poistettu.',
        BlogRemoved: 'Blogi poistettu.',
        NoBlogs: 'Blogeja ei ole valittuna.',
        WrongPwd: 'Antamasi nykyinen salasana on virheellinen.',
        PwdReset: 'Jos käyttäjä löytyy annetulla sähköpostilla, lähetämme linkin salasanan vaihtamiseksi.',
        BlogOk: 'Blogi luotu.',
        MailSent: 'Ilmoitus uusista blogeista lähetetty tilaajille.',
        EmailConsent: 'Viestintälupa päivitetty!',
        BlogUpdate: 'Muutokset tallennettu.',
    }

    if (title && title === 'LogoutConfirm') {
        message = 'Haluatko varmasti kirjautua ulos?'
        button = ['Kyllä', 'Peruuta']
        twoButtons = true
    } else if (Array.isArray(title)) {
        if (title[0] === 'BlogsRemoved' || title[0] === 'LogsRemoved') {
            const count = title[1]
            title = title[0]
            message = \`\${count} $\{title === 'BlogsRemoved' ? 'blogia' : 'lokia'} poistettiin onnistuneesti.\`
        } else if (title[0] === 'LoginSuccess') {
            const user = title[1]
            title = title[0]
            message = \`\Tervetuloa, $\{user}!\`
        }
    } else if (title && title.split(' ').length !== 1 && title[title.length - 1] !== '!' && !Array.isArray(title)) {
        message = title
        button = ['Kyllä', 'Peruuta']
        twoButtons = true
    } else {
        message = titlesList[title] || null

    }

    if (title && title.startsWith('Virhe:')) {
        const lines = title.split('\n')
            message = (
                <div className="text-danger fw-bold">
                {lines.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
                </div>
            );
            button = 'Ok'
            twoButtons = false
            isError = true
        } else if (title && title.endsWith('luotu!')) {
            message = title
        }

    useEffect(() => {
        if (title) {
            const modalEl = document.getElementById('alertModal')
            const modal = Modal.getInstance(modalEl) || new Modal(modalEl)
            modal.show()
        }
    }, [title])

    const closeModal = (callback) => {
        const modalEl = document.getElementById('alertModal')
        const modal = Modal.getInstance(modalEl)

        const handleHidden = () => {
            setConfirmTitle(null)
            if (callback) callback()
            modalEl.removeEventListener('hidden.bs.modal', handleHidden)
        }

        modalEl.addEventListener('hidden.bs.modal', handleHidden)
        modal.hide()
    }

    const confirm = () => closeModal(onConfirm)
    const cancel = () => closeModal()

    return (
        <div className="modal fade modal-lg" id="alertModal" tabIndex="-1" aria-labelledby="alertModalLabel">
            <div className="modal-dialog">
                <div className="modal-content glow">
                    <div className="modal-header">
                        <h5 className="modal-title" id="alertModalLabel">{!isError && message}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="col text-center">
                        <div style={{ display: 'inline-block', textAlign: 'left' }}>
                            {isError && message}
                        </div>
                    </div>
                    {twoButtons && <div className="modal-body row text-center">
                        <div className="col-6 text-end">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={cancel}>
                                {button[1]}
                            </button>
                        </div>
                        <div className="col-6 text-start">
                            <button type="button" className="btn btn-danger" onClick={confirm}>
                                {button[0]}
                            </button>
                        </div>
                    </div>}
                    {!twoButtons && <div className="modal-body row text-center">
                        <div className="col-12">
                            <button type="button" className="btn btn-primary" onClick={confirm}>
                                {button}
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal

`} />
                                <p><strong>Bootstrap 5:</strong> Käytössä on Bootstrapin komponentit ja grid-järjestelmä responsiivisuuden ja nopean ulkoasun rakentamiseksi.</p>
                                <p><strong>Ympäristömuuttujat:</strong> Kehitys- ja tuotantopalvelinosoitteet sekä API-avaimet määritellään <code>.env</code>-tiedoston kautta tietoturvastandardien mukaisesti.</p>
                                <p><strong>LocalStorage- tila:</strong> Tallentaa käyttäjäkohtaista tietoa käyttäjän selaimeen esimerkiksi kirjautumisstatuksen tallentamiseksi.</p>
<Example header={'auth.js'} code={`
.....

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? \`\Bearer $\{token}\`\ : null
    }
  }
})

.....
`} />
                                <p><strong>Käyttäjämodaalit:</strong> Sisäänkirjautuminen, käyttäjien rekisteröinti ja vahvistusmodaalit toteutettu omilla komponenteillaan. Kirjautuneelle käyttäjälle voidaan näyttää rajattua sisältöä. Kirjautuminen mahdollistaa myös sähköposti-ilmoitusten tilaamisen.</p>
<Example header={'LoginModal.jsx'} code={`
import { useForm } from "react-hook-form"
import axios from "axios"
import { LOGIN } from "../../schema/queries"
import config from "../../config/config"
import { Modal } from 'bootstrap'
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

const LoginModal = ({ setConfirmTitle }) => {
  const { register, handleSubmit, reset } = useForm()
  const BACKEND_URL = config() + '/graphQl'
  const { login } = useContext(AuthContext)

  const onSubmit = async (formData) => {
    try {
        const response = await axios.post(BACKEND_URL, {
          query: LOGIN,
          variables: {
              username: formData.userName,
              password: formData.password,
          },
      })

    const token = response.data?.data?.login?.value

    if (token) {
      login(token)
      Modal.getInstance(document.getElementById("LoginModal")).hide()
      setConfirmTitle(['LoginSuccess', formData.userName])
      reset()
    } else {
      setConfirmTitle('InvalidCredentials')
    }
  } catch (error) {
    console.error("Login error:", error)
    setConfirmTitle('LoginConnectionError')
  }
}

  const cancel = () => {
    Modal.getInstance(document.getElementById("LoginModal")).hide()
  }

  return (
    <div className="modal custom-modal-animate" id="LoginModal" tabIndex="-1" aria-labelledby="LoginModalLabel">
      <div className="modal-dialog">
        <div className="modal-content glow">
          <div className="modal-header">
            <h5 className="modal-title" id="LoginModalLabel">Kirjautuminen</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body d-flex flex-column align-items-center">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="mb-3">
                <input
                  id="userName"
                  placeholder="Sähköposti"
                  {...register("userName")}
                  className="form-control rounded"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  id="password"
                  placeholder="Salasana"
                  type="password"
                  {...register("password")}
                  className="form-control rounded"
                  required
                />
              </div>
              <div className="row">
                <div className="col text-center mt-4">
                  <button type="submit" className="btn btn-primary">Kirjaudu</button>
                </div>
                <div className="col text-center mt-4">
                  <button type="button" className="btn btn-primary" onClick={cancel}>Peruuta</button>
                </div>
              </div>
            </form>
            <Link to={'/iforgot'} className="mt-4" onClick={cancel}>
              Unohdin salasanani
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
`} />

                            <h4 className="mb-4 mt-5">Backend-yhteys</h4>
                            <p>
                                Sivusto kommunikoi <strong>Node.js/Express</strong>-pohjaiseen backend-palvelimeen <strong>GraphQL</strong>-rajapinnan kautta. 
                                <strong> Apollo Client</strong> toimii tietojen hakemisen ja päivittämisen välittäjänä. Sivuston backend pyörii omalla Raspberry Pi Zero -palvelimellani.
                            </p>
<Example header={'index.js'} code={`
.....

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
  context: async ({ req }) => {
    const auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (err) {
        console.error('Virhe:', err.message)
        return {}
      }
    }
    return {}
  }
})

.....
`} />

                            <h4 className="mb-4 mt-5">Navigointi ja käyttöoikeudet</h4>
                            <p>
                                Sivustolla on reittikohtainen <strong>autentikointi- ja autorisointivarmistus</strong>, joka estää pääsyn rajattuun sisältöön ilman kirjautumista tai riittäviä oikeuksia.
                            </p>
<Example header={'RequireAdmin.jsx'} code={`
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
`} />

<Example header={'Käyttö App.jsx:'} code={`
<Route path="/admin" element={<RequireAdmin><Admin setConfirmTitle={setConfirmTitle} setOnConfirm={setOnConfirm} isMobile={isMobile} /></RequireAdmin>} />
`} />

                                <p><strong>Notifikaatiot ja popupit:</strong> Näytetään esimerkiksi tietoa tietokantaan saapuvista uusista sisällöistä tai sivuston päivityksistä. Lisäksi käyttäjille voidaan suostumusten mukaisesti lähettää erilaisia sähköpostiviestejä.</p>
<Example header={'mailer.js'} code={`
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import config from './config.js'

const MailSender = async (users, resetToken, blog, message) => {
    let url
    if (process.env.npm_lifecycle_event === 'dev') {
        url = \`\${config()}5173\`
    } else {
        url = \`\${config()}\`
    }

    let subject = ''
    let html
    const resetMail = process.env.RESET_MAIL
    const otherMail = process.env.OTHER_MAIL

    const resetTransporter = nodemailer.createTransport({
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
            user: resetMail,
            pass: process.env.EMAIL_PASS
        }
    })

    const notificationTransporter = nodemailer.createTransport({
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
            user: otherMail,
            pass: process.env.EMAIL_PASS
        }
    })

    if (resetToken) {
        const resetLink = \`\${url}/reset-password?token=$\{resetToken}\`
        subject = 'Salasanan palautus'
        html = fs.readFileSync(path.resolve('emailTemplates', 'resetPassword.html'), 'utf-8')
            .replace('{{RESET_LINK}}', resetLink)

        await resetTransporter.sendMail({
            from: \`\"simotoivanen.fi" <$\{resetMail}>\`,
            to: users.username,
            subject,
            html
        })

    } else if (blog) {
        subject = 'Uusi blogi osoitteesta simotoivanen.fi'
        html = fs.readFileSync(path.resolve('emailTemplates', 'newBlog.html'), 'utf-8')
            .replace('{{BLOG_TITLE}}', blog.title)
            .replace('{{BLOG_SUBTITLE}}', blog.subtitle)
            .replace('{{BLOG_CONTENT}}', blog.content.replace(/\n/g, '<br>'))

        const sendResults = await Promise.allSettled(
            users.map(user => {
                return notificationTransporter.sendMail({
                    from: \`\"simotoivanen.fi" <$\{otherMail}>\`,
                    to: user.username,
                    subject,
                    html
                })
            }).filter(Boolean)
        )

        const failures = sendResults.filter(r => r?.status === 'rejected')
        if (failures.length > 0) {
            failures.forEach(f => console.error(failures.length,' Sähköpostin lähetys epäonnistui:', f.reason))
        }

    } else if (message) {
        subject = \`\Uusi yhteydenottoviesti: $\{message.email}\`
        html = \`\
            <h3>Yhteydenotto</h3>
            <p><strong>Lähettäjä:</strong> $\{message.email}</p>
            <p><strong>Viesti:</strong></p>
            <p>$\{message.message.replace(/\n/g, '<br>')}</p>
        \`
        await notificationTransporter.sendMail({
            from: \`\"simotoivanen.fi" <$\{otherMail}>\`,
            to: 'st@simotoivanen.fi',
            subject,
            html
        })
    }
}

export default MailSender
`} />
                            <hr className="my-4" />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage