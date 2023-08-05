import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import AdderMovies from '../AdderMovies/AdderMovies'
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies'
import Preloader from '../Preloader/Preloader'
import SavedDevider from '../SavedDevider/SavedDevider'

function Movies({ moviesList, moviesSavingList, numberOfCards, isSmallScreen, pathName, onAdderMoviesClick, onSearch }) {
  return (
    <Content>
      <SearchForm isSmallScreen={isSmallScreen} onSubmit={onSearch} />
      {moviesList.length !== 0
        ? <>
          <MoviesCardList
            moviesList={moviesList}
            moviesSavingList={moviesSavingList}
            numberOfCards={numberOfCards}
            pathName={pathName} />
          <AdderMovies onAdderMoviesClick={onAdderMoviesClick} />
        </>
        : localStorage.getItem('seachText') ? <NotFoundMovies /> : <SavedDevider />
      }
    </Content>
  )
}

export default Movies
