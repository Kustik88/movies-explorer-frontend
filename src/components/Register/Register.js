import './Register.css'
import '../App/App.css'
import Content from '../Content/Content'
import Greeting from '../Greeting/Greeting'
import AuthForm from '../AuthForm/AuthForm'

function Register({ greetingText, formName, isRegisterPathName }) {
  return (
    <Content>
      <Greeting greetingText={greetingText} />
      <AuthForm formName={formName} isRegisterPathName={isRegisterPathName} />
    </Content>
  )
}

export default Register
