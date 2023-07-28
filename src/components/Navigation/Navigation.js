import './Navigation.css'
import '../App/App.css'
import { Link } from 'react-router-dom'


function Navigation({ isMiddleScreen, pathName }) {
  const isMoviesPage = '/movies'.includes(pathName)
  const isSavedMoviesPage = '/saved-movies'.includes(pathName)

  return (
    <nav className='navigation'>
      <ul className='navigation__links' >
        {isMiddleScreen &&
          <li >
            <Link
              to='/'
              className='link navigation__link'>
              Главная
            </Link>
          </li>}
        <li >
          <Link
            to='/movies'
            className={`link navigation__link${isMoviesPage ? ' navigation__link_active' : ''}`}>
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            to='/saved-movies'
            className={`link navigation__link${isSavedMoviesPage ? ' navigation__link_active' : ''}`}>
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
