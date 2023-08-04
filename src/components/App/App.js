import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Cookies from 'js-cookie'
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
import Preloader from '../Preloader/Preloader'
import InfoToolTips from '../IngoToolTips/InfoToolTips'
import * as AuthApi from '../../utils/AuthApi'
import * as MainApi from '../../utils/MainApi'
import * as MoviesApi from '../../utils/MoviesApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { moviesList } from '../../constants/moviesList'
import { moviesSavingList } from '../../constants/moviesSavingList'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isInfoToolTipPopupOpen, setisInfoToolTipPopupOpen] = useState(true)
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(true)
  const [currentUser, setCurrentUser] = useState({})
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425)
  const [isMiddleScreen, setIsMiddleScreen] = useState(window.innerWidth > 425 && window.innerWidth <= 820)
  const [isdropDownMenuOpen, setIsdropDownMenuOpen] = useState(false)
  const [numberOfCards, setNumberOfCards] = useState(0)
  const [movies, setMovies] = useState([])
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname

  useEffect(() => {
    const jwt = Cookies.get('jwt')
    jwt && setToken(jwt)
  }, [])

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }
    AuthApi.getCurrentUserData(token)
      .then(res => {
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
        })
        setIsLoggedIn(true)
        navigate('/movies')
      })
      .catch(err => displayError(err))
      .finally(() => setIsLoading(false))
  }, [token, navigate])

  useEffect(() => {
    MoviesApi.getMovies()
      .then(dataMovies => setMovies(dataMovies))
      .catch(err => displayError(err))
  }, [])

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 425);
      setIsMiddleScreen(window.innerWidth > 425 && window.innerWidth <= 820)
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  useEffect(() => {
    if (isSmallScreen) {
      setNumberOfCards(5)
    } else if (isMiddleScreen) {
      setNumberOfCards(8)
    } else {
      setNumberOfCards(12)
    }
  }, [isSmallScreen, isMiddleScreen])

  function displayError(err) {
    console.log(err)
  }

  function registerUser(name, email, password) {
    AuthApi.register(name, email, password)
      .then(() => {
        setIsSuccessSubmit(true)
        navigate('/sign-in')
      })
      .catch(err => {
        setIsSuccessSubmit(false)
        displayError(err)
      })
      .finally(() => {
        setisInfoToolTipPopupOpen(true)
      })
  }

  function loginUser(email, password) {
    AuthApi.authorize(email, password)
      .then(res => {
        Cookies.set('jwt', res.jwt, { expires: 3 })
        setToken(res.jwt)
      })
      .catch(err => {
        displayError(err)
      })
  }

  function handleFilterShortMovies() {
    const shortMovies = movies.filter(movie => movie.duration <= 40)
    setMovies(shortMovies)
  }

  function handleAddCardsToPage() {
    if (isSmallScreen) {
      setNumberOfCards(numberOfCards + 2)
    } else if (isMiddleScreen) {
      setNumberOfCards(numberOfCards + 2)
    } else {
      setNumberOfCards(numberOfCards + 3)
    }
  }

  function handleDropDownMenuClick() {
    setIsdropDownMenuOpen(!isdropDownMenuOpen)
  }

  function closeAllPopups() {
    setIsdropDownMenuOpen(false)
    setisInfoToolTipPopupOpen(false)
  }

  const showHeader = (path) => ['/', '/movies', '/saved-movies', '/profile'].includes(path)
  const showFooter = (path) => ['/', '/movies', '/saved-movies'].includes(path)
  const togleHeaderTheme = (path) => '/'.includes(path)
  const isRegisterPathName = (path) => '/sign-up'.includes(path)
  const isProfilePathName = (path) => '/profile'.includes(path)
  const isSavedMoviesPage = (path) => '/saved-movies'.includes(path)
  const returnPreviousPage = () => { navigate(-1) }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <DropDownMenu
          isOpen={isdropDownMenuOpen}
          isMiddleScreen={isMiddleScreen || isSmallScreen}
          onClose={closeAllPopups}
          pathName={pathName}
        />
        <InfoToolTips
          isOpen={isInfoToolTipPopupOpen}
          isSuccessSubmit={isSuccessSubmit}
          onClose={closeAllPopups}
        />
        {showHeader(pathName)
          && <Header
            isLoggedIn={!togleHeaderTheme(pathName)} /*здесь вообще залогинен или нет, но пока просто проверяем маршрут чтобы установить тему*/
            isMiddleScreen={isMiddleScreen || isSmallScreen}
            onIconMenuClick={handleDropDownMenuClick}
            pathName={pathName} />}

        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='/movies' element={
            <Movies
              moviesList={movies}
              moviesSavingList={moviesSavingList}
              numberOfCards={numberOfCards}
              isSmallScreen={isSmallScreen}
              pathName={pathName}
              onAdderMoviesClick={handleAddCardsToPage}
              onShortMoviesFilterClick={handleFilterShortMovies}
            />} />
          <Route path='/saved-movies' element={
            <SavedMovies
              moviesList={moviesSavingList}
              isSavedMoviesPage={isSavedMoviesPage}
              isSmallScreen={isSmallScreen}
              pathName={pathName}
              onShortMoviesFilterClick={handleFilterShortMovies}
            />} />
          <Route path='/profile' element={
            <Profile
              greetingText={`Привет, ${currentUser.name}`}
              isProfilePathName={isProfilePathName}
            />}
          />
          <Route
            path='/sign-in' element={
              <Login
                greetingText='Рады видеть'
                formName='login'
                isRegisterPathName={isRegisterPathName(pathName)}
                onLogin={loginUser}
              />} />
          <Route
            path='/sign-up'
            element={
              <Register
                greetingText='Добро пожаловать'
                formName='register'
                isRegisterPathName={isRegisterPathName(pathName)}
                onSignUp={registerUser}
              />} />
          <Route path='*' element={<PageNotFound returnPreviousPage={returnPreviousPage} />} />
        </Routes>
        {showFooter(pathName) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
