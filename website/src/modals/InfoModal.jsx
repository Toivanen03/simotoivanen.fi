import ModalButton from "./ModalButton"
import { Modal } from "bootstrap"
import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"
import { newUser } from "../middleware/newUser"

const InfoModal = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className="modal custom-modal-animate" id="InfoModal" aria-labelledby="InfoModalLabel">
      <div className="modal-dialog modal-lg">
        <div className="modal-content glow">
          <div className="modal-header">
            <h5 className="modal-title" id="InfoModalLabel">Opintoni ja koulutukseni</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ul style={{ fontWeight: "bold" }}>
              <li>Tieto- ja viestintätekniikan perustutkinto (Etelä-Savon ammattiopisto ESEDU, arv. valm. 12/2025)</li>
              <li>Yrittäjäkurssi (2013)</li>
              <li>Luottamusmieskoulutus, Metalliliitto (2012)</li>
              <li>Henkilöautomekaanikon ammattitutkinto (näyttötutkinto, Kainuun ammattiopisto KAO, valm. 2011)</li>
            </ul>
              {!isLoggedIn && (<p>
                Voit ladata CV:ni <a href="#" onClick={(e) => {
                  e.preventDefault()
                  const loginModalEl = document.getElementById('LoginModal')
                  if (loginModalEl) {
                    const loginModal = Modal.getInstance(loginModalEl) || new Modal(loginModalEl)
                    loginModal.show()
                  }
                }}>kirjauduttuasi sisään</a>. Voit luoda tunnukset <a href="#" onClick={(e) => {
                  e.preventDefault()
                  newUser()
                }}>tästä</a>.</p>
                )}

              <h5 className="modal-title mt-4">Työkokemukseni</h5>
                <ul className="mt-3">
                  <li><b>Autoasentaja</b>, useita työnantajia <b>2006-2013</b>, viimeisin <i>Huollan Oy</i>, Heinola <b>2017-2023</b></li>
                  <li><b>Yrittäjä</b> <i>Puhelinhuoltamo.com</i>, Heinola <b>2013-2016</b></li>
                  <li>Sekalaisia työsuhteita eri paikkakunnilla <b>1996-2005</b></li>
                </ul>
              {isLoggedIn && <ModalButton action={'cv'} label='Lataa CV' />}
              <ModalButton action={'close'} label='Sulje' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal