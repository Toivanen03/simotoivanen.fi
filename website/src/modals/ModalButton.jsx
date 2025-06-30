import { Modal } from 'bootstrap'
import cv from '../files/CV_Simo_Toivanen.pdf'

function ModalButton({ action, label, updateUser, setConfirmTitle, id, disabled = false }) {
  const buttonType = action.startsWith('del') ? 'btn-danger' : 'btn-primary'

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
      case 'cv':
        return
      default:
        console.warn(`Tuntematon toiminto: ${action}`)
    }
  }

  if (action === 'cv') {
    return (
      <a className="btn btn-primary mt-3 mx-2" href={cv} download>
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
    >
      {label}
    </button>
  )
}

export default ModalButton