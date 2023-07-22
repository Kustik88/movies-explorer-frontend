import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({ moviesList, moviesSavingList, isUserMovies }) {
  return (
    <ul className='movies-list'>
      {isUserMovies
        ? moviesList.map(card => <MoviesCard key={card.id} card={card} isUserMovies={isUserMovies} />)
        : moviesList.map(card =>
          <MoviesCard key={card.id} card={card} isSaved={moviesSavingList.some(movie => movie.id === card.id)} />

        )}
    </ul>
  )
}

export default MoviesCardList
