import Content from '../Content/Content'
import Greeting from '../Greeting/Greeting'
import UserDataForm from '../UserDataForm/UserDataForm'

function Login({ greetingText, formName, isRegisterPathName }) {
  return (
    <Content>
      <Greeting greetingText={greetingText} />
      <UserDataForm formName={formName} isRegisterPathName={isRegisterPathName} />
    </Content>
  )
}

export default Login
