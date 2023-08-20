import Content from '../Content/Content'
import Greeting from '../Greeting/Greeting'
import AuthForm from '../AuthForm/AuthForm'

function Login({ greetingText, formName, isRegisterPathName, onLogin, errorText }) {
  return (
    <Content>
      <Greeting greetingText={greetingText} />
      <AuthForm formName={formName} isRegisterPathName={isRegisterPathName} onSubmit={onLogin} errorText={errorText} />
    </Content>
  )
}

export default Login
