import './SearchForm.css'
import searchIcon from '../../images/search-icon.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__form' noValidate>
        <div className='search-form__search-icon-container'>
          <img className='search-form__search-icon' src={searchIcon} alt='поиск' />
        </div>
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
        <button type="submit" aria-label='искать фильм' className="search-form__submit-btn" />
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm
