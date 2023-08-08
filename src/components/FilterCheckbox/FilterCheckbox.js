import './FilterCheckbox.css'

function FilterCheckbox({ onShortMoviesFilterClick, isShortFilterActive, isDisabledFilter }) {

  return (
    <form className='filter-checkbox'>
      <input
        type='checkbox'
        name='short-movie'
        id='short-movie-checkbox'
        className='filter-checkbox__checkbox'
        onChange={onShortMoviesFilterClick}
        defaultChecked={isShortFilterActive}
        disabled={isDisabledFilter}
      />
      <label
        className='filter-checkbox__new-checkbox'
        htmlFor='short-movie-checkbox'
      />
      <h3 className='filter-checkbox__heading'>Короткометражки</h3>
    </form>
  )
}

export default FilterCheckbox
