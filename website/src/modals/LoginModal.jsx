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