import '../App/App.css'
import './MoviesCard.css'
import { Link } from 'react-router-dom'
import { BASE_URL_MOVIES_API } from '../../constants/baseUrl'

function MoviesCard({ card, isSaved, isSavedMoviesPage, isSmallScreen, onMovieLike }) {
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
          className={`btn card__remove_btn${isSmallScreen ? ' card__remove_btn_visible' : ''}`}
          type='button'
          aria-label='удалить фильм'
          onClick={handleLikeMovie} />
        : isSaved
          ? <button
            className='btn card__like-btn card__like-btn_active'
            onClick={handleLikeMovie} />
          : <button
            className={`btn card__save-btn${isSmallScreen ? ' card__save-btn_visible' : ''}`}
            type='button'
            aria-label='сохранить фильм'
            onClick={handleLikeMovie}>
            Сохранить
          </button>
      }
      <Link
        className='card__trailer-link'
        to={movie.trailerLink}
        target='_blank'
      >
        <img className='card__image' src={movie.image} alt={card.nameRU} />
      </Link>
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
