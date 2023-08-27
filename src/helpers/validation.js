import validator from 'validator'
import { EMAIL_INCORRECT, NAME_INCORRECT } from '../constants/errorInput'
import { REGEX_NAME } from '../constants/regex'

export const validateEmail = (value) => validator.isEmail(value) || EMAIL_INCORRECT

export const validateName = (value) => validator.matches(value, REGEX_NAME) || NAME_INCORRECT
