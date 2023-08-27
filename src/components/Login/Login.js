import Content from '../Content/Content'
import Greeting from '../Greeting/Greeting'
import AuthForm from '../AuthForm/AuthForm'

function Login({ greetingText, formName, isRegisterPathName, onLogin, errorText, isSubmiting }) {
  return (
    <Content>
      <Greeting greetingText={greetingText} />
      <AuthForm
        formName={formName}
        isRegisterPathName={isRegisterPathName}
        onSubmit={onLogin}
        errorText={errorText}
        isSubmiting={isSubmiting} />
    </Content>
  )
}

export default Login
