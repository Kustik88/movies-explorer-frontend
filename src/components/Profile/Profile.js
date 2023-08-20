import './Profile.css'
import '../App/App.css'
import Content from "../Content/Content"
import EditUserForm from '../EditUserForm/EditUserForm'
import Greeting from '../Greeting/Greeting'

function Profile({ greetingText, isProfilePathName, editUserData, logOutUser, errorText }) {
  return (
    <Content>
      <Greeting
        greetingText={greetingText}
        isProfilePathName={isProfilePathName} />
      <EditUserForm onSubmit={editUserData} logOutUser={logOutUser} errorText={errorText} />
    </Content>
  )
}

export default Profile
