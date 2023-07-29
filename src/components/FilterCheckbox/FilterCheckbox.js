import './FilterCheckbox.css'

function FilterCheckbox() {
  return (
    <form className='filter-checkbox'>
      <input
        type='radio'
        name='short-movie'
        id='short-movie-radio'
        className='filter-checkbox__radio'
      />
      <label className='filter-checkbox__new-radio' htmlFor='short-movie-radio'></label>
      <h3 className='filter-checkbox__heading'>Короткометражки</h3>
    </form>
  )
}

export default FilterCheckbox
