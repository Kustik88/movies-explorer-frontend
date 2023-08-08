import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

function MoviesCardList({ moviesList, moviesSavingList, numberOfRenderingCards, pathName, isLoading }) {

  const isSavedMoviesPage = '/saved-movies'.includes(pathName)

  const renderList = moviesList.slice(0, numberOfRenderingCards)

  return (
    <>
      {isLoading
        ? <Preloader />
        : <ul className='movies-list'>
          {isSavedMoviesPage
            ? renderList.map(card => <MoviesCard key={card.id} card={card} isSavedMoviesPage={isSavedMoviesPage} />)
            : renderList.map(card =>
              <MoviesCard key={card.id} card={card} isSaved={moviesSavingList.some(movie => movie.id === card.id)} />
            )}
        </ul>}
    </>

  )
}

export default MoviesCardList
