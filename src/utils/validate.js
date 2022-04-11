/**
 * 格式校验
 */

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL (url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @description 密码长度要求8~20位
 * @returns {Boolean}
 */
export function validPassword (password) {
  const reg = /^(?=.*\d)(?=.*[A-Za-z]).{8,20}$/
  return reg.test(password)
}

/**
 * @description 身份证验证
 * @returns {Boolean}
 */
export function validIdentityCode (str) {
  const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/
  return reg.test(str)
}

/**
 * @description 邮箱验证
 * @returns {Boolean}
 */
export function validateEmail (str) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  return reg.test(str)
}

/**
 * @description 手机号码
 * @returns {Boolean}
 */
export function validTel (str) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}

/**
 * @description 仅匹配中文
 * @returns {Boolean}
 */
export function matchChinese (str) {
  const reg = /^[\u4E00-\u9FA5]+$/
  return reg.test(str)
}

/**
 * @description 验证中文名字，包含·
 * @returns {Boolean}
 */
export function validLegalPerson (str) {
  const reg = /^[\u4E00-\u9FA5|·]+$/
  return reg.test(str)
}
