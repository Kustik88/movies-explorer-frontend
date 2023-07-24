import './Navigation.css'
import '../App/App.css'
import { Link } from 'react-router-dom'


function Navigation({ isLoggedIn, isDropDownMenu }) {
  return (
    <nav className='navigation'>
      <ul className={`navigation__links${isDropDownMenu ? ' navigation__links_placement_column' : ''}`}>
        <li >
          <Link to='/movies' className='link navigation__link navigation__link_active'>Фильмы</Link>
        </li>
        <li>
          <Link to='/saved-movies' className='link navigation__link'>Сохраненные фильмы</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
