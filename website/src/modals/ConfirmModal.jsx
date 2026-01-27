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
        BlogOkTester: 'Sähköposti-ilmoitus uudesta blogista on tilaajien sijaan lähetetty vain testitunnuksen sähköpostiosoitteeseen. Blogia ei myöskään tallenneta testitunnuksilla.',
        BlogUpdateTester: 'Oikeilla admin-tunnuksilla blogin muutokset olisi nyt tallennettu. Sähköposti-ilmoitusta ei lähetetä vanhan blogin muokkauksista.',
    }

    if (title && title === 'LogoutConfirm') {
        message = 'Haluatko varmasti kirjautua ulos?'
        button = ['Kyllä', 'Peruuta']
        twoButtons = true
    } else if (Array.isArray(title)) {
        if (title[0] === 'BlogsRemoved' || title[0] === 'LogsRemoved') {
            const count = title[1]
            title = title[0]
            message = `${count} ${title === 'BlogsRemoved' ? 'blogia' : 'lokia'} poistettiin onnistuneesti.`
        } else if (title[0] === 'LoginSuccess') {
            const user = title[1]
            title = title[0]
            message = `Tervetuloa, ${user}!`
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
