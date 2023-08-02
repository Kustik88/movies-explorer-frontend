import { BASE_URL_MOVIES_API } from "../constants/baseUrl"
import { makeRequest } from "./makeRequest"


export function getMovies(token) {
  return makeRequest(
    BASE_URL_MOVIES_API,
    '/beatfilm-movies',
    'GET',
    null,
    token
  )
}
