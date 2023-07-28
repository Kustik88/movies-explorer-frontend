import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import AdderMovies from '../AdderMovies/AdderMovies'

function Movies({ moviesList, moviesSavingList, numberOfCards, isSmallScreen, pathName }) {
  return (
    <Content>
      <SearchForm isSmallScreen={isSmallScreen} />
      <MoviesCardList
        moviesList={moviesList}
        moviesSavingList={moviesSavingList}
        numberOfCards={numberOfCards}
        pathName={pathName} />
      <AdderMovies />
    </Content>
  )
}

export default Movies
