import '../App/App.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SavedDevider from '../SavedDevider/SavedDevider'

function SavedMovies({ moviesList, isUserMovies }) {
  return (
    <main className='content'>
      <SearchForm />
      <MoviesCardList moviesList={moviesList} isUserMovies={isUserMovies} />
      <SavedDevider />
    </main>
  )
}

export default SavedMovies
