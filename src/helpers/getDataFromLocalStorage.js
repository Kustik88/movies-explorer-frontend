export function getDataFromLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item))
}
