import ModalButton from "./ModalButton"

const InfoModal = ({ isMobile }) => {

  return (
    <div className="modal custom-modal-animate" id="InfoModal" aria-labelledby="InfoModalLabel">
      <div className="modal-dialog modal-lg">
        <div className="modal-content glow">
          <div className="modal-body">
            <h5 className="modal-title mt-2 mb-3">Projektit / Ohjelmistokokemus</h5>
            <ul className={isMobile ? "" : "ms-4"}>
              <li className="fw-bold">Omat verkkosivut <a href="/aboutpage">simotoivanen.fi</a></li>

              <ul>
                <li>Frontend ja backend toteutettu itse</li>
                <li>Backend pyörii Raspberry Pi -palvelimella kotiverkossa</li>
                <li>Palvelun ylläpito, päivitykset ja toimintavarmuuden seuranta</li>
              </ul>

              <li className="fw-bold mt-2">Päiväkodin verkkosivusto <a href="https://pkpirttiry.fi" target="_blank" rel="noopener noreferrer">pkpirttiry.fi</a></li>

              <ul>
                <li>Fullstack-projekti oikealle asiakkaalle, sisältää admin-paneelin sivuston
                  sisällön päivittämiseksi sekä pdf-dokumenttien hallinnan</li>
                <li>Hoitopaikkahakemusten salaus ja tallennus MongoDB:hen</li>
                <li>Vastuu frontendistä, backendistä ja käyttöönotosta</li>
              </ul>
            
              <li className="fw-bold mt-2">Lifeline (kesken)</li>
              
              <ul>
                <li>Mobiilisovellus perhearjen hallintaan</li>
                <li>Web-hallintapaneeli ja -käyttöliittymä osittain valmis</li>
                <li>Backend-logiikka ja tietomallit suurimmalta osin toteutettu</li>
              </ul>
            </ul>

            <h5 className="modal-title mt-3 mb-3">Koulutus</h5>

            <ul className={isMobile ? "mt-3" : "mt-3 ms-4"} style={{ fontWeight: "bold" }}>
              <li>Tieto- ja viestintätekniikan perustutkinto (Etelä-Savon ammattiopisto ESEDU, valm. 12/2025)</li>
              <li>Yrittäjäkurssi (2013)</li>
              <li>Luottamusmieskoulutus, Metalliliitto (2012)</li>
              <li>Henkilöautomekaanikon ammattitutkinto (Kainuun ammattiopisto KAO, valm. 2011)</li>
            </ul>

            <h5 className="modal-title mt-4">Työkokemus</h5>
              <ul className={isMobile ? "mt-3" : "mt-3 ms-4"}>
                <li><b>Autoasentaja</b>, useita työnantajia <b>2006-2013 ja 2017-2023</b>, viimeisin <i>Huollan Oy</i>, Heinola <b>2017-2023</b></li>
                <li><b>Yrittäjä</b> <i>Puhelinhuoltamo.com</i>, Heinola <b>2013-2016</b></li>
                <li>Sekalaisia työsuhteita eri aloilta useilla paikkakunnilla <b>1996-2006</b></li>
              </ul>

            {!isMobile ? (
              <div className="d-flex align-items-center justify-content-center">
                <ModalButton action={'cv'} label={'CV'} isMobile={isMobile} />
                <ModalButton action={'tod'} label={'Tutkintotodistus'} isMobile={isMobile} />
                <ModalButton action={'sert'} label={'FSO-sertifikaatit'} isMobile={isMobile} />
                <ModalButton action={'close'} label={'Sulje'} isMobile={isMobile} />
              </div>
            ) : (
              <>
                <div className="row align-items-center justify-content-center">
                  <ModalButton action={'cv'} label={'CV'} isMobile={isMobile} />
                  <ModalButton action={'tod'} label={'Tutkintotodistus'} isMobile={isMobile} />
                </div>
                <div className="row align-items-center justify-content-center">
                  <ModalButton action={'sert'} label={'FullStackOpen'} isMobile={isMobile} />
                  <ModalButton action={'close'} label={'Sulje'} isMobile={isMobile} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal