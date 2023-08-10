import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SavedDevider from '../SavedDevider/SavedDevider'
import NotFoundMovies from '../BadSearchMoviesResult/BadSearchMoviesResult'

function SavedMovies({ moviesList, isSmallScreen, pathName, onMovieLike }) {
  return (
    <Content>
      <SearchForm isSmallScreen={isSmallScreen} />
      {moviesList.length !== 0
        ? <>
          <MoviesCardList
            moviesList={moviesList}
            pathName={pathName}
            onMovieLike={onMovieLike} />
          <SavedDevider />
        </>
        : <NotFoundMovies />}
    </Content>
  )
}

export default SavedMovies
