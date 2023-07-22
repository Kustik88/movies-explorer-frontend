import './Greeting.css'
import LogoProject from '../LogoProject/LogoProject'

function Greeting({ greetingText, isProfilePathName }) {
  return (
    <section className="greeting">
      {!isProfilePathName && <LogoProject />}
      <h1
        className={
          `greeting__heading${isProfilePathName
            ? ' greeting__heading_position_center'
            : ''}`
        }
      >
        {greetingText}!
      </h1>
    </section>
  )
}

export default Greeting
