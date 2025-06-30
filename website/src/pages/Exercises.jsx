import { iframeStyle, containerStyle, overlayLinkStyle, imgStyle } from '../layout/ExerciseStyles'

const Exercises = () => {
  const urls = {
    hirsipuu: "/old-exercises/hirsipuu.html",
    respSivu: "/old-exercises/responsiivinen_sivu/index.html",
    respBoot: "/old-exercises/responsiivinen_sivu_bootstrapilla/index.html",
    tamaSivu: "https://simotoivanen.fi",
    kaverit1: "/old-exercises/Kaverilista_v1.0/kaverilista_v1.0.html",
    kaverit2: "/old-exercises/Kaverilista_v2.0/kaverilista_v2.0.html",
    lampo: "/old-exercises/Lampotilamuunnin/lampotilamuunnin.html",
    lomake: "/old-exercises/Lomake/lomake.html",
    clicker: "/old-exercises/Clicker/clicker.html",
    noppa: "/old-exercises/Noppapeli/peli.html",
    slots: "/old-exercises/Hedelmapeli/slots.html",
    usecase: "/old-exercises/UML_Use_Case/index.html",
    mato: "/old-exercises/matopeli/index.html"
  }

  const githubUrls = {
    hirsipuu: "https://github.com/Toivanen03/Hirsipuu",
    respSivu: "https://github.com/Toivanen03/HTML-CSS/tree/main/Responsiivinen%20kotisivu",
    respBoot: "https://github.com/Toivanen03/HTML-CSS/tree/main/Responsiivinen%20kotisivu%20bootstrapilla",
    tamaSivu: "https://github.com/Toivanen03/Toivanen03.github.io",
    kaverit1: "https://github.com/Toivanen03/Toivanen03.github.io/tree/main/JavaScript-harjoitukset/Kaverilista_v1.0",
    kaverit2: "https://github.com/Toivanen03/Toivanen03.github.io/tree/main/JavaScript-harjoitukset/Kaverilista_v2.0",
    lampo: "https://github.com/Toivanen03/Toivanen03.github.io/tree/main/JavaScript-harjoitukset/Lampotilamuunnin",
    lomake: "https://github.com/Toivanen03/Toivanen03.github.io/tree/main/JavaScript-harjoitukset/Lomake",
    clicker: "https://github.com/Toivanen03/Toivanen03.github.io/tree/main/JavaScript-harjoitukset/Clicker",
    noppa: "https://github.com/Toivanen03/Toivanen03.github.io/tree/main/JavaScript-harjoitukset/Noppapeli",
    slots: "https://github.com/Toivanen03/Toivanen03.github.io/tree/main/JavaScript-harjoitukset/Hedelmapeli",
    usecase: "https://github.com/Toivanen03/UseCase",
    mato: "https://github.com/Toivanen03/Matopeli"
  }

  const link = (url) => urls[url]

  return (
    <div className='practice' style={{ padding: "16px" }}>
      <div className='container mt-3 lead-container glow'>
        <div className="row">
          <h1 className='glow exerciseHeader' style={{
            padding: '20px',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}>
            Vanhoja ohjelmointiharjoituksia
          </h1>
          <div className='col-10 offset-1'>
            <p className="fs-5">
              Alla olevat, opintojeni alun aikaiset koodausharjoitukset on tarkoitettu lähinnä Esedun opettajille tarkastettavaksi. Harjoitukset ovat viimeistelemättömiä
              ja optimoimattomia, eikä niitä kehitetä tai päivitetä.
            </p>
            <p className="fs-5">Esikatselusta saat avattua sisällön, otsikosta GitHubin repositorion.</p>
          </div>
        </div>
      </div>

      <div className="row mt-5 glow">
        {["hirsipuu", "respSivu"].map((key) => (
          <div className="col-12 col-md-6 text-center" key={key}>
            <h2 className="mt-4 mb-4 fw-bold">
              <a
                href={githubUrls[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                {key === "hirsipuu" ? (<span className='exerciseHeader'>Hirsipuu</span>) : (<span className='exerciseHeader'>Responsiivinen kotisivu</span>)}
              </a>
            </h2>
            <div style={containerStyle}>
              <iframe src={link(key)} title={key} style={iframeStyle} />
              <a
                href={link(key)}
                target="_blank"
                rel="noopener noreferrer"
                style={overlayLinkStyle}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="row glow">
        {["respBoot", "tamaSivu"].map((key) => (
          <div className="col-12 col-md-6 text-center" key={key}>
            <h2 className="mt-4 mb-4 fw-bold">
              <a
                href={githubUrls[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                {key === "respBoot"
                  ? (<span className='exerciseHeader'>Responsiivinen kotisivu Bootstrapilla</span>)
                  : (<span className='exerciseHeader'>Oma kotisivu</span>)}
              </a>
            </h2>
            <div style={containerStyle}>
              <iframe src={link(key)} title={key} style={iframeStyle} />
              <a
                href={link(key)}
                target="_blank"
                rel="noopener noreferrer"
                style={overlayLinkStyle}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="row glow">
        {["kaverit1", "kaverit2"].map((key, i) => (
          <div className="col-12 col-md-6 text-center" key={key}>
            <h2 className="mt-4 mb-4 fw-bold">
              <a
                href={githubUrls[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <span className='exerciseHeader'>Kaverilista JavaScriptillä, versio {i + 1}</span>
              </a>
            </h2>
            <div style={containerStyle}>
              <iframe src={link(key)} title={key} style={iframeStyle} />
              <a
                href={link(key)}
                target="_blank"
                rel="noopener noreferrer"
                style={overlayLinkStyle}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="row glow">
        {["lampo", "lomake"].map((key) => (
          <div className="col-12 col-md-6 text-center" key={key}>
            <h2 className="mt-4 mb-4 fw-bold">
              <a
                href={githubUrls[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                {key === "lampo" ? (<span className='exerciseHeader'>Lämpötilamuunnin</span>) : (<span className='exerciseHeader'>Lomakkeen validointi</span>)}
              </a>
            </h2>
            <div style={containerStyle}>
              <iframe src={link(key)} title={key} style={iframeStyle} />
              <a
                href={link(key)}
                target="_blank"
                rel="noopener noreferrer"
                style={overlayLinkStyle}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="row glow">
        <div className="col-12 col-md-6 text-center">
          <h2 className="mt-4 mb-4 fw-bold">
            <a
              href={githubUrls.clicker}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <span className='exerciseHeader'>Clicker-peli</span>
            </a>
          </h2>
          <a
            href={link("clicker")}
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
        <div className="col-12 col-md-6 text-center">
          <h2 className="mt-4 mb-4 fw-bold">
            <a
              href={githubUrls.noppa}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <span className='exerciseHeader'>Noppapeli</span>
            </a>
          </h2>
          <div style={containerStyle}>
            <iframe src={link("noppa")} title="Noppapeli" style={iframeStyle} />
            <a
              href={link("noppa")}
              target="_blank"
              rel="noopener noreferrer"
              style={overlayLinkStyle}
            />
          </div>
        </div>
      </div>

      <div className="row glow">
        <div className="col-12 col-md-6 text-center">
          <h2 className="mt-4 mb-4 fw-bold">
            <a
              href={githubUrls.slots}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <span className='exerciseHeader'>Hedelmäpeli</span>
            </a>
          </h2>
          <a
            href={link("slots")}
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
        <div className="col-12 col-md-6 text-center">
          <h2 className="mt-4 mb-4 fw-bold">
            <a
              href={githubUrls.usecase}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <span className='exerciseHeader'>Use Case -projekti (äänestyssovellus)</span>
            </a>
          </h2>
          <div style={containerStyle}>
            <iframe
              src={link("usecase")}
              title="Use Case -projekti"
              style={iframeStyle}
            />
            <a
              href={link("usecase")}
              target="_blank"
              rel="noopener noreferrer"
              style={overlayLinkStyle}
            />
          </div>
        </div>
      </div>

      <div className="row glow">
        <div className="col-12 col-md-6 text-center">
          <h2 className="mt-4 mb-4 fw-bold">
            <a
              href={githubUrls.mato}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <span className='exerciseHeader'>CanvasAPI, Toivanen & Svanström: Matopeli</span>
            </a>
          </h2>
          <a
            href={link("mato")}
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
      </div>
    </div>
  )
}

export default Exercises