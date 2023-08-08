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
import InfoToolTips from '../IngoToolTips/InfoToolTips'
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute'
import * as AuthApi from '../../utils/AuthApi'
import * as MainApi from '../../utils/MainApi'
import * as MoviesApi from '../../utils/MoviesApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { moviesSavingList } from '../../constants/moviesSavingList'
import { getDataFromLocalStorage } from '../../helpers/getDataFromLocalStorage'
import { TEXT_SEARCH, MOVIES_SEARCH, FILTER_CHECKBOX_STATE } from '../../constants/localStorage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isInfoToolTipPopupOpen, setisInfoToolTipPopupOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ status: false, message: '' })
  const [currentUser, setCurrentUser] = useState({})
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425)
  const [isMiddleScreen, setIsMiddleScreen] = useState(window.innerWidth > 425 && window.innerWidth <= 820)
  const [isdropDownMenuOpen, setIsdropDownMenuOpen] = useState(false)
  const [maxRenderingCards, setMaxRenderingCards] = useState(0)
  const [moviesSearched, setMoviesSearched] = useState([])
  const [textSearch, setTextSearch] = useState('')
  const [isShortFilterActive, setIsShortFilterActive] = useState(false)
  const [isDisabledFilter, SetIsDisabledFilter] = useState(true)
  const [token, setToken] = useState('')
  const [isServerError, setIsServerError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


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
    const textSearched = localStorage.getItem(TEXT_SEARCH)
    const moviesListSearched = getDataFromLocalStorage(MOVIES_SEARCH)
    const filterCheckboxState = getDataFromLocalStorage(FILTER_CHECKBOX_STATE)
    if (textSearched && moviesListSearched) {
      SetIsDisabledFilter(false)
      renderSearchMovies(textSearched, moviesListSearched, filterCheckboxState)
    }
  }, [isShortFilterActive])

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
      setMaxRenderingCards(5)
    } else if (isMiddleScreen) {
      setMaxRenderingCards(8)
    } else {
      setMaxRenderingCards(12)
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
    localStorage.clear()
    Cookies.remove('jwt')
    setToken('')
    setIsLoggedIn(false)
    setCurrentUser({
      name: '',
      email: ''
    })
    setMoviesSearched([])
    setTextSearch('')
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
    MoviesApi.getMovies()
      .then(moviesList => {
        setIsServerError(false)
        const keyWordToLowerCase = keyWord.toLowerCase()
        const moviesListSearch = moviesList.filter(movie => {
          return movie.nameRU.toLowerCase().includes(keyWordToLowerCase) || movie.nameEN.toLowerCase().includes(keyWordToLowerCase)
        })
        localStorage.setItem(TEXT_SEARCH, keyWord)
        localStorage.setItem(MOVIES_SEARCH, JSON.stringify(moviesListSearch))
        localStorage.setItem(FILTER_CHECKBOX_STATE, JSON.stringify(isShortFilterActive))
        renderSearchMovies(keyWord, moviesListSearch, isShortFilterActive)
      })
      .catch(() => setIsServerError(true))
      .finally(() => setIsLoading(false))
  }

  function renderSearchMovies(text, moviesList, filterCheckboxState) {
    let moviesRendering
    filterCheckboxState
      ? moviesRendering = moviesList.filter(movie => movie.duration <= 40)
      : moviesRendering = moviesList
    setTextSearch(text)
    setMoviesSearched(moviesRendering)
  }

  function handleFilterShortMovies() {
    localStorage.setItem(FILTER_CHECKBOX_STATE, !isShortFilterActive)
    setIsShortFilterActive(!isShortFilterActive)


  }

  function handleAddCardsToPage() {
    if (isSmallScreen) {
      setMaxRenderingCards(maxRenderingCards + 2)
    } else if (isMiddleScreen) {
      setMaxRenderingCards(maxRenderingCards + 2)
    } else {
      setMaxRenderingCards(maxRenderingCards + 3)
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

  // if (isLoading) {
  //   return <Preloader />
  // }

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
              moviesList={moviesSearched}
              isShortFilterActive={isShortFilterActive}
              isDisabledFilter={isDisabledFilter}
              textSearch={textSearch}
              moviesSavingList={moviesSavingList}
              numberOfRenderingCards={maxRenderingCards}
              isSmallScreen={isSmallScreen}
              pathName={pathName}
              onSearch={searchMovies}
              onAdderMoviesClick={handleAddCardsToPage}
              onShortMoviesFilterClick={handleFilterShortMovies}
              isServerError={isServerError}
              isLoading={isLoading}
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
