import './Register.css'
import '../App/App.css'
import Content from '../Content/Content'
import Greeting from '../Greeting/Greeting'
import AuthForm from '../AuthForm/AuthForm'

function Register({ greetingText, formName, isRegisterPathName, onSignUp, errorText, isSubmiting }) {
  return (
    <Content>
      <Greeting greetingText={greetingText} />
      <AuthForm
        formName={formName}
        isRegisterPathName={isRegisterPathName}
        onSubmit={onSignUp}
        errorText={errorText}
        isSubmiting={isSubmiting} />
    </Content>
  )
}

export default Register
