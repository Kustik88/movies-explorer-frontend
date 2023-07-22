import './Greeting.css'
import LogoProject from '../LogoProject/LogoProject'

function Greeting({ greetingText }) {
  return (
    <section class="greeting">
      <LogoProject />
      <h1 className="greeting__heading">{greetingText}</h1>
    </section>
  )
}

export default Greeting
