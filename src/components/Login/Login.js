import './Login.css'
import '../App/App.css'
import Greeting from '../Greeting/Greeting'

function Login({ greetingText }) {
  return (
    <main className='content'>
      <Greeting greetingText={greetingText} />
    </main>
  )
}

export default Login
