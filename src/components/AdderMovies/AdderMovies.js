import './AdderMovies.css'
import '../App/App.css'

function AdderMovies({ onAdderMoviesClick }) {
  return (
    <section className='adder-movies'>
      <button
        aria-label="показать фильмы"
        type="button"
        className='btn adder-movies__btn'
        onClick={onAdderMoviesClick}
      >
        Еще
      </button>
    </section>
  )
}

export default AdderMovies
