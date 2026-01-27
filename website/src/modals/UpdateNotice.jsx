import { Link } from "react-router-dom"

const UpdateNotice = ({ onClose }) => {

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><strong>Simotoivanen.fi on päivitetty.</strong></h5>
          </div>
          <div className="modal-body">
            <p>Tervetuloa uusitulle sivulleni! Sivusto on rakennettu täysin uudelleen moderneja web-sovelluskehitystekniikoita hyödyntäen.</p>
            <p>Näet tämän ilmoituksen vain ensimmäisellä vierailullasi, mutta linkki sivuston tietoihin löytyy myös yläpalkista.</p>
            <p className="fs-4">Tervetuloa!</p>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button onClick={onClose} className="btn btn-primary">Sulje</button>
            <Link to={'/aboutpage'}>
                <button className="btn btn-primary" onClick={onClose}>Lue lisää</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default UpdateNotice