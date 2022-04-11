/**
 * 基础公共方法
 */
import Cookies from 'js-cookie'
const TokenKey = 'token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

/**
 * 存储localStorage
 */
export function setStorage (key, value) {
  if (!key) return
  if (value) {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 */
export function getStorage (key) {
  if (!key) return
  return JSON.parse(window.localStorage.getItem(key))
}

/**
 * 删除localStorage
 */
export function removeStorage (key) {
  if (!key) return
  window.localStorage.removeItem(key)
}

/**
 * 存储sessionStorage
 */
export function setSessionStorage (key, value) {
  if (!key) return
  if (value) {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

/**
 * 获取sessionStorage
 */
export function getSessionStorage (key) {
  if (!key) return
  return JSON.parse(window.sessionStorage.getItem(key))
}

/**
 * 删除sessionStorage
 */
export function removeSessionStorage (key) {
  if (!key) return
  window.sessionStorage.removeItem(key)
}

export function setCookie (key, value) {
  if (!key) return
  return Cookies.set(key, value)
}

export function getCookie (key) {
  if (!key) return
  return Cookies.get(key)
}

export function removeCookie (key) {
  return Cookies.remove(key)
}

/**
 * 解析url地址参数
 */
export const getUrlParams = (url, name) => {
  if (!url || !name) {
    return
  }
  const reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)', 'i')
  const r = url.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return null
}

/**
 * 平滑滚动到顶部
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
