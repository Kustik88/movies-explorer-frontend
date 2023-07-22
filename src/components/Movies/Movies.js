import '../App/App.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import AdderMovies from '../AdderMovies/AdderMovies'

function Movies({ moviesList, moviesSavingList, isUserMovies }) {
  return (
    <main className='content'>
      <SearchForm />
      <MoviesCardList moviesList={moviesList} moviesSavingList={moviesSavingList} />
      <AdderMovies />
    </main>
  )
}

export default Movies
