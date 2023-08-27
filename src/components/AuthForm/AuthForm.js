import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { MIN_LENGTH_SEVEN, MIN_LENGTH_TWO, MAX_LENGTH_FORTY, FIELD_REQURED } from '../../constants/errorInput'
import './AuthForm.css'
import '../App/App.css'
import ResultRequestForm from '../ResultRequestForm/ResultRequestForm'
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '../../constants/pathName'
import { validateEmail, validateName } from '../../helpers/validation'

function AuthForm({ formName, isRegisterPathName, onSubmit, errorText, isSubmiting }) {
  const { register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm({ mode: 'onChange' })

  function handleSubmitData(data) {
    isRegisterPathName
      ? onSubmit(data.name, data.email, data.password)
      : onSubmit(data.email, data.password)
  }

  const userNameFormId = `user-name-${formName}`
  const emailFormId = `email-${formName}`
  const passwordFormId = `password-${formName}`
  const form = isRegisterPathName
    ? {
      buttonText: 'Зарегистрироваться',
      pathName: LOGIN_PATHNAME,
      questionText: 'Уже зарегистрированы',
      linkText: 'Войти',
      registerFunctionUseForm: {
        ...register('password', {
          required: FIELD_REQURED,
          minLength: {
            value: 7,
            message: MIN_LENGTH_SEVEN
          },
          maxLength: {
            value: 40,
            message: MAX_LENGTH_FORTY
          },
        })
      }
    }
    : {
      buttonText: 'Войти',
      pathName: REGISTER_PATHNAME,
      questionText: 'Еще не зарегистрированы',
      linkText: 'Регистрация',
      registerFunctionUseForm: {
        ...register('password', {
          required: FIELD_REQURED,
        })
      }
    }

  return (
    <form className="auth-form" onSubmit={handleSubmit(handleSubmitData)} noValidate>
      <div className='auth-form__input-container'>
        {isRegisterPathName &&
          <>
            <label htmlFor={`user-name-${formName}`} className="auth-form__label">Имя</label>
            <input
              type='text'
              className="auth-form__input"
              placeholder="Введите имя"
              id={userNameFormId}
              {...register('name', {
                required: FIELD_REQURED,
                minLength: {
                  value: 2,
                  message: MIN_LENGTH_TWO
                },
                maxLength: {
                  value: 40,
                  message: MAX_LENGTH_FORTY
                },
                validate: (value) => validateName(value)
              })}
            />
            <span
              className={`auth-form__input-error${errors.name
                ? ' auth-form__input-error_visible'
                : ''}`}>
              {errors.name && errors.name.message}
            </span>
          </>}
        <label htmlFor={`email-${formName}`} className="auth-form__label">E-mail</label>
        <input
          type="email"
          className="auth-form__input"
          placeholder="Введите почту"
          id={emailFormId}
          {...register('email', {
            required: FIELD_REQURED,
            validate: (value) => validateEmail(value)
          })}
        />
        <span
          className={`auth-form__input-error${errors.email
            ? ' auth-form__input-error_visible'
            : ''}`}>
          {errors.email && errors.email.message}
        </span>
        <label htmlFor={`password-${formName}`} className="auth-form__label">Пароль</label>
        <input
          type="password"
          className="auth-form__input"
          id={passwordFormId}
          {...form.registerFunctionUseForm}
        />
        <span
          className={`auth-form__input-error${errors.password
            ? ' auth-form__input-error_visible'
            : ''}`}>
          {errors.password && errors.password.message}
        </span>
      </div>
      <ResultRequestForm message={errorText} />
      <button
        className="btn auth-form__sbt-button"
        type="submit"
        aria-label="Отправить данные"
        disabled={!isValid || isSubmiting}>
        {form.buttonText}
      </button>
      <div className="auth-form__text">
        <p className="auth-form__question">
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
