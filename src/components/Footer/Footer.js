import './Footer.css'
import '../App/App.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__elems'>
        <p className='footer__copyright'>© {new Date().getFullYear()}</p>
        <nav className='footer__nav-bar'>
          <ul className='footer__links'>
            <li>
              <Link to='https://practicum.yandex.ru/' className='link footer__link'>
                Яндекс.Практикум
              </Link>
            </li>
            <li>
              <Link to='https://github.com/' className='link footer__link'>
                Github
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
