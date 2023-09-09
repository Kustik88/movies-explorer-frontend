export function getDataFromLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item))
}

export function setDataToLocalStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item))
}
