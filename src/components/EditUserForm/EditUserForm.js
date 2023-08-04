import './EditUserForm.css'
import '../App/App.css'
import { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

function EditUserForm({ logOut }) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  }, [currentUser])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  return (
    <form className="edit-user-form">
      <div className="edit-user-form__input-container">
        <label htmlFor="name-edit-user-form" className="edit-user-form__label">Имя</label>
        <input
          type="text"
          value={name || ''}
          id='name-edit-user-form'
          name="name"
          onChange={handleNameChange}
          className="edit-user-form__input"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          required />
        <label htmlFor="email-edit-user-form" className="edit-user-form__label">E-mail</label>
        <input
          type="email"
          value={email || ''}
          id='email-edit-user-form'
          name="email"
          onChange={handleEmailChange}
          className="edit-user-form__input"
          placeholder="Введите почту"
          required />
      </div>
      <button type="submit" aria-label='редактировать профиль' className="btn edit-user-form__sbt-button">
        Редактировать
      </button>
      <Link to='/sign-in' className="link edit-user-form__logout-link" onClick={logOut}>
        Выйти из аккаунта
      </Link>
    </form>
  )
}

export default EditUserForm
