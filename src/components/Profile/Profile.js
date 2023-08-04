import './Profile.css'
import '../App/App.css'
import Content from "../Content/Content"
import EditUserForm from '../EditUserForm/EditUserForm'
import Greeting from '../Greeting/Greeting'

function Profile({ greetingText, isProfilePathName, logOutUser }) {
  return (
    <Content>
      <Greeting
        greetingText={greetingText}
        isProfilePathName={isProfilePathName} />
      <EditUserForm logOutUser={logOutUser} />
    </Content>
  )
}

export default Profile
