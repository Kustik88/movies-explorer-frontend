import './EditUserForm.css'
import '../App/App.css'
import { useState } from "react"
import { Link } from 'react-router-dom'

function EditUserForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  })

  function handleChange(e) {
    const input = e.target
    setFormValues({
      ...formValues,
      [input.name]: input.value
    })
  }

  return (
    <form className="edit-user-form">
      <div className="edit-user-form__input-container">
        <label htmlFor="name-edit-user-form" className="edit-user-form__label">Имя</label>
        <input
          type="text"
          value={formValues.name}
          id='name-edit-user-form'
          name="name"
          onChange={handleChange}
          className="edit-user-form__input"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          required />
        <label htmlFor="email-edit-user-form" className="edit-user-form__label">E-mail</label>
        <input
          type="email"
          value={formValues.email}
          id='email-edit-user-form'
          name="email"
          onChange={handleChange}
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
