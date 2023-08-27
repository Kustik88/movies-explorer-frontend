import validator from 'validator'
import { EMAIL_INCORRECT } from '../constants/errorInput'
export const validateEmail = (value) => validator.isEmail(value) || EMAIL_INCORRECT
