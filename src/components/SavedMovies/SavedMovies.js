import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SavedDevider from '../SavedDevider/SavedDevider'

function SavedMovies({ moviesList, isSavedMoviesPage, isSmallScreen, pathName }) {
  return (
    <Content>
      <SearchForm isSmallScreen={isSmallScreen} />
      <MoviesCardList
        moviesList={moviesList}
        isSavedMoviesPage={isSavedMoviesPage}
        pathName={pathName} />
      <SavedDevider />
    </Content>
  )
}

export default SavedMovies
