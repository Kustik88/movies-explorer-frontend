import '../App/App.css'
import './MoviesCard.css'

function MoviesCard({ card, isSaved, isSavedMoviesPage }) {
  return (
    <li className='card'>
      {isSavedMoviesPage
        ? <button className='btn card__remove_btn' type='button' aria-label='удалить фильм' />
        : isSaved
          ? <button className='btn card__like-btn card__like-btn_active' />
          : <button className='btn card__save-btn' type='button' aria-label='сохранить фильм'>Сохранить</button>
      }


      <img className='card__image' src={card.image} alt={card.name} />
      <div className='card__descriprion'>
        <h3
          className='card__name'>
          {card.name}
        </h3>
        <div className='card__duration-container'>
          <p className='card__duration'>{card.duration}</p>
        </div>
      </div>

    </li>
  )
}

export default MoviesCard
