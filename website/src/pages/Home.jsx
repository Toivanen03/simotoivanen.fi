import simo from '/img/simo.jpg'
import InfoModal from '../modals/InfoModal'
import ModalButton from '../modals/ModalButton'
import { useQuery } from '@apollo/client'
import { LATEST_BLOGS } from '../../schema/queries'
import { Link } from 'react-router-dom'
import { Node, JS, TS, HTML, CSS, Docker, Python, Bootstrap, React } from '../assets/svg/Logos'
import { useEffect } from 'react'

const Home = ({ isMobile }) => {
  const { loading, error, data, refetch } = useQuery(LATEST_BLOGS)
  const testUsernamePart1 = "test"
  const testUsernamePart2 = "simotoivanen"
  const testUsernameOtherParts = ["@", ".fi"]
  useEffect(() => {
    refetch()
  }, [])

  if (loading) return <p>Ladataan...</p>
  if (error) return <p>Virhe: {error.message}</p>
  
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
                <strong>Olen Simo Toivanen</strong>, ohjelmistokehittäjäopintojen loppuvaiheessa oleva opiskelija, jolla on{' '}
                <em>vahva tausta teknisestä työstä ja ongelmanratkaisusta</em> ― erityisesti autoasentajana sekä{' '}
                <em>puhelin- ja tietokonehuoltoyrittäjänä</em>. Etsin ohjelmistoalalta harjoittelu- tai työmahdollisuuksia,
                joissa voin hyödyntää{' '}
                <em>
                  analyyttistä ajattelukykyäni, ongelmanratkaisutaitojani ja <strong>jatkuvaa haluani oppia uutta!</strong>
                </em>
              </span>
              {!isMobile ? (
                <div className='row'>
                  <div className="col-4">
                    <ModalButton action="info" label="Faktoja minusta" isMobile />
                  </div>
                  <div className="col-4">
                    <ModalButton action="cv" label='Lataa CV' isMobile />
                  </div>
                </div>
              ) : (
                <div className='row'>
                  <div className="col-6">
                    <ModalButton action="info" label="Minusta" isMobile />
                  </div>
                  <div className="col-6">
                    <ModalButton action="cv" label='Lataa CV' isMobile />
                  </div>
                </div>
                )}
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

          <div className='row d-flex mt-5 mx-auto' style={{ maxWidth: '95%' }}>
            <p>Tämänhetkistä osaamistasoani kuvastaa vanhojen harjoitustöiden sijasta todennäköisimmin <a href="/aboutpage">tämä sivusto</a> sekä <a href="https://github.com/Toivanen03/Lifeline" target="_blank" rel="noopener noreferrer">Lifeline</a> -projekti.</p>
            <p>Voit tutustua sivuston teknisiin ratkaisuihin laajemmin kirjautumalla sisään testitunnuksilla.<br/><br />
              - Käyttäjätunnus on <b aria-hidden="true">{testUsernamePart1 + testUsernameOtherParts[0] + testUsernamePart2 + testUsernameOtherParts[1]}</b><br />
              - Salasana on <b>salasana</b> isolla alkukirjaimella, a-kirjaimet korvattuna numerolla 4, ja lopuksi huutomerkki.<br /><br />
              Testitunnuksilla pääset kirjautumaan sivustolle admin-käyttäjänä ja tutustumaan hallintapaneeliin.
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
          <div className="col-12 col-md-4 mt-5 d-flex align-items-stretch">
            <div className="card shadow-sm mb-4 w-100 h-100 d-flex flex-column">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Maisemanavigaattori</h5>
                <h6 className="card-subtitle mb-2 text-muted">Koodissa on käytetty OpenStreetMapin karttoja, HEREN geokoodausta sekä Overpass APIa reittihakuun. Ohjelma on keskeneräinen, mutta suunnitelmissa on koodata tämä uusiksi <a href="https://github.com/Toivanen03/Lifeline" target="_blank" rel="noopener noreferrer">Lifelinen</a> valmistuttua.</h6>
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

          <div className="col-12 col-md-4 mt-5 d-flex align-items-stretch">
            <div className="card shadow-sm mb-4 w-100 h-100 d-flex flex-column">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Pong</h5>
                <h6 className="card-subtitle mb-2 text-muted">Oma versioni klassikkopelistä</h6>
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
      <InfoModal />
    </div>
  )
}

export default Home
