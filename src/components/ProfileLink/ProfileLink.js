import { Link } from "react-router-dom"
import './ProfileLink.css'
import '../App/App.css'

function Profile() {
  return (

    <Link className='link profile-link' to='/profile'>
      <p className='profile-link__account'>Аккаунт</p>
      <div className='profile-link__icon'>
      </div>
    </Link>
  )
}

export default Profile
