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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [erorrSubmit, setErorrSubmit] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [currentUserMoviesList, setCurrentUserMoviesList] = useState([])
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425)
  const [isMiddleScreen, setIsMiddleScreen] = useState(window.innerWidth > 425 && window.innerWidth <= 820)
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

    Promise.all([AuthApi.getCurrentUserData(token), MainApi.getCurrentsUserMovies(token)])
      .then(([currentUserData, currentUserMovies]) => {
        setCurrentUser({
          name: currentUserData.name,
          email: currentUserData.email,
          _id: currentUserData._id,
        })
        setDataToLocalStorage(SAVED_MOVIES, currentUserMovies)
        setCurrentUserMoviesList(currentUserMovies)
        setIsLoggedIn(true)
        checkIsKnownPath(pathName)
          ? navigate(MOVIES_PATHNAME)
          : navigate(UKNOWN_PATHNAME)
      })
      .catch(err => displayError(err))
      .finally(() => setIsLoadingApp(false))
  }, [token])

  useEffect(() => {
    setErorrSubmit('')
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
  }, [location.pathname])

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 425)
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

  const checkIsKnownPath = (path) => [
    MAIN_PATHNAME,
    MOVIES_PATHNAME,
    SAVED_MOVIES_PATHNAME,
    PROFILE_PATHNAME,
    REGISTER_PATHNAME,
    LOGIN_PATHNAME].includes(path)
  const showHeader = (path) => [MOVIES_PATHNAME, MAIN_PATHNAME, SAVED_MOVIES_PATHNAME, PROFILE_PATHNAME].includes(path)
  const showFooter = (path) => [MOVIES_PATHNAME, MAIN_PATHNAME, SAVED_MOVIES_PATHNAME].includes(path)
  const isRegisterPathName = (path) => REGISTER_PATHNAME.includes(path)
  const isProfilePathName = (path) => PROFILE_PATHNAME.includes(path)
  const returnPreviousPage = () => { navigate(-1) }

  function displayError(err) {
    console.log(err)
  }

  function showErrorToUser(err) {
    if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
      setErorrSubmit('Произошла ошибка. Попробуйте снова')
      setIsServerError(true)
    } else {
      try {
        const error = JSON.parse(err.message);
        const message = error.message;
        setErorrSubmit(message);
      } catch (err) {
        console.log('Ошибка при распарсивании JSON:', err);
      }
    }
  }

  function registerUser(name, email, password) {
    AuthApi.register(name, email, password)
      .then(() => {
        loginUser(email, password)
      })
      .catch(err => {
        showErrorToUser(err)
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
      })
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
    MainApi.editCurrentUserData(name, email, token)
      .then(res => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        })
      })
      .catch(err => showErrorToUser(err))
  }

  function filterMoviesListKeyword(keyword, list) {
    const keywordToLowerCase = keyword.toLowerCase()
    return list.filter(movie => {
      return movie.nameRU.toLowerCase().includes(keywordToLowerCase) || movie.nameEN.toLowerCase().includes(keywordToLowerCase)
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
      throw showErrorToUser(err)
    }
  }


  async function searchMovies(keyword) {
    setIsLoadingResultRequest(true)
    setTextSearch(keyword)
    try {
      const moviesList = await getMoviesList()
      setIsServerError(false)
      const moviesListSearch = filterMoviesListKeyword(keyword, moviesList)
      localStorage.setItem(TEXT_SEARCH, keyword)
      setDataToLocalStorage(FILTER_CHECKBOX_STATE, isShortMoviesFilterActive)
      setDataToLocalStorage(MOVIES_SEARCH, moviesListSearch)
      setTextSearch(keyword)
      setMoviesSearched(filterMoviesListDuration(moviesListSearch, isShortMoviesFilterActive))
      setIsLoadingResultRequest(false)
    } catch (err) {
      setIsLoadingResultRequest(false)
      showErrorToUser(err)
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
      moviesRendering = moviesList.filter(movie => movie.duration <= 40)
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

  function handleMovieLike(movie) {
    const movieObject = currentUserMoviesList.find(movieSaved => movieSaved.movieId === movie.movieId);
    const isLiked = !!movieObject;
    const movieObjectId = isLiked ? movieObject._id : null;

    if (isLiked) {
      MainApi.dislikeMovie(movieObjectId, token)
        .then((deletingMovie) => {
          const newList = currentUserMoviesList.filter(movie => movie.movieId !== deletingMovie.movieId)
          updateCurrentUserList(newList)
        }
        )
        .catch(err => displayError(err))
    } else {
      MainApi.likeMovie(movie, token)
        .then(newMovie => {
          const newList = [...currentUserMoviesList, newMovie]
          updateCurrentUserList(newList)
        })
        .catch(err => displayError(err))
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
        {showHeader(pathName)
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
              errorText={erorrSubmit}

            />}
          />
          <Route
            path={LOGIN_PATHNAME} element={
              <Login
                greetingText='Рады видеть'
                formName='login'
                isRegisterPathName={isRegisterPathName(pathName)}
                onLogin={loginUser}
                errorText={erorrSubmit}
              />} />
          <Route
            path={REGISTER_PATHNAME}
            element={
              <Register
                greetingText='Добро пожаловать'
                formName='register'
                isRegisterPathName={isRegisterPathName(pathName)}
                onSignUp={registerUser}
                errorText={erorrSubmit}
              />} />
          <Route path={UKNOWN_PATHNAME} element={<PageNotFound returnPreviousPage={returnPreviousPage} />} />
        </Routes>
        {showFooter(pathName) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
