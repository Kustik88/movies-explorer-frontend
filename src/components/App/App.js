import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login'
import Footer from '../Footer/Footer'
import { moviesList } from '../../constants/moviesList'
import { moviesSavingList } from '../../constants/moviesSavingList'

function App() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isLikedMoviesPage, setIsLikedMoviesPage] = useState(true)

  const hideHeaderFooter = (pathname) => ['/sign-in', '/sign-up'].includes(pathname)

  return (
    <div className="App">
      {!hideHeaderFooter(location.pathname) && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={
          <Movies
            moviesList={moviesList}
            moviesSavingList={moviesSavingList}
            isUserMovies={isLikedMoviesPage}
          />} />
        <Route path='/saved-movies' element={
          <SavedMovies
            moviesList={moviesSavingList}
            isUserMovies={isLikedMoviesPage}
          />} />
        <Route path='/sign-in' element={<Login greetingText='Рады видеть!' />} />
        {/* <Route path='/profile' element={<Profile />} />

        <Route path='/sign-up' element={<Register />} /> */}

      </Routes>
      {!hideHeaderFooter(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
