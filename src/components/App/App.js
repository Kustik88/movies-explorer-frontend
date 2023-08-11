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
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../helpers/localStorageRequest'
import { TEXT_SEARCH, MOVIES_SEARCH, FILTER_CHECKBOX_STATE, SAVED_MOVIES } from '../../constants/localStorage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isInfoToolTipPopupOpen, setisInfoToolTipPopupOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ status: false, message: '' })
  const [currentUser, setCurrentUser] = useState({})
  const [currentUserMoviesList, setCurrentUserMoviesList] = useState([])
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425)
  const [isMiddleScreen, setIsMiddleScreen] = useState(window.innerWidth > 425 && window.innerWidth <= 820)
  const [isdropDownMenuOpen, setIsdropDownMenuOpen] = useState(false)
  const [maxRenderingCards, setMaxRenderingCards] = useState(0)
  const [moviesSearched, setMoviesSearched] = useState([])
  const [textSearch, setTextSearch] = useState('')
  const [isShortMoviesFilterActive, setIsShortMoviesFilterActive] = useState(false)
  const [isShortSavedMoviesFilterActive, setIsSavedShortMoviesFilterActive] = useState(false)
  const [isDisabledFilter, setIsDisabledFilter] = useState(true)
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
      setIsDisabledFilter(false)
      setTextSearch(textSearched)
      setMoviesSearched(filterMoviesListDuration(moviesListSearched, filterCheckboxState))
    }
  }, [isShortMoviesFilterActive])

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
      email: '',
      _id: '',
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

  function filterMoviesListKeyword(keyword, list) {
    const keywordToLowerCase = keyword.toLowerCase()
    return list.filter(movie => {
      return movie.nameRU.toLowerCase().includes(keywordToLowerCase) || movie.nameEN.toLowerCase().includes(keywordToLowerCase)
    })
  }

  function searchMovies(keyword) {
    setIsLoading(true)
    MoviesApi.getMovies()
      .then(moviesList => {
        setIsServerError(false)
        const moviesListSearch = filterMoviesListDuration(filterMoviesListKeyword(keyword, moviesList), isShortMoviesFilterActive)
        localStorage.setItem(TEXT_SEARCH, keyword)
        setDataToLocalStorage(MOVIES_SEARCH, moviesListSearch)
        setDataToLocalStorage(FILTER_CHECKBOX_STATE, isShortMoviesFilterActive)
        setTextSearch(keyword)
        setMoviesSearched(moviesListSearch)
      })
      .catch(() => setIsServerError(true))
      .finally(() => setIsLoading(false))
  }

  function searchSavingMovies(keyword) {
    const userSavedMovies = getDataFromLocalStorage(SAVED_MOVIES)
    const moviesListSearch = filterMoviesListDuration(filterMoviesListKeyword(keyword, userSavedMovies), isShortSavedMoviesFilterActive)
    setCurrentUserMoviesList(moviesListSearch)
  }

  function filterMoviesListDuration(moviesList, filterCheckboxState) {
    let moviesRendering
    filterCheckboxState
      ? moviesRendering = moviesList.filter(movie => movie.duration <= 40)
      : moviesRendering = moviesList
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
          setDataToLocalStorage(SAVED_MOVIES, newList)
          setCurrentUserMoviesList(newList)
        }
        )
        .catch(err => displayError(err))
    } else {
      MainApi.likeMovie(movie, token)
        .then(newMovie => {
          const newList = [...currentUserMoviesList, newMovie]
          setDataToLocalStorage(SAVED_MOVIES, newList)
          setCurrentUserMoviesList(newList)
        })
        .catch(err => displayError(err))
    }
  }

  function closeAllPopups() {
    setIsdropDownMenuOpen(false)
    setisInfoToolTipPopupOpen(false)
  }

  const showHeader = (path) => ['/', '/movies', '/saved-movies', '/profile'].includes(path)
  const showFooter = (path) => ['/', '/movies', '/saved-movies'].includes(path)
  const isRegisterPathName = (path) => '/sign-up'.includes(path)
  const isProfilePathName = (path) => '/profile'.includes(path)
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
              isShortFilterActive={isShortMoviesFilterActive}
              isDisabledFilter={isDisabledFilter}
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
              isLoading={isLoading}
            />} />
          <Route path='/saved-movies' element={
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
