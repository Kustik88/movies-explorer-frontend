import '../App/App.css'
import './MoviesCard.css'
import { BASE_URL_MOVIES_API } from '../../constants/baseUrl'

function MoviesCard({ card, isSaved, isSavedMoviesPage }) {
  const hoursDuration = Math.floor(card.duration / 60)
  const minutesDuration = card.duration % 60
  return (
    <li className='card'>
      {isSavedMoviesPage
        ? <button className='btn card__remove_btn' type='button' aria-label='удалить фильм' />
        : isSaved
          ? <button className='btn card__like-btn card__like-btn_active' />
          : <button className='btn card__save-btn' type='button' aria-label='сохранить фильм'>Сохранить</button>
      }
      <img className='card__image' src={`${BASE_URL_MOVIES_API}${card.image.url}`} alt={card.nameRU} />
      <div className='card__descriprion'>
        <h3
          className='card__name'>
          {card.nameRU}
        </h3>
        <div className='card__duration-container'>
          <p className='card__duration'>
            {`${hoursDuration}ч ${minutesDuration}м`}
          </p>
        </div>
      </div>

    </li>
  )
}

export default MoviesCard
