import { BASE_URL_USER_API } from "../constants/baseUrl"
import { makeRequest } from "./makeRequest"

export function register(name, email, password) {
  return makeRequest(
    BASE_URL_USER_API,
    '/signup',
    'POST',
    {
      name,
      email,
      password
    },
    '')
}

export function authorize(email, password) {
  return makeRequest(
    BASE_URL_USER_API,
    '/signin',
    'POST',
    {
      email,
      password,
    },
    '')
}
