import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import AdderMovies from '../AdderMovies/AdderMovies'
import BadResultFoundMovies from '../BadSearchMoviesResult/BadSearchMoviesResult'
import SavedDevider from '../SavedDevider/SavedDevider'

function Movies({
  moviesList,
  moviesSavingList,
  numberOfRenderingCards,
  isSmallScreen,
  pathName,
  onAdderMoviesClick,
  onShortMoviesFilterClick,
  onSearch,
  textSearch,
  isShortFilterActive,
  isDisabledFilter,
  isServerError,
  isLoading
}) {
  return (
    <Content>
      <SearchForm
        isSmallScreen={isSmallScreen}
        onSubmit={onSearch}
        textSearch={textSearch}
        isShortFilterActive={isShortFilterActive}
        onShortMoviesFilterClick={onShortMoviesFilterClick}
        isDisabledFilter={isDisabledFilter} />
      {moviesList.length !== 0
        ? <>
          <MoviesCardList
            moviesList={moviesList}
            moviesSavingList={moviesSavingList}
            numberOfRenderingCards={numberOfRenderingCards}
            pathName={pathName}
            isLoading={isLoading} />
          {(moviesList.length > numberOfRenderingCards && !isLoading)
            ? <AdderMovies onAdderMoviesClick={onAdderMoviesClick} />
            : <SavedDevider />}
        </>
        : textSearch ? <BadResultFoundMovies isServerError={isServerError} /> : <SavedDevider />
      }
    </Content>
  )
}

export default Movies
