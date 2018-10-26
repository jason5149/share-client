const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const common = require('./build/common')
const dev = require('./build/development')
const prod = require('./build/production')

/* eslint-disable */
const build = params => {
  const env = params
  const project = require('./project.config')
  const devOptions = {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      contentBase:        path.resolve('dist'),
      port:               project.port,
      historyApiFallback: true,
      inline:             true,
      hot:                true,
      progress:           true,
      compress:           true,
      proxy:              {
        [project.target]: {
          target:       project.proxy,
          changeOrigin: true,
        },
      },
    },
    devtool: '#source-map',
  }
  let config

  //  开发环境 
  if (env === 'development') {
    config = webpackMerge(common(), dev(), devOptions)
  } 
  //  测试环境
  else if (env === 'test') {
    config = webpackMerge(common(), dev())
  } 
  //  生产环境
  else if (env === 'production') {
    config = webpackMerge(common(), prod())
  }

  return config
}

module.exports = build