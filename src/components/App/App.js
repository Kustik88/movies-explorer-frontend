import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer'
import { moviesList } from '../../constants/moviesList'
import { moviesSavingList } from '../../constants/moviesSavingList'

function App() {
  const location = useLocation()
  // const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isLikedMoviesPage, setIsLikedMoviesPage] = useState(true)

  const hideHeader = (pathName) => ['/sign-in', '/sign-up'].includes(pathName)
  const hideFooter = (pathName) => ['/sign-in', '/sign-up', '/profile'].includes(pathName)
  const togleHeaderTheme = (pathName) => '/'.includes(pathName)
  const isRegisterPathName = (pathName) => '/sign-up'.includes(pathName)
  const isProfilePathName = (pathName) => '/profile'.includes(pathName)

  return (
    <div className="App">
      {!hideHeader(location.pathname) && <Header isLoggedIn={!togleHeaderTheme(location.pathname)} />}
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
        <Route
          path='/sign-in' element={
            <Login
              greetingText='Рады видеть'
              formName='login'
              isRegisterPathName={isRegisterPathName(location.pathname)}
            />} />
        <Route
          path='/sign-up'
          element={
            <Register
              greetingText='Добро пожаловать'
              formName='register'
              isRegisterPathName={isRegisterPathName(location.pathname)}
            />} />
        <Route path='/profile' element={
          <Profile greetingText='Привет, Виталий' isProfilePathName={isProfilePathName} />} />



      </Routes>
      {!hideFooter(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
