import Content from '../Content/Content'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import AdderMovies from '../AdderMovies/AdderMovies'

function Movies({ moviesList, moviesSavingList, isUserMovies }) {
  return (
    <Content>
      <SearchForm />
      <MoviesCardList moviesList={moviesList} moviesSavingList={moviesSavingList} />
      <AdderMovies />
    </Content>
  )
}

export default Movies
