import './AboutMe.css'
import '../App/App.css'
import { Link } from 'react-router-dom'
import Portfolio from '../Portfolio/Portfolio'
import avatar from '../../images/avatar.jpg'
import SectionTitle from '../SectionTitle/SectionTitle'

function AboutMe() {
  return (
    <section className='about-me'>
      <SectionTitle titleText='Студент' />
      <div className='about-me_profile'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Анастасия</h3>
          <p className='about-me__about'>Фронтенд-разработчик, 34 года</p>
          <p className='about-me__biography'>
            Я родилась в небольшом городе на севере Казахстана, Красногорске, но еще в детстве моя семья оттуда переехала
            в Омск. Закончила Российский Государственный Торгово-Экономический университет.
            Очень долго работала финансистом-аналитиком в разных компаниях, но
            поняла, что мне это не нравится. Решила попробовать себя в веб-разработке. Сейчас работаю
            над сайтом школы плаванания 'Жемчужинка'.
          </p>
          <Link
            className='link about-me__url'
            to='https://github.com/Kustik88'
            target='_blank'
          >Github
          </Link>
        </div>
        <img className='about-me__avatar' src={avatar} alt='аватар' />
      </div>
      <Portfolio />
    </section>


  )
}

export default AboutMe
