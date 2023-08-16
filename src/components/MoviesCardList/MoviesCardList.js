import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

function MoviesCardList({
  moviesList,
  moviesSavingList,
  numberOfRenderingCards,
  pathName,
  onMovieLike,
  isLoading }) {

  const isSavedMoviesPage = '/saved-movies'.includes(pathName)
  let renderList
  isSavedMoviesPage
    ? renderList = moviesList
    : renderList = moviesList.slice(0, numberOfRenderingCards)

  return (
    <>
      {isLoading
        ? <Preloader />
        : <ul className='movies-list'>
          {isSavedMoviesPage
            ? renderList.map(card =>
              <MoviesCard
                key={card._id}
                card={card}
                isSavedMoviesPage={isSavedMoviesPage}
                onMovieLike={onMovieLike} />)
            : renderList.map(card =>
              <MoviesCard
                key={card.id}
                card={card}
                isSaved={moviesSavingList.some(movie => movie.movieId === card.id)}
                onMovieLike={onMovieLike} />
            )}
        </ul>}
    </>

  )
}

export default MoviesCardList
