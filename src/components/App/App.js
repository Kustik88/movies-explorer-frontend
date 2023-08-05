/* eslint-disable react-hooks/exhaustive-deps */
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
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute'
import * as AuthApi from '../../utils/AuthApi'
import * as MainApi from '../../utils/MainApi'
import * as MoviesApi from '../../utils/MoviesApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { moviesList } from '../../constants/moviesList'
import { moviesSavingList } from '../../constants/moviesSavingList'
import {
  SEARCH_MOVIES,
  SEARCH_TEXT,
  FILTER_CHECKBOX_STATE
} from '../../constants/localStorage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isInfoToolTipPopupOpen, setisInfoToolTipPopupOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ status: false, message: '' })
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
          name: res.name,
          email: res.email,
        })
        setIsLoggedIn(true)
        navigate('/movies')
      })
      .catch(err => displayError(err))
      .finally(() => setIsLoading(false))
  }, [token])

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

  function showErrorToUser(err) {
    const error = JSON.parse(err.message)
    setSubmitStatus({
      status: false,
      message: error.message
    })
  }

  function registerUser(name, email, password) {
    AuthApi.register(name, email, password)
      .then(() => {
        setSubmitStatus({
          status: true,
          message: 'Вы успешно зарегестрировались!'
        })
        navigate('/sign-in')
      })
      .catch(err => {
        showErrorToUser(err)
      })
      .finally(() => {
        setisInfoToolTipPopupOpen(true)
      })
  }

  function loginUser(email, password) {
    AuthApi.authorize(email, password)
      .then(res => {
        Cookies.set('jwt', res.token, { expires: 3 })
        setToken(res.token)
      })
      .catch(err => {
        showErrorToUser(err)
        setisInfoToolTipPopupOpen(true)
      })
  }

  function logOutUser() {
    Cookies.remove('jwt')
    setToken('')
    setIsLoggedIn(false)
    setCurrentUser({
      name: '',
      email: ''
    })
  }

  function handleEditUserData(name, email) {
    MainApi.editCurrentUserData(name, email, token)
      .then(res => {
        setSubmitStatus({
          status: true,
          message: 'Данные успешно измененены'
        })
        setCurrentUser({
          name: res.name,
          email: res.email,
        })
      })
      .catch(err => showErrorToUser(err))
      .finally(() => setisInfoToolTipPopupOpen(true))
  }

  function searchMovies(keyWord) {
    setIsLoading(true)
    localStorage.setItem(SEARCH_TEXT, keyWord)
    MoviesApi.getMovies()
      .then(moviesList => {
        const keyWordToLowerCase = keyWord.toLowerCase()
        const moviesListFilterKeyWord = moviesList.filter(movie => {
          return movie.nameRU.toLowerCase().includes(keyWordToLowerCase) || movie.nameEN.toLowerCase().includes(keyWordToLowerCase)
        })
        setMovies(moviesListFilterKeyWord)
      })
      .catch(err => showErrorToUser(err))
      .finally(() => setIsLoading(false))
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

          isSuccessSubmit={submitStatus.status}
          onClose={closeAllPopups}
          message={submitStatus.message}
          isOpen={isInfoToolTipPopupOpen}
        />
        {showHeader(pathName)
          && <Header
            isLoggedIn={isLoggedIn}
            isMiddleScreen={isMiddleScreen || isSmallScreen}
            onIconMenuClick={handleDropDownMenuClick}
            pathName={pathName} />}

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={
            <ProtectedRouteElement
              element={Movies}
              isLoggedIn={isLoggedIn}
              moviesList={movies}
              moviesSavingList={moviesSavingList}
              numberOfCards={numberOfCards}
              isSmallScreen={isSmallScreen}
              pathName={pathName}
              onSearch={searchMovies}
              onAdderMoviesClick={handleAddCardsToPage}
              onShortMoviesFilterClick={handleFilterShortMovies}
            />} />
          <Route path='/saved-movies' element={
            <ProtectedRouteElement
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              moviesList={moviesSavingList}
              isSavedMoviesPage={isSavedMoviesPage}
              isSmallScreen={isSmallScreen}
              pathName={pathName}
              onSearch={searchMovies}
              onShortMoviesFilterClick={handleFilterShortMovies}
            />} />
          <Route path='/profile' element={
            <ProtectedRouteElement
              element={Profile}
              isLoggedIn={isLoggedIn}
              greetingText={`Привет, ${currentUser.name}`}
              editUserData={handleEditUserData}
              isProfilePathName={isProfilePathName}
              logOutUser={logOutUser}
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
