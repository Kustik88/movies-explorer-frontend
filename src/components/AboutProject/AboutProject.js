import './AboutProject.css'
import '../App/App.css'

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className="section-title">
        О проекте
      </h2>
      <ul className='about-project__info'>
        <li className='about-project__description'>
          <h3 className='about-project__heading'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__paragraph'>Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__description'>
          <h3 className='about-project__heading'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about-project__scale'>
        <div className='about-project__scale-item about-project__scale-item_theme_green'>
          <p className='about-project__stage about-project__stage_color_black'>1 неделя</p>
        </div>
        <div className='about-project__scale-item'>
          <p className='about-project__stage'>4 недели</p>
        </div>
        <p className='about-project__stage about-project__stage_color_grey'>Back-end</p>
        <p className='about-project__stage about-project__stage_color_grey'>Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject
