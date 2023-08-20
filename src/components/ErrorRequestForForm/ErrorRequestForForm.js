import './ErrorRequestForForm.css'

function ErrorRequestForForm({ text }) {
  return (
    <span className={`error-request-form${text
      ? ' error-request-form_visible'
      : ''
      }`}>
      {text}
    </span>
  )
}

export default ErrorRequestForForm
