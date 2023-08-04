import './Profile.css'
import '../App/App.css'
import Content from "../Content/Content"
import EditUserForm from '../EditUserForm/EditUserForm'
import Greeting from '../Greeting/Greeting'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile({ greetingText, isProfilePathName, logOut }) {
  return (
    <Content>
      <Greeting
        greetingText={greetingText}
        isProfilePathName={isProfilePathName} />
      <EditUserForm logout={logOut} />
    </Content>
  )
}

export default Profile
