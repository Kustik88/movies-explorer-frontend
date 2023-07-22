import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import '../App/App.css'
import LogoProject from '../LogoProject/LogoProject'
import Navigation from '../Navigation/Navigation'
import Profile from '../Profile/Profile'

function Header({ isLoggedIn }) {
  return (
    <header className={`header ${!isLoggedIn && 'header_theme_dark-blue'}`}>
      <LogoProject />
      {isLoggedIn
        ? <>
          <Navigation />
          <Profile />
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
