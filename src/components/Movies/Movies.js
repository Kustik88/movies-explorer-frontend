import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import AdderMovies from '../AdderMovies/AdderMovies'
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies'

function Movies({ moviesList, moviesSavingList, numberOfCards, isSmallScreen, pathName }) {
  return (
    <Content>
      <SearchForm isSmallScreen={isSmallScreen} />
      {moviesList.length !== 0
        ? <>
          <MoviesCardList
            moviesList={moviesList}
            moviesSavingList={moviesSavingList}
            numberOfCards={numberOfCards}
            pathName={pathName} />
          <AdderMovies />
        </>
        : <NotFoundMovies />
      }
    </Content>
  )
}

export default Movies
