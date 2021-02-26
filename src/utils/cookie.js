/**
 * 根据键值获取cookie
 * @param name
 * @returns {string}
 */
export function getCookie(name = '') {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return null
}

/**
 * 设置cookie
 * @param name
 * @param value
 * @param expireHours
 */
export function setCookie(name, value, expireHours) {
  let exDate = new Date()
  exDate.setTime(exDate.getTime() + expireHours * 60 * 60 * 1000)
  document.cookie =
    name +
    '=' +
    escape(value) +
    (typeof expireHours === 'undefined'
      ? ''
      : ';expires=' + exDate.toGMTString())
}

export function setCookieGlobal(name, value, expireHours) {
  let exDate = new Date()
  exDate.setTime(exDate.getTime() + expireHours * 60 * 60 * 1000)
  document.cookie =
    name +
    '=' +
    escape(value) +
    (typeof expireHours === 'undefined'
      ? ''
      : ';expires=' + exDate.toGMTString()) +
    ';path=/'
}

/**
 * 删除cookie
 * @param name
 */
export function delCookie(name = '') {
  let exDate = new Date()
  exDate.setTime(exDate.getTime() - 1)
  let value = getCookie(name)
  if (value !== null) {
    document.cookie =
      name + '=' + escape(value) + ';expires=' + exDate.toGMTString()
  }
}

export function delCookieGlobal(name = '') {
  let exDate = new Date()
  exDate.setTime(exDate.getTime() - 1)
  let value = getCookie(name)
  if (value !== null) {
    document.cookie =
      name +
      '=' +
      escape(value) +
      ';expires=' +
      exDate.toGMTString() +
      ';path=/'
  }
}
