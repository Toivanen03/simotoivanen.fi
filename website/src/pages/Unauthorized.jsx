import { useLocation } from 'react-router-dom'
import { Modal } from 'bootstrap'

const Unauthorized = () => {
    const location = useLocation()
    const reason = location.state?.reason

    const login = () => {
        const loginModalElement = document.getElementById('LoginModal')
        const loginModal = Modal.getInstance(loginModalElement) || new Modal(loginModalElement)
        loginModal.show()
    }

    return (
        <div className='forbidden container'>
            <h2 className='mb-4 mt-4'>Ei pääsyä!</h2>
            {reason === 'not_logged' && <p>Sinun täytyy <span onClick={ () => login()} style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}>kirjautua sisään</span> päästäksesi tälle sivulle.</p>}
            {reason === 'not_admin' && <p>Sivu on vain ylläpitäjille.</p>}
            {!reason && <p>Sinulla ei ole tarvittavia oikeuksia.</p>}
        </div>
    )
}

export default Unauthorized