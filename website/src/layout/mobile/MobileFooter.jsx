import github from '../../assets/github-logo.png'
import facebook from '../../assets/facebook-logo.png'
import linkedin from '../../assets/LinkedIn_Icon.png'
import useWindowWidth from '../../middleware/useWindowWidth'
import { useEffect, useState } from 'react'

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const width = useWindowWidth()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="row d-flex align-items-center">
        <div className={showScrollTop ? 'col-4' : 'col-6'}>
          <p className="mb-0 text-nowrap">
            {width <= 400 ? (
              <small>{showScrollTop ? '© ST 2026' : '© Simo Toivanen'}</small>
            ) : (
              '© Simo Toivanen 2026'
            )}
          </p>
        </div>

        {showScrollTop && (
          <div className="col-2 text-end">
            <button className='btn btn-primary' onClick={scrollToTop}>
              <small>{width < 400 ? '↑' : 'Ylös ↑'}</small>
            </button>
          </div>
        )}

        <div className={showScrollTop ? 'col-6' : 'col-6'}>
          <div className="d-flex gap-3 justify-content-end align-items-center">
            <a href="https://github.com/Toivanen03" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/simotoivanen/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href="https://www.facebook.com/simo.toivanen" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" className='fb'/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer