const path = require('path')

module.exports = {
  entry: {
    vendors: ['react', 'react-dom', 'react-router-dom'],
    states:  ['mobx-react', 'mobx'],
    babels:  `./src/polyfill.js`,
    bundle:  `./src/index.js`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias:      {
      '@@public':    path.resolve('public'),
      '@components': path.resolve('src', 'components'),
      '@models':     path.resolve('src', 'models'),
      '@services':   path.resolve('src', 'services'),
      '@utils':      path.resolve('src', 'utils'),
      '@assets':     path.resolve('src', 'assets'),
      '@pages':      path.resolve('src', 'pages'),
    },
  },
  proxy:  'http://dev.tangjc.com',
  port:   9090,
  target: '/share-wx',
}