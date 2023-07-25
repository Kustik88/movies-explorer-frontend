import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({ moviesList, moviesSavingList, isUserMovies, numberOfCards }) {

  const renderList = moviesList.slice(0, numberOfCards)
  return (
    <ul className='movies-list'>
      {isUserMovies
        ? renderList.map(card => <MoviesCard key={card.id} card={card} isUserMovies={isUserMovies} />)
        : renderList.map(card =>
          <MoviesCard key={card.id} card={card} isSaved={moviesSavingList.some(movie => movie.id === card.id)} />
        )}
    </ul>
  )
}

export default MoviesCardList
