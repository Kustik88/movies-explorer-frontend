import './promo.css'
import logoPromo from '../../images/promo-logo.svg'


function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <img className='promo__logo' src={logoPromo} alt='Логотип промо' />
    </section>
  )
}

export default Promo
