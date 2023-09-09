import './ResultRequestForm.css'
import { DATA_CHANGED_SECCESSFULLY } from '../../constants/messageForUser'

function ResultRequestForm({ message }) {
  return (
    <span className={`result-request-form${message
      ? ' result-request-form_visible'
      : ''
      }
      ${message === DATA_CHANGED_SECCESSFULLY
        ? ' result-request-form_color_white'
        : ''}`}>
      {message}
    </span>
  )
}

export default ResultRequestForm
