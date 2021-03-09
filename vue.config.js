const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  // outputDir: 'dist',
  outputDir: 'docker/ui/index',
  assetsDir: 'static',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_a', resolve('src/assets'))

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  css: { loaderOptions: { less: { javascriptEnabled: true } } },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 第三方插件配置
  pluginOptions: {
    pwa: {
      iconPaths: {
        favicon32: './favicon.ico',
        favicon16: './favicon.ico',
        appleTouchIcon: './favicon.ico',
        maskIcon: './favicon.ico',
        msTileImage: './favicon.ico'
      }
    }
  },
  devServer: {
    open: true, // 浏览器自动打开页面
    host: 'localhost', // 如果是真机测试，就使用这个IP
    https: false,
    hotOnly: false, // 热更新（webpack已实现了，这里false即可）
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'page'),
    compress: true,
    port: 7070,
    sockHost: 'http://localhost:8090/',
    proxy: {
      '/test': {
        target: 'http://s3.wenjingtech.com:8099',
        changeOrigin: true
      },
      '/userCommon': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/userCommon': ''
        }
      }
    }
  }
}
