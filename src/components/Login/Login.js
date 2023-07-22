import Content from '../Content/Content'
import Greeting from '../Greeting/Greeting'
import AuthForm from '../AuthForm/AuthForm'
import LogoProject from '../LogoProject/LogoProject'

function Login({ greetingText, formName, isRegisterPathName }) {
  return (
    <Content>
      <Greeting greetingText={greetingText} />
      <AuthForm formName={formName} isRegisterPathName={isRegisterPathName} />
    </Content>
  )
}

export default Login
