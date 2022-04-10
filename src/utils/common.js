import Cookies from 'js-cookie'
const TokenKey = 'token'

function getToken () {
  return Cookies.get(TokenKey)
}

function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export default {
  getToken,
  setToken,
  removeToken
}
