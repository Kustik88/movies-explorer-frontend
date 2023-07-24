import './SearchForm.css'
import '../App/App.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__form' noValidate>
        <div className='search-form__search-icon' />
        <input
          type="text"
          className="search-form__input"
          name='movie'
          id='movie-input'
          placeholder="Фильм"
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
