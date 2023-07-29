import './Portfolio.css'
import '../App/App.css'
import { Link } from 'react-router-dom'

function Portfolio() {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__items'>
        <li className='portfolio__item'>
          <Link
            className='link portfolio__link'
            to='https://github.com/Kustik88/how-to-learn'
            target='blank'>
            <h4 className='portfolio__link-heading'>Статичный сайт</h4>
            <p className='portfolio__link-icon'>↗</p>
          </Link>
        </li>
        <li className='portfolio__item'>
          <Link
            className='link portfolio__link'
            to='https://github.com/Kustik88/russian-travel'
            target='blank'>
            <h4 className='portfolio__link-heading'>Адаптивный сайт</h4>
            <p className='portfolio__link-icon'>↗</p>
          </Link>
        </li>
        <li className='portfolio__item portfolio__item_underline_none'>
          <Link
            className='link portfolio__link'
            to='https://github.com/Kustik88/react-mesto-api-full-gha'
            target='blank'>
            <h4 className='portfolio__link-heading'>Одностраничное приложение</h4>
            <p className='portfolio__link-icon'>↗</p>
          </Link>
        </li>
      </ul>
    </div>

  )
}

export default Portfolio
