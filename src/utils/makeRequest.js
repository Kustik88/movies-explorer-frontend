export function makeRequest(basePath, url, method, body, token) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  if (token) {
    options.headers.authorization = `Bearer ${token}`
  }

  return fetch(`${basePath}${url}`, options)
    .then(res => res.ok
      ? res.json()
      : Promise.reject(`Error ${res.status}`))
}
