import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import '../App/App.css'
import LogoProject from '../LogoProject/LogoProject'
import Navigation from '../Navigation/Navigation'
import ProfileLink from '../ProfileLink/ProfileLink'
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '../../constants/pathName'

function Header({ isLoggedIn, isMiddleScreen, onIconMenuClick, pathName }) {
  return (
    <header className={`header${!isLoggedIn ? ' header_theme_dark-blue' : ''}`}>
      <LogoProject />
      {isLoggedIn
        ? isMiddleScreen
          ? <button type='button' aria-label='открыть меню' className='btn header__menu-btn' onClick={onIconMenuClick} />
          : <>
            <Navigation pathName={pathName} />
            <ProfileLink />
          </>
        : <div className='header__links'>
          <Link to={REGISTER_PATHNAME} className='link header__link'>Регистрация</Link>
          <Link to={LOGIN_PATHNAME} className='link header__link header__link_background_green'>Войти</Link>
        </div>
      }
    </header>
  )
}

export default Header
