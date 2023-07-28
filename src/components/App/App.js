import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import DropDownMenu from '../DropDownMenu/DropDownMenu'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'
import PageNotFound from '../PageNotFound/PageNotFound'
import Footer from '../Footer/Footer'
import { moviesList } from '../../constants/moviesList'
import { moviesSavingList } from '../../constants/moviesSavingList'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname
  // const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425)
  const [isMiddleScreen, setIsMiddleScreen] = useState(window.innerWidth > 425 && window.innerWidth <= 820)
  const [isdropDownMenuOpen, setIsdropDownMenuOpen] = useState(false)
  const [numberOfCards, setNumberOfCards] = useState(0)


  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 425);
      setIsMiddleScreen(window.innerWidth > 425 && window.innerWidth <= 820)
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setNumberOfCards(5)
    } else if (isMiddleScreen) {
      setNumberOfCards(8)
    } else {
      setNumberOfCards(12)
    }
  }, [isSmallScreen, isMiddleScreen])

  function handleDropDownMenuClick() {
    setIsdropDownMenuOpen(!isdropDownMenuOpen)
  }

  const showHeader = (pathName) => ['/', '/movies', '/saved-movies', '/profile'].includes(pathName)
  const showFooter = (pathName) => ['/', '/movies', '/saved-movies'].includes(pathName)
  const togleHeaderTheme = (pathName) => '/'.includes(pathName)
  const isRegisterPathName = (pathName) => '/sign-up'.includes(pathName)
  const isProfilePathName = (pathName) => '/profile'.includes(pathName)
  const isSavedMoviesPage = (pathName) => '/saved-movies'.includes(pathName)
  const returnPreviousPage = () => { navigate(-1) }

  return (
    <div className="App">
      <DropDownMenu
        isOpen={isdropDownMenuOpen}
        isMiddleScreen={isMiddleScreen || isSmallScreen}
        onClose={handleDropDownMenuClick}
        pathName={pathName}
      />
      {showHeader(pathName)
        && <Header
          isLoggedIn={!togleHeaderTheme(pathName)}
          isMiddleScreen={isMiddleScreen || isSmallScreen}
          onIconMenuClick={handleDropDownMenuClick}
          pathName={pathName} />}

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={
          <Movies
            moviesList={moviesList}
            moviesSavingList={moviesSavingList}
            numberOfCards={numberOfCards}
            isSmallScreen={isSmallScreen}
            pathName={pathName}
          />} />
        <Route path='/saved-movies' element={
          <SavedMovies
            moviesList={moviesSavingList}
            isSavedMoviesPage={isSavedMoviesPage}
            isSmallScreen={isSmallScreen}
            pathName={pathName}
          />} />
        <Route
          path='/sign-in' element={
            <Login
              greetingText='Рады видеть'
              formName='login'
              isRegisterPathName={isRegisterPathName(pathName)}
            />} />
        <Route
          path='/sign-up'
          element={
            <Register
              greetingText='Добро пожаловать'
              formName='register'
              isRegisterPathName={isRegisterPathName(pathName)}
            />} />
        <Route path='/profile' element={
          <Profile
            greetingText='Привет, Виталий'
            isProfilePathName={isProfilePathName}
          />}
        />
        <Route path='*' element={<PageNotFound returnPreviousPage={returnPreviousPage} />} />
      </Routes>
      {showFooter(pathName) && <Footer />}
    </div>
  )
}

export default App
