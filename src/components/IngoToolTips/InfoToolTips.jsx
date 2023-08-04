import React from "react"
import '../App/App.css'
import './InfoToolTips.css'
import unionSuccess from '../../images/logo.svg'
import unionFailed from '../../images/union-failed.svg'

function InfoToolTips({ isOpen, isSuccessSubmit, onClose }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ""}`} onClick={onClose}>
      <div className='popup__container' >
        <button className="btn popup__close-btn" aria-label="Закрыть" type="button" onClick={onClose} />
        <img className="popup__union-img"
          src={isSuccessSubmit ? unionSuccess : unionFailed}
          alt='соединение' />
        <h2 className="popup__heading">
          {isSuccessSubmit
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так. Попробуйте еще раз!'}
        </h2>
      </div>
    </section>
  )
}

export default InfoToolTips
