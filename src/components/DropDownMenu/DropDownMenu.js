import './DropDownMenu.css'
import '../App/App.css'
import Navigation from '../Navigation/Navigation'
import ProfileLink from '../ProfileLink/ProfileLink'
function DropDownMenu({ isOpen, onClose }) {
  return (
    <section className={`drop-down-menu${isOpen ? ' drop-down-menu_visible' : ''}`}>
      <div className='drop-down-menu__content'>
        <button type='button' aria-label='закрыть меню' className='btn drop-down-menu__close-btn' onClick={onClose} />
        <h2 className='drop-down-menu__title'>Главная</h2>
        <Navigation isDropDownMenu={isOpen} />
        <ProfileLink />
      </div>
    </section>
  )
}

export default DropDownMenu
