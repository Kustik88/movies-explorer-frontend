import { Link } from 'react-router-dom'
import { useState } from "react"
import './AuthForm.css'
import '../App/App.css'

function AuthForm({ formName, isRegisterPathName, onSubmit }) {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  function handleSubmit(evt) {
    evt.preventDefault()
    isRegisterPathName
      ? onSubmit(formValues.name, formValues.email, formValues.password)
      : onSubmit(formValues.email, formValues.password)
  }

  function handleChange(evt) {
    const input = evt.target
    setFormValues({
      ...formValues,
      [input.name]: input.value
    })
  }

  const userNameFormId = `user-name-${formName}`
  const emailFormId = `email-${formName}`
  const passwordFormId = `password-${formName}`
  const form = isRegisterPathName
    ? {
      buttonText: 'Зарегистрироваться',
      pathName: '/sign-in',
      questionText: 'Уже зарегистрированы',
      linkText: 'Войти'
    }
    : {
      buttonText: 'Войти',
      pathName: '/sign-up',
      questionText: 'Еще не зарегистрированы',
      linkText: 'Регистрация'
    }

  return (
    <form className="auth-form" onSubmit={handleSubmit} >
      <div className='auth-form__input-container'>
        {isRegisterPathName &&
          <>
            <label htmlFor={`user-name-${formName}`} className="auth-form__label">Имя</label>
            <input
              type="text"
              value={formValues.name}
              id={userNameFormId}
              name="name"
              onChange={handleChange}
              className="auth-form__input"
              placeholder="Введите имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span
              className="auth-form__input-error"
              id={`${userNameFormId}-input-error`}
            >
              Что-то пошло не так...
            </span>
          </>}
        <label htmlFor={`email-${formName}`} className="auth-form__label">E-mail</label>
        <input
          type="email"
          value={formValues.email}
          id={emailFormId}
          onChange={handleChange}
          name="email"
          className="auth-form__input"
          placeholder="Введите почту"
          required
        />
        <span
          className="auth-form__input-error"
          id={`${emailFormId}-input-error`}
        >
          Что-то пошло не так...
        </span>
        <label htmlFor={`password-${formName}`} className="auth-form__label">Пароль</label>
        <input
          type="password"
          value={formValues.password}
          id={passwordFormId}
          name="password"
          onChange={handleChange}
          className="auth-form__input"
          placeholder="Введите пароль"
          minLength="7"
          maxLength="40"
          required
        />
        <span
          className="auth-form__input-error auth-form__input-error_visible"
          id={`${passwordFormId}-input-error`}
        >
          Что-то пошло не так...
        </span>
      </div>
      <button className="btn auth-form__sbt-button"
        type="submit"
        aria-label="Отправить данные">
        {form.buttonText}
      </button>
      <div className="auth-form__text">
        <p
          className="auth-form__question">
          {form.questionText}?
        </p>
        <Link
          to={form.pathName}
          className="link auth-form__link" >
          {form.linkText}
        </Link>
      </div>
    </form >
  )
}

export default AuthForm
