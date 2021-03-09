import axios from 'axios'
import { Message, Spin } from 'view-design'
import { getCookie } from '@/utils/cookie'
import { LOGIN_URL } from '@/api/config'
import qs from 'qs'

axios.defaults.timeout = 50000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 404:
          Message.error('404')
          break
        // case 400:
        case 401:
        case 403:
        case 493:
        case 491:
          window.location.href = LOGIN_URL

          break
        default:
          var msg =
            (error.response.data && error.response.data.message) || 'Error'
          Message.error(msg)
          return Promise.reject(error)
      }
    } else {
      Message.error('Request error!')
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params, showLoading = false) {
  if (showLoading) Spin.show()
  let token = getCookie('token')
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        if (showLoading) Spin.hide()
        resolve(res.data)
      })
      .catch(err => {
        if (showLoading) Spin.hide()
        reject(err.data)
      })
  })
}

export function del(url, params, showLoading = false) {
  if (showLoading) Spin.show()
  let token = getCookie('token')
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params,
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        if (showLoading) Spin.hide()
        resolve(res.data)
      })
      .catch(err => {
        if (showLoading) Spin.hide()
        reject(err.data)
      })
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getWithBody(url, params, showLoading = false) {
  if (showLoading) Spin.show()
  let token = getCookie('token')
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        if (showLoading) Spin.hide()
        resolve(res.data)
      })
      .catch(err => {
        if (showLoading) Spin.hide()
        reject(err.data)
      })
  })
}

export function getWithoutAuth(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers: {}
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getWithAuth(url, params) {
  let token = getCookie('token')
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function postWithAuth(
  url,
  params,
  showLoading = true,
  showError = true,
  isJson = true
) {
  if (showLoading) Spin.show()
  let token = getCookie('token')
  return new Promise((resolve, reject) => {
    let p = isJson ? JSON.stringify(params) : qs.stringify(params)
    axios
      .post(url, p, {
        headers: {
          Authorization: token,
          'Content-Type': isJson
            ? 'application/json;charset=UTF-8'
            : 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        Spin.hide()
        resolve(res.data)
      })
      .catch(err => {
        Spin.hide()
        if (showError) {
          // var msg = (err.response.data && err.response.data.message) || 'error'
          // Message.error(msg)
        }
        reject(err.data)
      })
  })
}

export function post(
  url,
  params,
  showLoading = true,
  showError = true,
  dataType = 'json'
) {
  console.log(params)
  if (showLoading) Spin.show()
  let token = getCookie('token')
  let contentType = 'application/json;charset=UTF-8'
  let p = JSON.stringify(params)
  if (dataType === 'form') {
    contentType = 'multipart/form-data'
    p = new FormData()
    for (let i in params) {
      p.append(i, params[i])
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, p, {
        headers: {
          Authorization: token,
          'Content-Type': contentType
        }
      })
      .then(res => {
        Spin.hide()
        resolve(res.data)
      })
      .catch(err => {
        Spin.hide()
        if (showError) {
          var msg =
            (err.response && err.response.data && err.response.data.message) ||
            'error'
          Message.error(msg)
        }
        reject(err.data)
      })
  })
}


export function fetchbuffer(url) {
  let token = getCookie('token')
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest()
    xhr.timeout = 50000
    xhr.open('get', url)
    xhr.setRequestHeader('Authorization', token)
    xhr.responseType = 'arraybuffer'
    xhr.onload = function() {
      console.log('fetchBuffer')
      resolve(xhr.response)
    }
    xhr.send()
  })
}

export function fetchbolb(url) {
  let token = getCookie('token')
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest()
    xhr.timeout = 50000
    xhr.open('get', url)
    xhr.setRequestHeader('Authorization', token)
    xhr.responseType = 'blob'
    xhr.onload = function() {
      resolve(xhr.response)
    }
    xhr.send()
  })
}
