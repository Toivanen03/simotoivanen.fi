import github from '../assets/github-logo.png'
import facebook from '../assets/facebook-logo.png'
import linkedin from '../assets/LinkedIn_Icon.png'
import { useEffect, useState } from 'react'
import useWindowWidth from '../middleware/useWindowWidth'

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const width = useWindowWidth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-3">
      <div className="row d-flex justify-content-center align-items-center text-white px-5">
        <div className='col-2'>
          <p>
            {width > 768 ? (
              <small>© Simo Toivanen {width > 1583 && '2026'}</small>
            ) : (
              '© Simo Toivanen'
            )}
          </p>
        </div>
        <div className='col-4'>
          {showScrollTop && (
            <button className='btn btn-primary' onClick={scrollToTop}>Sivun alkuun ↑</button>
          )}
        </div>
        <div className="col-6 d-flex gap-4 justify-content-end">
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
    </footer>
  )
}

export default Footer