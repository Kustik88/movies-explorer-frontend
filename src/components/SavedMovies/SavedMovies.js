import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SavedDevider from '../SavedDevider/SavedDevider'

function SavedMovies({ moviesList, isUserMovies, isSmallScreen }) {
  return (
    <Content>
      <SearchForm isSmallScreen={isSmallScreen} />
      <MoviesCardList moviesList={moviesList} isUserMovies={isUserMovies} />
      <SavedDevider />
    </Content>
  )
}

export default SavedMovies
