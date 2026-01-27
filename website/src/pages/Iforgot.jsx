import { useState } from "react"
import { validateEmail } from "../../schema/validateUserData"
import errorHandler from "../middleware/errorHandler"
import { useNavigate } from 'react-router-dom'

const Iforgot = ({ setConfirmTitle }) => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const pwdReset = async () => {
        const validation = validateEmail.safeParse({ email })

        if (!validation.success) {
            const errorMessages = validation.error.issues.map(e => e.message).join('\n')
            errorHandler(setConfirmTitle, errorMessages)
            return
        }

        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email })
            })

            if (!response.ok) {
                const errorData = await response.json()
                errorHandler(setConfirmTitle, errorData.error)
                return
            } else {
                setConfirmTitle('PwdReset')
                setEmail('')
                navigate('/')
            }

        } catch (error) {
            errorHandler(setConfirmTitle, 'Verkkovirhe tai palvelin ei vastaa')
        }
    }

    return (
  <div className="homeBg py-5">
    <div className="container d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Unohditko salasanasi?</h3>

          <p className="fs-5 text-center text-muted">Ei hätää, sellaista sattuu.</p>

          <div className="mb-3 mt-4">
            <label htmlFor="emailInput" className="form-label">
              Kirjoita sähköpostiosoitteesi, niin lähetämme sinulle salasanan vaihtolinkin.
            </label>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              className="form-control text-center mt-2"
              placeholder="email@esimerkki.fi"
            />
          </div>

          <div className="alert alert-secondary mt-4" role="alert">
            Linkki on voimassa <strong>15 minuuttia</strong> tilauksesta. Jos viestiä osoitteesta <strong>reset(at)simotoivanen.fi</strong> ei näy hetken päästä, tarkistathan myös roskapostikansiosi.
          </div>

          <div className="d-grid mt-4 d-flex justify-content-center">
            <button
              type="button"
              onClick={pwdReset}
              className="btn btn-primary"
            >
              Tilaa linkki
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default Iforgot