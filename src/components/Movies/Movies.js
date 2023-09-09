import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import AdderMovies from '../AdderMovies/AdderMovies'
import BadSearchMoviesResult from '../BadSearchMoviesResult/BadSearchMoviesResult'
import SavedDevider from '../SavedDevider/SavedDevider'
import Preloader from '../Preloader/Preloader'

function Movies({
  moviesList,
  moviesSavingList,
  numberOfRenderingCards,
  isSmallScreen,
  pathName,
  onAdderMoviesClick,
  onShortMoviesFilterClick,
  onSearch,
  onMovieLike,
  textSearch,
  isShortFilterActive,
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
        onShortMoviesFilterClick={onShortMoviesFilterClick} />
      {isLoading
        ? <Preloader />
        : moviesList.length !== 0
          ? <>
            <MoviesCardList
              moviesList={moviesList}
              moviesSavingList={moviesSavingList}
              numberOfRenderingCards={numberOfRenderingCards}
              pathName={pathName}
              onMovieLike={onMovieLike}
              isSmallScreen={isSmallScreen} />
            {(moviesList.length > numberOfRenderingCards && !isLoading)
              ? <AdderMovies onAdderMoviesClick={onAdderMoviesClick} />
              : <SavedDevider />}
          </>
          : textSearch ? <BadSearchMoviesResult isServerError={isServerError} /> : <SavedDevider />
      }

    </Content>
  )
}

export default Movies
