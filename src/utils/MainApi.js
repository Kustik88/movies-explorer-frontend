import { BASE_URL_USER_API } from "../constants/baseUrl"
import { makeRequest } from "./makeRequest"

export function getCurrentsUserMovies(token) {
  return makeRequest(
    BASE_URL_USER_API,
    '/movies',
    'GET',
    null,
    token)
}

export function editCurrentUserData(name, email, token) {
  return makeRequest(
    BASE_URL_USER_API,
    '/users/me',
    'PATCH',
    {
      name,
      email
    },
    token
  )
}

export function likeMovie(body, token) {
  return makeRequest(
    BASE_URL_USER_API,
    '/movies/',
    'POST',
    body,
    token,
  )
}

export function dislikeMovie(moviesId, token) {
  return makeRequest(
    BASE_URL_USER_API,
    `/movies/${moviesId}`,
    'DELETE',
    null,
    token,
  )
}


