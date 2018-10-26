const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./build/common')
const devConfig = require('./build/development')
const prodConfig = require('./build/production')
const ProjectConfig = require('./project.config')

const build = env => {
  let config = {}

  if (env === 'development') {
    const devServerOptions = {
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],
      devServer: {
        contentBase:        path.resolve('dist'),
        historyApiFallback: true,
        inline:             true,
        hot:                true,
        port:               3000,
        progress:           true,
        compress:           true,
        proxy:              {
          '/api': {
            // target: 'http://192.168.1.83:8090',
            target:       ProjectConfig.PROXY,
            changeOrigin: true,
          },
        },
      },
      devtool: '#source-map',
    }

    config = merge(commonConfig(), devConfig(), devServerOptions)
  } else if (env === 'test') {
    config = merge(commonConfig(), devConfig())
  } else if (env === 'production') {
    config = merge(commonConfig(), prodConfig())
  }

  return config
}

module.exports = build
