import { Modal } from 'bootstrap'
import cv from '../files/CV_Simo_Toivanen.pdf'
import sert from '../files/Fullstackopen-sertifikaatit_Simo_Toivanen.pdf'
import tod from '../files/Tutkintotodistus-Simo_Toivanen-kopio.pdf'

function ModalButton({ action, label, updateUser, setConfirmTitle, id, disabled = false, isMobile }) {
  const buttonType = action.startsWith('del') ? 'btn-danger' : ['sert', 'tod', 'cv'].some(prefix => action.startsWith(prefix)) ? 'btn-info' : 'btn-primary'
  const buttonWidth = isMobile ? '40vw' : '10vw'

  const handleClick = () => {
    if (disabled) return
    
    switch (action) {
      case 'delPhone':
        if (window.confirm('Haluatko varmasti poistaa puhelinnumerosi?')) { 
          updateUser({ variables: {
            id: id,
            phone: ''
          }})
          setConfirmTitle('PhoneRemoved')}
        break
      case 'delAbout':
        if (window.confirm('Haluatko varmasti poistaa antamasi lisätiedot?')) { 
          updateUser({ variables: {
            id: id,
            about: ''
          }})
          setConfirmTitle('AboutRemoved')}
        break
      case 'info':
      case 'close': {
        const modalElement = document.getElementById('InfoModal')
        if (!modalElement) return console.warn('Modal-elementtiä ei löydy')
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement)
        action === 'info' ? modal.show() : modal.hide()
        break
      }
      case 'cv', 'sert', 'tod':
        return
      default:
        console.warn(`Tuntematon toiminto: ${action}`)
    }
  }

  if (action === 'cv') {
    return (
      <a className={`btn mt-3 mx-2 ${buttonType}`}
        href={cv}
        target="_blank"
        rel="noopener noreferrer"
        style={{width: buttonWidth, border: '1px solid black'}}>
        {label}
      </a>
    )
  }

  if (action === 'sert') {
    return (
      <a className={`btn mt-3 mx-2 ${buttonType}`}
        href={sert}
        target="_blank"
        rel="noopener noreferrer"
        style={{width: buttonWidth, border: '1px solid black'}}>
        {label}
      </a>
    )
  }

  if (action === 'tod') {
    return (
      <a className={`btn mt-3 mx-2 ${buttonType}`}
        href={tod}
        target="_blank"
        rel="noopener noreferrer" style={{width: buttonWidth, border: '1px solid black'}}>
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={`btn mt-3 mx-2 ${buttonType}`}
      onClick={handleClick}
      disabled={disabled}
      style={{width: buttonWidth}}
    >
      {label}
    </button>
  )
}

export default ModalButton