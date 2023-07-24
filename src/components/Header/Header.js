import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import '../App/App.css'
import LogoProject from '../LogoProject/LogoProject'
import Navigation from '../Navigation/Navigation'
import ProfileLink from '../ProfileLink/ProfileLink'

function Header({ isLoggedIn, isSmallScreen, onIconMenuClick }) {
  return (
    <header className={`header ${!isLoggedIn && 'header_theme_dark-blue'}`}>
      <LogoProject />
      {isLoggedIn
        ? isSmallScreen
          ? <button type='button' aria-label='открыть меню' className='btn header__menu-btn' onClick={onIconMenuClick} />
          : <>
            <Navigation />
            <ProfileLink />
          </>
        : <div className='header__links'>
          <Link to='/sign-up' className='link header__link'>Регистрация</Link>
          <Link to='/sign-in' className='link header__link header__link_background_green'>Войти</Link>
        </div>
      }
    </header>
  )
}

export default Header
