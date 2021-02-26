/**
 * 配置不同环境接口前缀
 * 如果未配置dev为默认配置
 * @param {*} base
 * @example
 * {
 *   dev: 'dev环境配置信息',
 *   sit: 'sit环境配置信息',
 *   pre: '灰度环境配置信息',
 *   prod: '线上环境配置信息'
 * }
 */
export function environment(base = {}) {
  if (process.env.NODE_ENV === 'production') {
    // 生产环境下
    var env = process.env.VUE_APP_ENV || 'dev'
    // 如果开发没配置切到测试
    if (env === 'dev' && typeof base[env] === 'undefined') {
      env = 'sit'
    }
    // 如果灰度没配置切到线上
    if (env === 'pre' && typeof base[env] === 'undefined') {
      env = 'prod'
    }
    return typeof base[env] === 'undefined' ? base['dev'] : base[env]
  }
  // 开发环境
  return typeof base['dev'] === 'undefined' ? base['sit'] : base['dev']
}
