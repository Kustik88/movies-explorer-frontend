import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SavedDevider from '../SavedDevider/SavedDevider'
import NotFoundMovies from '../BadSearchMoviesResult/BadSearchMoviesResult'

function SavedMovies({
  moviesList,
  isSmallScreen,
  pathName,
  onShortMoviesFilterClick,
  onSearch,
  onMovieLike,
  textSearch,
  isShortFilterActive,
  isDisabledFilter,
}) {
  return (
    <Content>
      <SearchForm isSmallScreen={isSmallScreen}
        onSubmit={onSearch}
        textSearch={textSearch}
        isShortFilterActive={isShortFilterActive}
        onShortMoviesFilterClick={onShortMoviesFilterClick}
        isDisabledFilter={isDisabledFilter} />
      {moviesList.length !== 0
        ? <>
          <MoviesCardList
            moviesList={moviesList}
            pathName={pathName}
            isSmallScreen={isSmallScreen}
            onMovieLike={onMovieLike}
          />
          <SavedDevider />
        </>
        : textSearch
          ? <NotFoundMovies />
          : <SavedDevider />}
    </Content>
  )
}

export default SavedMovies
