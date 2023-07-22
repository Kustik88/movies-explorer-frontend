import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SavedDevider from '../SavedDevider/SavedDevider'

function SavedMovies({ moviesList, isUserMovies }) {
  return (
    <Content>
      <SearchForm />
      <MoviesCardList moviesList={moviesList} isUserMovies={isUserMovies} />
      <SavedDevider />
    </Content>
  )
}

export default SavedMovies
