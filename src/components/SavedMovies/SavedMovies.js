import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SavedDevider from '../SavedDevider/SavedDevider'
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies'

function SavedMovies({ moviesList, isSavedMoviesPage, isSmallScreen, pathName }) {
  return (
    <Content>
      <SearchForm isSmallScreen={isSmallScreen} />
      {moviesList.length !== 0
        ? <>
          <MoviesCardList
            moviesList={moviesList}
            isSavedMoviesPage={isSavedMoviesPage}
            pathName={pathName} />
          <SavedDevider />
        </>
        : <NotFoundMovies />}
    </Content>
  )
}

export default SavedMovies
