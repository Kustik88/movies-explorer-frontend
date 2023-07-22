import './EditUserForm.css'
import '../App/App.css'
import { Link } from 'react-router-dom'

function EditUserForm() {
  return (
    <form className="edit-user-form">
      <div className="edit-user-form__input-container">
        <label htmlFor="name-edit-user-form" className="edit-user-form__label">Имя</label>
        <input
          type="text"
          value='Виталий'
          id='name-edit-user-form'
          name="name"
          className="edit-user-form__input"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          required />
        <label htmlFor="email-edit-user-form" className="edit-user-form__label">E-mail</label>
        <input
          type="email"
          value='pochta@yandex.ru'
          id='email-edit-user-form'
          name="email"
          className="edit-user-form__input"
          placeholder="Введите почту"
          required />
      </div>
      <button type="submit" aria-label='редактировать профиль' className="btn edit-user-form__sbt-button">
        Редактировать
      </button>
      <Link to='/sign-in' className="link edit-user-form__logout-link">
        Выйти из аккаунта
      </Link>
    </form>
  )
}

export default EditUserForm
