import './Techs.css'
import SectionTitle from '../SectionTitle/SectionTitle'

function Techs() {
  return (
    <section className='techs'>
      <SectionTitle titleText='Технологии' />
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__list'>
        <li className='techs__technology techs__technology_letter-case_upper'>html</li>
        <li className='techs__technology techs__technology_letter-case_upper'>css</li>
        <li className='techs__technology techs__technology_letter-case_upper'>js</li>
        <li className='techs__technology'>React</li>
        <li className='techs__technology'>Git</li>
        <li className='techs__technology'>Express.js</li>
        <li className='techs__technology'>mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs
