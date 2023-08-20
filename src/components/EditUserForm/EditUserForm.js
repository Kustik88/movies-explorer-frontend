import './EditUserForm.css'
import '../App/App.css'
import { useForm } from 'react-hook-form'
import { MIN_LENGTH_TWO, MAX_LENGTH_FORTY, FIELD_REQURED, EMAIL_REQUIRED } from '../../constants/errorInput'
import { REGEX_EMAIL } from '../../constants/regex'
import { useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import ErrorRequestForForm from '../ErrorRequestForForm/ErrorRequestForForm'

function EditUserForm({ onSubmit, logOutUser, errorText }) {
  const currentUser = useContext(CurrentUserContext)
  const { register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
    watch
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {

  })

  function handleSubmitData(data) {
    onSubmit(data.name, data.email)
  }

  function checkIsValid() {
    const newName = watch("name");
    const newEmail = watch("email");
    const isSameValues =
      newName !== currentUser.name || newEmail !== currentUser.email;
    return isValid && isSameValues;
  }

  return (
    <form className="edit-user-form" onSubmit={handleSubmit(handleSubmitData)} noValidate>
      <div className="edit-user-form__input-container">
        <label htmlFor="name-edit-user-form" className="edit-user-form__label">Имя</label>
        <input
          type="text"
          defaultValue={currentUser.name}
          id='name-edit-user-form'
          className="edit-user-form__input"
          placeholder="Введите имя"
          {...register('name', {
            required: FIELD_REQURED,
            minLength: {
              value: 2,
              message: MIN_LENGTH_TWO
            },
            maxLength: {
              value: 40,
              message: MAX_LENGTH_FORTY
            }
          })} />
        <span
          className={`edit-user-form__input-error${errors.name
            ? ' edit-user-form__input-error_visible'
            : ''}`}>
          {errors.name && errors.name.message}
        </span>
        <label htmlFor="email-edit-user-form" className="edit-user-form__label">E-mail</label>
        <input
          type="email"
          defaultValue={currentUser.email}
          id='email-edit-user-form'
          className="edit-user-form__input"
          placeholder="Введите почту"
          {...register('email', {
            required: FIELD_REQURED,
            pattern: {
              value: REGEX_EMAIL,
              message: EMAIL_REQUIRED
            }
          })} />
        <span
          className={`edit-user-form__input-error${errors.email
            ? ' edit-user-form__input-error_visible'
            : ''}`}>
          {errors.email && errors.email.message}
        </span>
      </div>
      <ErrorRequestForForm text={errorText} />
      <button
        type="submit"
        aria-label='редактировать профиль'
        className="btn edit-user-form__sbt-button"
        disabled={!checkIsValid()}>
        Редактировать
      </button>
      <Link to='/sign-in' className="link edit-user-form__logout-link" onClick={logOutUser}>
        Выйти из аккаунта
      </Link>
    </form>
  )
}

export default EditUserForm
