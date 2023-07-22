import { Link } from 'react-router-dom'
import './UserDataForm.css'
import '../App/App.css'

function UserDataForm({ formName, isRegisterPathName }) {

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
    <form className="form-user-data">
      <div className='form-user-data__input-container'>
        {isRegisterPathName &&
          <>
            <label htmlFor="user-name" className="form-user-data__label">Имя</label>
            <input
              type="text"
              value='Виталий'
              id={userNameFormId}
              name="name"
              className="form-user-data__input"
              placeholder="Введите имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span
              className="form-user-data__input-error"
              id={`${userNameFormId}-input-error`}
            >
              Что-то пошло не так...
            </span>
          </>}
        <label htmlFor="email" className="form-user-data__label">E-mail</label>
        <input
          type="email"
          value='pochta@yandex.ru'
          id={emailFormId}
          name="email"
          className="form-user-data__input"
          placeholder="Введите почту"
          required
        />
        <span
          className="form-user-data__input-error"
          id={`${emailFormId}-input-error`}
        >
          Что-то пошло не так...
        </span>
        <label htmlFor="password" className="form-user-data__label">Пароль</label>
        <input
          type="password"
          value='какой-то пароль'
          id={passwordFormId}
          name="password"
          className="form-user-data__input"
          placeholder="Введите пароль"
          minLength="7"
          maxLength="40"
          required
        />
        <span
          className="form-user-data__input-error form-user-data__input-error_visible"
          id={`${passwordFormId}-input-error`}
        >
          Что-то пошло не так...
        </span>
      </div>
      <button className="btn form-user-data__sbt-button"
        type="submit"
        aria-label="Отправить данные">
        {form.buttonText}
      </button>
      <div className="form-user-data__text">
        <p
          className="form-user-data__question">
          {form.questionText}?
        </p>
        <Link
          to={form.pathName}
          className="link form-user-data__link" >
          {form.linkText}
        </Link>
      </div>
    </form >


  )
}

export default UserDataForm
