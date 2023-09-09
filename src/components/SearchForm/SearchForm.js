import './SearchForm.css'
import '../App/App.css'
import { useForm } from 'react-hook-form'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { MAX_LENGTH_FORTY, KEYWORD_REQUIRED } from '../../constants/errorInput'

function SearchForm({ isSmallScreen, textSearch, isShortFilterActive, onSubmit, onShortMoviesFilterClick }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onSubmit' });

  function handleSubmitData(data) {
    onSubmit(data.movie)
  }

  return (
    <section className='search-form' >
      <form className='search-form__form' onSubmit={handleSubmit(handleSubmitData)}>
        {!isSmallScreen && <div className='search-form__search-icon' />}
        <input
          type="text"
          className="search-form__input"
          defaultValue={textSearch || ''}
          id='movie-input'
          placeholder="Фильм"
          {...register("movie", {
            required: KEYWORD_REQUIRED,
            maxLength: {
              value: 40,
              message: MAX_LENGTH_FORTY
            },

          })} />
        <button type="submit" aria-label='искать фильмы' className="btn search-form__submit-btn" />
        <span
          className={`search-form__input-error${errors.movie
            ? ' search-form__input-error_visible'
            : ''}`}>
          {errors.movie && errors.movie.message}
        </span>
      </form>
      <FilterCheckbox
        onShortMoviesFilterClick={onShortMoviesFilterClick}
        isShortFilterActive={isShortFilterActive} />
    </section>
  )
}

export default SearchForm
