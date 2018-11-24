const path = require('path')

module.exports = {
  basePath: process.env.NODE_ENV === 'production' ? '/' : '/',
  entry:    {
    vendors: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'mobx-react', 
      'mobx',
      '@babel/polyfill',
      'es6-promise',
      'core-js',
    ],
    bundle: './src/index.js',
  },
  resolve: {
    alias: {
      '@@public':    path.resolve('public'),
      '@components': path.resolve('src', 'components'),
      '@models':     path.resolve('src', 'models'),
      '@services':   path.resolve('src', 'services'),
      '@utils':      path.resolve('src', 'utils'),
      '@assets':     path.resolve('src', 'assets'),
      '@pages':      path.resolve('src', 'pages'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    url:    'http://dev.tangjc.com',
    target: '/share-wx',
    port:   10023,
  },
}