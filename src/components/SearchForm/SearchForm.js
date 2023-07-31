import './SearchForm.css'
import '../App/App.css'
import { useState } from "react"
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm({ isSmallScreen }) {
  const [formValues, setFormValues] = useState({
    nameRU: '',
  })

  function handleChange(e) {
    const input = e.target
    setFormValues({
      ...formValues,
      [input.name]: input.value
    })
  }

  return (
    <section className='search-form'>
      <form className='search-form__form'>
        {!isSmallScreen && <div className='search-form__search-icon' />}
        <input
          type="text"
          value={formValues.nameRu}
          className="search-form__input"
          name='movie'
          id='movie-input'
          placeholder="Фильм"
          onChange={handleChange}
          minLength="1"
          maxLength="40"
          required />
        {/* <span className="form__input-error" id={'email-input-' + formName + '-error'} /> */}
        <button type="submit" aria-label='искать фильм' className="btn search-form__submit-btn" />
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm
