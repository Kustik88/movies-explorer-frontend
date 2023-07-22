import './Portfolio.css'
import '../App/App.css'
import { Link } from 'react-router-dom'

function Portfolio() {
  return (
    <ul className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <li className='portfolio__item'>
        <h4 className='portfolio__heading'>Статичный сайт</h4>
        <Link className='link portfolio__link' to='https://github.com/Kustik88/how-to-learn'>
          ↗
        </Link>
      </li>
      <li className='portfolio__item'>
        <h4 className='portfolio__heading'>Адаптивный сайт</h4>
        <Link className='link portfolio__link' to='https://github.com/Kustik88/russian-travel'>
          ↗
        </Link>
      </li>
      <li className='portfolio__item portfolio__item_underline_none'>
        <h4 className='portfolio__heading'>Одностраничное приложение</h4>
        <Link className='link portfolio__link' to='https://github.com/Kustik88/react-mesto-api-full-gha'>
          ↗
        </Link>
      </li>
    </ul>
  )
}

export default Portfolio
