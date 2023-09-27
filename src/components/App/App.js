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
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute'
import Preloader from '../Preloader/Preloader'
import * as AuthApi from '../../utils/AuthApi'
import * as MainApi from '../../utils/MainApi'
import * as MoviesApi from '../../utils/MoviesApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../helpers/localStorageRequest'
import { displayError } from '../../helpers/displayError'
import { containsKey } from '../../helpers/containsKey'
import {
  TEXT_SEARCH,
  MOVIES_SEARCH,
  FILTER_CHECKBOX_STATE,
  SAVED_MOVIES
} from '../../constants/localStorage'
import {
  REGISTER_PATHNAME,
  LOGIN_PATHNAME,
  MAIN_PATHNAME,
  PROFILE_PATHNAME,
  SAVED_MOVIES_PATHNAME,
  MOVIES_PATHNAME,
  UKNOWN_PATHNAME
} from '../../constants/pathName'
import { DATA_CHANGED_SECCESSFULLY, ERROR_TRY_AGAIN, ERROR_PARSE_JSON } from '../../constants/messageForUser'
import { SIZE_SCREEN_SMALL, SIZE_SCREEN_MID } from '../../constants/sizeScreen'
import { DURATION_MOVIE_SHORT } from '../../constants/durationMovie'
import {
  MOVIES_LARGE_SCREEN,
  MOVIES_MID_SCREEN,
  MOVIES_SMALL_SCREEN,
  MOVIES_ADDING_TO_LARGE_SCREEN,
  MOVIES_ADDING_TO_MID_SCREEN
} from '../../constants/numberOfMovies'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messageForUser, setMessageForUser] = useState('')
  const [isSubmitingDataForm, setIsSubmitingDataForm] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [currentUserMoviesList, setCurrentUserMoviesList] = useState([])
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= SIZE_SCREEN_SMALL)
  const [isMiddleScreen, setIsMiddleScreen] = useState(window.innerWidth > SIZE_SCREEN_SMALL && window.innerWidth <= SIZE_SCREEN_MID)
  const [isdropDownMenuOpen, setIsdropDownMenuOpen] = useState(false)
  const [maxRenderingCards, setMaxRenderingCards] = useState(0)
  const [moviesListFromServer, setMoviesListFromServer] = useState([])
  const [moviesSearched, setMoviesSearched] = useState([])
  const [textSearch, setTextSearch] = useState('')
  const [textSavedMoviesSearch, setTextSavedMoviesSearch] = useState('')
  const [isShortMoviesFilterActive, setIsShortMoviesFilterActive] = useState(false)
  const [isShortSavedMoviesFilterActive, setIsSavedShortMoviesFilterActive] = useState(false)
  const [token, setToken] = useState('')
  const [isServerError, setIsServerError] = useState(false)
  const [isLoadingApp, setIsLoadingApp] = useState(true)
  const [isLoadingResultRequest, setIsLoadingResultRequest] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname

  useEffect(() => {
    const jwt = Cookies.get('jwt')
    jwt && setToken(jwt)
  }, [])

  useEffect(() => {
    setIsLoadingApp(true)
    if (!token) {
      setIsLoadingApp(false)
      return
    }
    fetchData()
  }, [token])

  useEffect(() => {
    setMessageForUser('')
  }, [navigate])

  useEffect(() => {
    const textSearched = localStorage.getItem(TEXT_SEARCH)
    const moviesList = getDataFromLocalStorage(MOVIES_SEARCH)
    const filterCheckboxState = getDataFromLocalStorage(FILTER_CHECKBOX_STATE)
    if (textSearched && moviesList) {
      setTextSearch(textSearched)
      setIsShortMoviesFilterActive(filterCheckboxState)
      setMoviesSearched(filterMoviesListDuration(moviesList, filterCheckboxState))
    }
  }, [isShortMoviesFilterActive])

  useEffect(() => {
    const list = getDataFromLocalStorage(SAVED_MOVIES)
    updateMoviesList(textSavedMoviesSearch, list, isShortSavedMoviesFilterActive, setCurrentUserMoviesList)
  }, [isShortSavedMoviesFilterActive, textSavedMoviesSearch])

  useEffect(() => {
    setTextSavedMoviesSearch('')
    setIsSavedShortMoviesFilterActive(false)
  }, [pathName])

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= SIZE_SCREEN_SMALL)
      setIsMiddleScreen(window.innerWidth > SIZE_SCREEN_SMALL && window.innerWidth <= SIZE_SCREEN_MID)
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  useEffect(() => {
    if (isSmallScreen) {
      setMaxRenderingCards(MOVIES_SMALL_SCREEN)
    } else if (isMiddleScreen) {
      setMaxRenderingCards(MOVIES_MID_SCREEN)
    } else {
      setMaxRenderingCards(MOVIES_LARGE_SCREEN)
    }
  }, [isSmallScreen, isMiddleScreen, moviesSearched])

  const checkIsKnownPath = () => containsKey(pathName, [
    MAIN_PATHNAME,
    MOVIES_PATHNAME,
    SAVED_MOVIES_PATHNAME,
    PROFILE_PATHNAME,
    REGISTER_PATHNAME,
    LOGIN_PATHNAME
  ])
  const showHeader = () => containsKey(pathName, [MOVIES_PATHNAME, MAIN_PATHNAME, SAVED_MOVIES_PATHNAME, PROFILE_PATHNAME])
  const showFooter = () => containsKey(pathName, [MOVIES_PATHNAME, MAIN_PATHNAME, SAVED_MOVIES_PATHNAME])
  const isRegisterPathName = () => containsKey(pathName, REGISTER_PATHNAME)
  const isLoginPathName = () => containsKey(pathName, LOGIN_PATHNAME)
  const isProfilePathName = () => containsKey(pathName, PROFILE_PATHNAME)
  const returnPreviousPage = () => { navigate(-1) }

  const fetchData = async () => {
    try {
      const [currentUserData, currentUserMovies] = await Promise.all([
        AuthApi.getCurrentUserData(token),
        MainApi.getCurrentsUserMovies(token)
      ])
      setCurrentUser({
        name: currentUserData.name,
        email: currentUserData.email,
        _id: currentUserData._id,
      })
      setDataToLocalStorage(SAVED_MOVIES, currentUserMovies)
      setCurrentUserMoviesList(currentUserMovies)
      setIsLoggedIn(true)
      checkIsKnownPath()
        ? isLoginPathName() || isRegisterPathName()
          ? navigate(MOVIES_PATHNAME)
          : navigate(pathName)
        : navigate(UKNOWN_PATHNAME)
    } catch (err) {
      displayError(err)
    } finally {
      setIsLoadingApp(false)
    }
  }

  function showErrorToUser(err) {
    if (err instanceof TypeError && containsKey('Failed to fetch', err.message)) {
      setMessageForUser(ERROR_TRY_AGAIN)
      setIsServerError(true)
    } else {
      try {
        const error = JSON.parse(err.message);
        const message = error.message;
        setMessageForUser(message);
      } catch (err) {
        console.log(ERROR_PARSE_JSON, err);
      }
    }
  }

  function registerUser(name, email, password) {
    setIsSubmitingDataForm(true)
    AuthApi.register(name, email, password)
      .then(() => {
        loginUser(email, password)
      })
      .catch(err => {
        showErrorToUser(err)
      })
      .finally(() => setIsSubmitingDataForm(false))
  }

  function loginUser(email, password) {
    setIsSubmitingDataForm(true)
    AuthApi.authorize(email, password)
      .then(res => {
        Cookies.set('jwt', res.token, { expires: 3 })
        setToken(res.token)
      })
      .catch(err => {
        showErrorToUser(err)
      })
      .finally(() => setIsSubmitingDataForm(false))
  }

  function logOutUser() {
    localStorage.clear()
    Cookies.remove('jwt')
    setToken('')
    setIsLoggedIn(false)
    setCurrentUser({
      name: '',
      email: '',
      _id: '',
    })
    setMoviesListFromServer([])
    setMoviesSearched([])
    setTextSearch('')
  }

  function handleEditUserData(name, email) {
    setIsSubmitingDataForm(true)
    MainApi.editCurrentUserData(name, email, token)
      .then(res => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        })
        setMessageForUser(DATA_CHANGED_SECCESSFULLY)
      })
      .catch(err => showErrorToUser(err))
      .finally(() => setIsSubmitingDataForm(false))
  }

  function filterMoviesListKeyword(keyword, list) {
    const keywordToLowerCase = keyword.toLowerCase()
    return list.filter(movie => {
      return containsKey(keywordToLowerCase, movie.nameRU.toLowerCase())
        || containsKey(keywordToLowerCase, movie.nameEN.toLowerCase())
    })
  }

  function searchSavingMovies(keyword) {
    setTextSavedMoviesSearch(keyword)
  }

  async function getMoviesList() {
    if (moviesListFromServer.length !== 0) {
      return moviesListFromServer
    }
    try {
      const list = await MoviesApi.getMovies()
      setMoviesListFromServer(list)
      return list
    } catch (err) {
      showErrorToUser(err)
      throw err
    }
  }

  async function searchMovies(keyword) {
    setIsLoadingResultRequest(true)
    try {
      setTextSearch(keyword)
      const moviesList = await getMoviesList()
      const moviesListSearch = filterMoviesListKeyword(keyword, moviesList)
      localStorage.setItem(TEXT_SEARCH, keyword)
      setDataToLocalStorage(FILTER_CHECKBOX_STATE, isShortMoviesFilterActive)
      setDataToLocalStorage(MOVIES_SEARCH, moviesListSearch)
      setMoviesSearched(filterMoviesListDuration(moviesListSearch, isShortMoviesFilterActive))
    } catch (err) {
      displayError(err)
    } finally {
      setIsLoadingResultRequest(false)
    }
  }

  function updateMoviesList(textSearch, list, filterCheckboxState, changeMoviesListFunction) {
    let moviesList
    textSearch
      ? moviesList = filterMoviesListKeyword(textSearch, list)
      : moviesList = list
    changeMoviesListFunction(filterMoviesListDuration(moviesList, filterCheckboxState))
  }

  function filterMoviesListDuration(moviesList, filterCheckboxStateState) {
    let moviesRendering = moviesList
    if (filterCheckboxStateState) {
      moviesRendering = moviesList.filter(movie => movie.duration <= DURATION_MOVIE_SHORT)
    }
    return moviesRendering
  }

  function handleFilterShortMovies() {
    localStorage.setItem(FILTER_CHECKBOX_STATE, !isShortMoviesFilterActive)
    setIsShortMoviesFilterActive(!isShortMoviesFilterActive)
  }

  function handleFilterShortSavedMovies() {
    setIsSavedShortMoviesFilterActive(!isShortSavedMoviesFilterActive)
  }

  function handleAddCardsToPage() {
    if (isSmallScreen) {
      setMaxRenderingCards(maxRenderingCards + MOVIES_ADDING_TO_MID_SCREEN)
    } else if (isMiddleScreen) {
      setMaxRenderingCards(maxRenderingCards + MOVIES_ADDING_TO_MID_SCREEN)
    } else {
      setMaxRenderingCards(maxRenderingCards + MOVIES_ADDING_TO_LARGE_SCREEN)
    }
  }

  function handleDropDownMenuClick() {
    setIsdropDownMenuOpen(!isdropDownMenuOpen)
  }

  async function handleMovieLike(movie) {
    const movieObject = currentUserMoviesList.find(movieSaved => movieSaved.movieId === movie.movieId)
    const isLiked = !!movieObject
    const movieObjectId = isLiked ? movieObject._id : null

    if (isLiked) {
      try {
        const deletingMovie = await MainApi.dislikeMovie(movieObjectId, token)
        const newList = currentUserMoviesList.filter(movie => movie.movieId !== deletingMovie.movieId)
        updateCurrentUserList(newList)
      } catch (err) {
        displayError(err)
      }
    } else {
      try {
        const newMovie = await MainApi.likeMovie(movie, token)
        const newList = [...currentUserMoviesList, newMovie]
        updateCurrentUserList(newList)
      } catch (err) {
        displayError(err)
      }
    }
  }

  function updateCurrentUserList(list) {
    setDataToLocalStorage(SAVED_MOVIES, list)
    setCurrentUserMoviesList(list)
  }

  function closeAllPopups() {
    setIsdropDownMenuOpen(false)
  }

  if (isLoadingApp) {
    return <Preloader isAppLoading={isLoadingApp} />
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
        {showHeader()
          && <Header
            isLoggedIn={isLoggedIn}
            isMiddleScreen={isMiddleScreen || isSmallScreen}
            onIconMenuClick={handleDropDownMenuClick}
            pathName={pathName} />}

        <Routes>
          <Route path={MAIN_PATHNAME} element={<Main />} />
          <Route path={MOVIES_PATHNAME} element={
            <ProtectedRouteElement
              element={Movies}
              isLoggedIn={isLoggedIn}
              moviesList={moviesSearched}
              isShortFilterActive={isShortMoviesFilterActive}
              textSearch={textSearch}
              moviesSavingList={currentUserMoviesList}
              numberOfRenderingCards={maxRenderingCards}
              isSmallScreen={isSmallScreen}
              pathName={pathName}
              onSearch={searchMovies}
              onAdderMoviesClick={handleAddCardsToPage}
              onShortMoviesFilterClick={handleFilterShortMovies}
              onMovieLike={handleMovieLike}
              isServerError={isServerError}
              isLoading={isLoadingResultRequest}
            />} />
          <Route path={SAVED_MOVIES_PATHNAME} element={
            <ProtectedRouteElement
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              moviesList={currentUserMoviesList}
              isSmallScreen={isSmallScreen}
              pathName={pathName}
              onSearch={searchSavingMovies}
              isShortFilterActive={isShortSavedMoviesFilterActive}
              onShortMoviesFilterClick={handleFilterShortSavedMovies}
              onMovieLike={handleMovieLike}
              textSearch={textSavedMoviesSearch}
            />} />
          <Route path={PROFILE_PATHNAME} element={
            <ProtectedRouteElement
              element={Profile}
              isLoggedIn={isLoggedIn}
              greetingText={`Привет, ${currentUser.name}`}
              editUserData={handleEditUserData}
              isProfilePathName={isProfilePathName}
              logOutUser={logOutUser}
              message={messageForUser}
              isSubmiting={isSubmitingDataForm}
            />}
          />
          <Route
            path={LOGIN_PATHNAME} element={
              <Login
                greetingText='Рады видеть'
                formName='login'
                isRegisterPathName={isRegisterPathName()}
                onLogin={loginUser}
                errorText={messageForUser}
                isSubmiting={isSubmitingDataForm}
              />} />
          <Route
            path={REGISTER_PATHNAME}
            element={
              <Register
                greetingText='Добро пожаловать'
                formName='register'
                isRegisterPathName={isRegisterPathName()}
                onSignUp={registerUser}
                errorText={messageForUser}
                isSubmiting={isSubmitingDataForm}
              />} />
          <Route path={UKNOWN_PATHNAME} element={<PageNotFound returnPreviousPage={returnPreviousPage} />} />
        </Routes>
        {showFooter() && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
