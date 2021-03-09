import { environment as conf } from '@/utils'

const appId = 'annotationPlatform'

export const realm = 'dawnlight-test'

export const client_secret = 'a267679c-a35b-45bb-be47-e74b9829ed5b'

export const client_id = 'annotation'

const dynamicConfig = localStorage.dynamicConfig || {}
// login url
export const LOGIN_URL = `${window.location.protocol}//${window.location.host}/userCommon/#/login?realm=${realm}&client_secret=${client_secret}&client_id=${client_id}`
export const CHANGEPWD_URl = `${window.location.protocol}//${window.location.host}/userCommon/#/changePwd?realm=${realm}&client_secret=${client_secret}&client_id=${client_id}`
export const LOGOUT_URL = `${window.location.protocol}//${window.location.host}/userCommon/#/login?realm=${realm}&client_secret=${client_secret}&client_id=${client_id}`

// export const LOGIN_URL = `${window.location.protocol}//${window.location.host}/userCommon/#/login?appId=${appId}`
// export const CHANGEPWD_URl = `${window.location.protocol}//${window.location.host}/userCommon/#/changePwd?appId=${appId}`
// export const LOGOUT_URL = `${window.location.protocol}//${window.location.host}/userCommon/#/login?appId=${appId}`

// base url
export const API_BASE_URL = conf({
  // dev: 'http://192.168.10.95:8080', // zuo
  dev: 'http://192.168.99.120:8080', // liao
  dev: 'http://cdss.svc.aws.wenjingtech.com:8071', // liao
  sit: 'http://cdss.svc.aws.wenjingtech.com:8071',
  // sit: 'http://wwww.wenjing-test.com',
  prod: dynamicConfig.VUE_APP_ANNO_API || '/'
})

// user system
// export const USER_BASE_URL = conf({
//   dev: `http://106.14.253.3:9090/api/v1/${appId}`,
//   sit: `http://106.14.253.3:9090/api/v1/${appId}`,
//   prod: dynamicConfig.VUE_APP_USER_API || '/'
// })

export const USER_BASE_URL = conf({
  dev: 'http://106.14.253.3:9911/auth',
  sit: 'http://106.14.253.3:9911/auth',
  prod: dynamicConfig.VUE_APP_USER_API || '/'
})

// iot system
export const IOT_BASE_URL = conf({
  dev: 'http://106.14.253.3:8080/api',
  sit: 'http://106.14.253.3:8080/api',
  prod: dynamicConfig.VUE_APP_IOT_API || '/'
})

// smpl system
export const SMPL_BASE_URL = conf({
  // dev: 'http://192.168.10.86:8080',
  dev: 'http://139.196.15.28:8084',
  sit: 'http://139.196.15.28:8084',
  prod: '/'
})
