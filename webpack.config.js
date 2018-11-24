const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./build/dev')
const prodConfig = require('./build/prod')
const commonConfig = require('./build/common')
const projectConfig = require('./project.config')

module.exports = env => {
  const { devServer } = projectConfig
  
  if (env === 'development') {
    const devServerOption = {
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],
      devServer: {
        hot:                true,
        port:               devServer.port,
        inline:             true,
        progress:           true,
        compress:           true,
        contentBase:        path.resolve('dist'),
        historyApiFallback: true,
        proxy:              {
          [devServer.target]: {
            target:       devServer.url,
            secure:       false,
            changeOrigin: true,
          },
        },
      },
      devtool: '#sourcemap',
    }

    return merge(commonConfig(env), devConfig(), devServerOption)
  } else if (env === 'test') {
    return merge(commonConfig(env), devConfig())
  } else if (env === 'production') {
    return merge(commonConfig(env), prodConfig())
  }
}