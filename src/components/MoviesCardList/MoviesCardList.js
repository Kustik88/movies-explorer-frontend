import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({ moviesList, moviesSavingList, numberOfCards, pathName }) {

  const isSavedMoviesPage = '/saved-movies'.includes(pathName)

  const renderList = moviesList.slice(0, numberOfCards)
  return (
    <ul className='movies-list'>
      {isSavedMoviesPage
        ? renderList.map(card => <MoviesCard key={card.id} card={card} isSavedMoviesPage={isSavedMoviesPage} />)
        : renderList.map(card =>
          <MoviesCard key={card.id} card={card} isSaved={moviesSavingList.some(movie => movie.id === card.id)} />
        )}
    </ul>
  )
}

export default MoviesCardList
