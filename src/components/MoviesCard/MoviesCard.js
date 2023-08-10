import '../App/App.css'
import './MoviesCard.css'
import { BASE_URL_MOVIES_API } from '../../constants/baseUrl'

function MoviesCard({ card, isSaved, isSavedMoviesPage, onMovieLike }) {
  const hoursDuration = Math.floor(card.duration / 60)
  const minutesDuration = card.duration % 60
  let movie
  if (isSavedMoviesPage) {
    movie = card
  } else {
    const imageUrl = `${BASE_URL_MOVIES_API}${card.image.url}`
    const { created_at, updated_at, id, image, ...propsMovie } = card
    movie = propsMovie
    movie.image = imageUrl
    movie.thumbnail = imageUrl
    movie.movieId = card.id
  }

  function handleLikeMovie() {
    onMovieLike(movie)
  }

  return (
    <li className='card'>
      {isSavedMoviesPage
        ? <button
          className='btn card__remove_btn'
          type='button'
          aria-label='удалить фильм'
          onClick={handleLikeMovie} />
        : isSaved
          ? <button
            className='btn card__like-btn card__like-btn_active'
            onClick={handleLikeMovie} />
          : <button
            className='btn card__save-btn'
            type='button'
            aria-label='сохранить фильм'
            onClick={handleLikeMovie}>
            Сохранить
          </button>
      }
      <img className='card__image' src={movie.image} alt={card.nameRU} />
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
