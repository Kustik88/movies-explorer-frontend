import { Link } from "react-router-dom"
import './ProfileLink.css'
import '../App/App.css'
import profileIcon from '../../images/profile-icon.svg'

function Profile() {
  return (

    <Link className='link profile-link' to='/profile'>
      <p className='profile-link__account'>Аккаунт</p>
      <div className='profile-link__icon-container'>
        <img className='profile-link__icon' src={profileIcon} alt='профиль' />
      </div>
    </Link>
  )
}

export default Profile
