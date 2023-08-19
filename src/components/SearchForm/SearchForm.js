import './SearchForm.css'
import '../App/App.css'
import { useState } from "react"
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm({ isSmallScreen, textSearch, isShortFilterActive, onSubmit, onShortMoviesFilterClick }) {
  const [formValues, setFormValues] = useState({
    movie: textSearch
  })

  function handleChange(e) {
    const input = e.target
    setFormValues({
      ...formValues,
      [input.name]: input.value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onSubmit(formValues.movie)
  }

  return (
    <section className='search-form' >
      <form className='search-form__form' onSubmit={handleSubmit} noValidate>
        {!isSmallScreen && <div className='search-form__search-icon' />}
        <input
          type="text"
          value={formValues.movie}
          className="search-form__input"
          name='movie'
          id='movie-input'
          placeholder="Фильм"
          onChange={handleChange}
          minLength="1"
          maxLength="40"
          required />
        {/* <span className="form__input-error" id={'email-input-' + formName + '-error'} /> */}
        <button type="submit" aria-label='искать фильмы' className="btn search-form__submit-btn" />
      </form>
      <FilterCheckbox
        onShortMoviesFilterClick={onShortMoviesFilterClick}
        isShortFilterActive={isShortFilterActive} />
    </section>
  )
}

export default SearchForm
