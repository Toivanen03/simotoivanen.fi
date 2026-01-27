import { Modal } from 'bootstrap'

export const newUser = () => {
  const addUserModalElement = document.getElementById('RegisterModal')
  const addUserModal = Modal.getInstance(addUserModalElement) || new Modal(addUserModalElement)
  addUserModal.show()
}