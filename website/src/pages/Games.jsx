import { imgStyle } from "../layout/ExerciseStyles"
import { Modal } from "bootstrap"
import { Link } from "react-router-dom"

const links = {
    clicker: "/old-exercises/Clicker/clicker.html",
    slots: "/old-exercises/Hedelmapeli/slots.html",
    mato: "/old-exercises/matopeli/index.html",
    pong: "/old-exercises/Pong/pong.html"
}

const Games = () => {
    const login = () => {
        const loginModalElement = document.getElementById('LoginModal')
        const loginModal = Modal.getInstance(loginModalElement) || new Modal(loginModalElement)
        loginModal.show()
    }
    
    return (
        <div className="gameArea">
            <div className="container text-white">
                <div className="row mt-5 glow" style={{padding: '20px'}}>
                    <div className="col-12 col-md-5 mb-4">
                        <h1>Opintojen aikaisia peliprojekteja</h1>
                    </div>
                    <div className="col-12 col-md-7" style={{ textAlign: 'justify' }}>
                        <p className="fs-5 mb-5">
                        Pelit ovat viimeistelemättömiä eivätkä näy oikein kaikilla laitteilla. Kyseiset projektit ovat opintojen aikaisia koodausharjoituksia, joilla on harjoiteltu erilaisia
                        koodauksen perustaitoja, kuten esimerkiksi Canvas APIa, alueen tunnistamista, funktioita tai interaktioita. Linkit pelien GitHub-repositorioihin löytyvät <Link to="/exercises">täältä</Link> (vaatii{' '}
                        <span onClick={() => login()} style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}>
                            kirjautumisen
                        </span>).
                        </p>
                        <p>Pong-peliä lukuunottamatta pelit eivät välttämättä toimi oikein mobiililaitteilla.</p><br />
                    </div>
                </div>

                <div className="row text-center glow">
                    <div className="col-12 col-md-5 mb-5">
                        <h4 className="mb-4">Matopeli</h4>
                        <a
                            href={links["mato"]}
                            className="text-decoration-none"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <img
                            src="/old-exercises/matopeli/img/mato.png"
                            alt="Matopeli"
                            style={imgStyle}
                        />
                        </a>
                    </div>

                    <div className="d-none d-md-block col-md-2">{/* TILANJAKAJA */}</div>

                    <div className="col-12 col-md-5 mb-5">
                        <h4 className="mb-4">Clicker-peli</h4>
                        <a
                            href={links["clicker"]}
                            className="text-decoration-none"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <img
                            src="/old-exercises/Clicker/img/ossi.png"
                            alt="Clicker-peli"
                            style={imgStyle}
                        />
                        </a>
                    </div>
                </div>

                <div className="row text-center glow">
                    <div className="col-12 col-md-5 mb-5">
                        <h4 className="mb-4">Hedelmäpeli</h4>
                        <a
                            href={links["slots"]}
                            className="text-decoration-none"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <img
                            src="/old-exercises/Hedelmapeli/img/slots.png"
                            alt="Hedelmäpeli"
                            style={imgStyle}
                        />
                        </a>
                    </div>

                    <div className="d-none d-md-block col-md-2">{/* TILANJAKAJA */}</div>

                    <div className="col-12 col-md-5 mb-5">
                        <h4 className="mb-4">Pong</h4>
                        <a
                            href={links["pong"]}
                            className="text-decoration-none"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <img
                            src="/old-exercises/Pong/img/pong.png"
                            alt="Pong"
                            style={imgStyle}
                        />
                        </a>
                    </div>

                </div>

                <div className="row text-center mt-5"> { /* TILANJAKAJA */ } </div> 

            </div>
        </div>
    )
}

export default Games