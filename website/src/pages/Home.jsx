import simo from '/img/simo.jpg'
import InfoModal from '../modals/InfoModal'
import ModalButton from '../modals/ModalButton'
import { useQuery } from '@apollo/client'
import { LATEST_BLOGS } from '../../schema/queries'
import { Link } from 'react-router-dom'
import { Node, JS, TS, HTML, CSS, Docker, Python, Bootstrap, React } from '../assets/svg/Logos'
import { useEffect } from 'react'
import Spinner from '../middleware/spinner'
import ErrorDiv from '../middleware/errorDiv'
import { useState } from 'react'

import pkpirttiry from '../assets/pkpirttiry.png'
import lifeline from '../assets/lifeline.png'

const Home = ({ isMobile }) => {
  const { loading, error, data, refetch } = useQuery(LATEST_BLOGS)
  const [hover, setHover] = useState(false)
  const testUsernamePart1 = "test"
  const testUsernamePart2 = "simotoivanen"
  const testUsernameOtherParts = ["@", ".fi"]

  useEffect(() => {
    refetch()
  }, [])

  if (loading) return <Spinner text={"Ladataan..."} />
  if (error) return <ErrorDiv error={error ? error : "Virhe haettaessa blogien esikatselua."} refetch={refetch} />
  
  return (
    <div className="homeBg">
      <div className='home-main'>
        <div className={isMobile ? "container mt-4 lead-container glow" : "container mt-4 lead-container glow p-5"}>
          <div className='row'>
            <div className="col-12">
              <h1 className="text-center text-md-start">Tervehdys!</h1>
            </div>
          </div>

          <div className='row'>
            <div className="col-md-8 mt-4 d-flex flex-column justify-content-start">
              <span className="lead">
                <p>Olen <strong>Simo Toivanen</strong>, juuri maksimiarvosanoin valmistunut ohjelmistokehittäjä.
                Minulla on vahva aiempi tausta teknisestä työstä ja ongelmanratkaisusta autoasentajana sekä
                puhelin- ja tietokonehuoltoyrittäjänä, ja nyt etsin ohjelmistoalalta työmahdollisuuksia,
                joissa voin hyödyntää analyyttistä ajattelukykyäni, ongelmanratkaisutaitojani sekä <strong>jatkuvaa haluani oppia uutta!</strong>
                </p>
              </span>

              <div className='row'>
                <div className={isMobile ? "col-6" : "col-4"}>
                  <ModalButton action="info" label={isMobile ? "Minusta" : "Lue lisää"} isMobile />
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 mb-3 d-flex justify-content-center">
              <img
                src={simo}
                className="my_picture img-fluid"
                alt="Simo Toivanen"
                title="Simo Toivanen"
              />
            </div>
          </div>

          <div className='row d-flex mt-3 mx-auto' style={{ maxWidth: '95%' }}>
            <p>Tämänhetkistä osaamistasoani kuvastaa ehkä parhaiten <a href="/aboutpage">tämä sivusto</a>, opinnäytetyönä tekemäni <a href="https://www.pkpirttiry.fi/" target="_blank" rel="noopener noreferrer">päiväkoti Pirtin</a> verkkosivusto sekä kehitteillä oleva <a href="https://github.com/Toivanen03/Lifeline" target="_blank" rel="noopener noreferrer">Lifeline</a> -projektini.</p>
            <p>Voit tutustua sivuston teknisiin ratkaisuihin laajemmin kirjautumalla sisään testitunnuksilla.</p>
            <ul>
              <li className='ms-5'>Käyttäjätunnus on <b aria-hidden="true">{testUsernamePart1 + testUsernameOtherParts[0] + testUsernamePart2 + testUsernameOtherParts[1]}</b></li>
              <li className='ms-5'>Salasana on <b>salasana</b> isolla alkukirjaimella, a-kirjaimet korvattuna numerolla 4, ja lopuksi huutomerkki.</li>
            </ul>
            <p>Testitunnuksilla pääset kirjautumaan sivustolle admin-käyttäjänä ja tutustumaan hallintapaneeliin.
              Sivuston suojaamiseksi varsinaiset tietokantamutaatiot on estetty.</p>
          </div>
        </div>

        <div className='row mt-5'></div>

        <div className='row mt-5 glow'>
          <div className='col-12 col-md-4 d-flex justify-content-center'>
            <h2 className='frontPage-headers'>Projekteja</h2>
          </div>
        </div>

        <div className='row justify-content-center text-center glow'>
          <div className="col-md-5 mt-5 d-flex align-items-stretch">
            <div className="card shadow-sm mb-4 w-100 h-100 d-flex flex-column">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Päiväkoti Pirtti</h5>
                <h6 className="card-subtitle mb-2 text-muted text-start p-1"><i>"Simo Toivanen aloitti projektin tutustumalla päiväkodin vanhoihin nettisivuihin ja somealustoihin. Uusia nettisivuja ohjelmoidessaan hän piti päiväkodin johtajaa hyvin kartalla etenemisestä ja osasi selittää siihen liittyviä asioita ymmärrettävästi ja kärsivällisesti. Simo on oma-aloitteinen, mutta kysyi hyvin myös palautetta ja teki ulkoasuun liittyen pyydettyjä muutoksia. Hän teki hyviä ehdotuksia ja selvitti eri mahdollisuuksia toteutukseen liittyen. Lopputulos on selkeä, kohderyhmälle soveltuva kokonaisuus. Nettisivujen ylläpito vaikuttaa riittävän yksinkertaiselle myös asioista vähän ymmärtävälle ja Simo on palvelualttiisti luvannut auttaa nettisivujen ylläpidossa myös jatkossa. Ns. maallikon silmin nettisivut valmistuivat hämmästyttävän nopeasti!"</i></h6>
                <h6 className="card-subtitle mb-2 text-muted text-start mt-2 mb-2">- Ronja Tarkiainen,<br /><span className='ms-2'>Päiväkodin johtaja</span></h6>
                <img
                  src={pkpirttiry}
                  alt="Kuvakaappaus päiväkoti Pirtin etusivusta"
                  className="img-fluid rounded border mb-4"
                  style={{ objectFit: "cover" }}
                />
                <div className="mt-auto">
                  <a
                    href="https://pkpirttiry.fi"
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tutustu
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5 mt-5 d-flex align-items-stretch">
            <div className="card shadow-sm mb-4 w-100 h-100 d-flex flex-column">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Lifeline</h5>
                <h6 className="card-subtitle mb-2 text-muted mt-2">Mobiilisovellus perhearjen helpottamiseksi.</h6>
                <h6 className="card-subtitle mb-2 text-muted mt-3 mb-5">Kuvakaappaus on sovelluksen web-hallintapaneelista. Voit tutustua lähdekoodiin Githubissa klikkaamalla alla olevaa painiketta.</h6>
                <img
                  src={lifeline}
                  alt="Kuvakaappaus Lifeline-sovelluksen web-hallintapaneelista."
                  className="img-fluid rounded border mb-4"
                  style={{
                    objectFit: "cover",
                    transform: hover ? "scale(1.5)" : "scale(1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                />
                <div className="mt-auto">
                  <a
                    href="https://github.com/Toivanen03/Lifeline"
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tutustu
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row justify-content-center text-center glow'>
          <div className="col-md-5 mt-5 d-flex align-items-stretch">
            <div className="card shadow-sm mb-4 w-100 h-100 d-flex flex-column">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Maisemanavigaattori</h5>
                <h6 className="card-subtitle mb-2 text-muted">Koodissa on käytetty OpenStreetMapin karttoja, HEREN geokoodausta sekä Overpass APIa reittihakuun. Ohjelma on keskeneräinen, mutta suunnitelmissa on koodata tämä uusiksi Reactilla hyödyntäen vanhasta koodista vain reitinlaskenta-algoritmit.</h6>
                <img
                  src="/old-exercises/Maisemanavigaattori/images/naviCode.png"
                  alt="Maisemanavigaattori"
                  className="img-fluid rounded border mb-4"
                  style={{ objectFit: "cover" }}
                />
                <div className="mt-auto">
                  <a
                    href="/old-exercises/Maisemanavigaattori/index.html"
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tutustu
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5 mt-5 d-flex align-items-stretch">
            <div className="card shadow-sm mb-4 w-100 h-100 d-flex flex-column">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Pong</h5>
                <h6 className="card-subtitle mb-2 text-muted">Oma versioni klassikkopelistä Javascriptillä ja CanvasAPIlla.</h6>
                <img
                  src="/old-exercises/Pong/img/pong.png"
                  alt="Pong"
                  className="img-fluid rounded border mb-4"
                  style={{ objectFit: "cover" }}
                />
                <div className="mt-auto">
                  <a
                    href="/old-exercises/Pong/pong.html"
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kokeile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {data?.latestBlogs?.length > 0 && (
          <>
            <div className='row mt-5'></div>

            <div className='row mt-5 glow'>
              <div className='col-12 col-md-4 d-flex justify-content-center'>
                <h2 className='frontPage-headers text-center'>Uusimmat blogit</h2>
              </div>
            </div>

            <div className='row justify-content-center glow'>
              {data.latestBlogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className='col-12 col-md-4 col-lg-4 mt-5 d-flex'
                >
                  <div className="card shadow-sm mb-3 w-100 d-flex flex-column">
                    <div className="card-body text-center d-flex flex-column">
                      <h5 className="card-title mb-3">{blog.title}</h5>
                      {blog.subtitle && (
                        <h6 className="card-subtitle mb-4 text-muted">{blog.subtitle}</h6>
                      )}
                      <div>
                        <p>{blog.content.length > 100
                          ? blog.content.substring(0, 100) + '...'
                          : blog.content
                        }</p>
                        <Link to={`/blog/${blog.id}`}>Lue lisää</Link>
                      </div>
                      <small className="text-muted mt-2">
                        Simo Toivanen, {new Date(Number(blog.createdAt)).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='row text-center glow'>
              <div className='col-12'>
                <Link to={'/blogs'}>
                  <button className='btn btn-primary mt-3' type='button'>Kaikki blogit</button>
                </Link>
              </div>
            </div>
          </>
        )}

        <div className="row mt-5 text-center glow-light">
          <div className="col-md-8 mx-auto mt-5 text-center">
            {Node}
            {JS}
            {React}
            {TS}
            {Bootstrap}
            {HTML}
            {CSS}
            {Docker}
            {Python}
          </div>
        </div>
      </div>
      <InfoModal isMobile={isMobile} />
    </div>
  )
}

export default Home
