import './DropDownMenu.css'
import '../App/App.css'
import Navigation from '../Navigation/Navigation'
import ProfileLink from '../ProfileLink/ProfileLink'

function DropDownMenu({ isOpen, isMiddleScreen, onClose, pathName }) {
  return (
    <section className={`drop-down-menu${isOpen && isMiddleScreen ? ' drop-down-menu_opened' : ''}`} onClick={onClose}>
      <div className='drop-down-menu__content'>
        <button type='button' aria-label='закрыть меню' className='btn drop-down-menu__close-btn' onClick={onClose} />
        <Navigation isMiddleScreen={isMiddleScreen} pathName={pathName} />
        <ProfileLink />
      </div>
    </section>
  )
}

export default DropDownMenu
