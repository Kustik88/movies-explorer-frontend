import './BadSearchMoviesResult.css'

function BadSearchMoviesResult({ isServerError }) {
  return (
    <section className='bad-search-movies-result'>
      <p className='bad-search-movies-result__text'>
        {isServerError
          ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          : 'К сожалению, по вашему запросу ничего не найдено.'}

      </p>
    </section>
  )
}

export default BadSearchMoviesResult
