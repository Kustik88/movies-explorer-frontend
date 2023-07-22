import { Link } from "react-router-dom"
import './Profile.css'
import '../App/App.css'
import profileIcon from '../../images/profile-icon.svg'

function Profile() {
  return (

    <Link className='link profile' to='/profile'>
      <p className='profile__account'>Аккаунт</p>
      <div className='profile__icon-container'>
        <img className='profile__icon' src={profileIcon} alt='профиль' />
      </div>
    </Link>
  )
}

export default Profile
