export function makeRequest(basePath, url, method, body, token) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  if (token) {
    options.headers.authorization = `Bearer ${token}`
  }

  return fetch(`${basePath}${url}`, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.text().then(err => {
        throw new Error(err)
      })
    })
}
