const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const { VueLoaderPlugin } = require('vue-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const PROJECT_CONFIG = require('../project.config')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const cleanOptions = { root: __dirname, verbose: true, dry: false, allowExternal: true }

module.exports = () => {
  const env = process.env.NODE_ENV
  const entry = {
    vendors: PROJECT_CONFIG.ENTRY_CONFIG.VENDORS,
    states:  PROJECT_CONFIG.ENTRY_CONFIG.STATES,
    babels:  PROJECT_CONFIG.ENTRY_CONFIG.BABELS,
    bundle:  `./src/index.js`,
  }

  const alias = {
    'vue$':       'vue/dist/vue.common.js',
    '@@public':   path.resolve('public'),
    '@asset':     path.resolve('src', 'asset'),
    '@component': path.resolve('src', 'component'),
    '@store':     path.resolve('src', 'store'),
    '@page':      path.resolve('src', 'page'),
    '@service':   path.resolve('src', 'service'),
    '@util':      path.resolve('src', 'util'),
  }

  return {
    mode: env,

    entry,

    output: {
      path:          path.resolve('dist'),
      filename:      env !== 'production' ? 'js/[name].js' : 'js/[name].[chunkhash].js',
      chunkFilename: env !== 'production' ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    },

    module: {
      rules: [
        // { test: /\.(js)$/, use: ['babel-loader', 'eslint-loader'] },
        { test: /\.js$/, use: ['babel-loader'] },
        { test: /\.vue$/, loader: 'vue-loader' },
        { test: /\.(le|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'postcss-loader', options: { config: { path: 'postcss.config.js' } } }, { loader: 'less-loader', options: { javascriptEnabled: true } } ] },
        { test: /\.(png|jpe?g|gif|svg)$/, use: { loader: 'file-loader', options: { name: '[name].[ext]?[hash]', outputPath: '/img/' } } },
      ],
    },

    resolve: {
      extensions: ['.js', '.vue', '.json', '.less'],
      alias,
    },

    optimization: {
      runtimeChunk: { name: 'manifest' },
      minimizer:    [
        new UglifyJsPlugin({
          cache:         true,
          parallel:      true,
          uglifyOptions: {
            compress: true,
            ecma:     6,
            mangle:   true,
          },
          sourceMap: true,
        }),
        new OptimizeCssAssetPlugin({
          cssProcessor: require('cssnano'),
        }),
      ],
      splitChunks: {
        chunks:             'async',
        minSize:            20000,
        minChunks:          2,
        maxAsyncRequests:   5,
        maxInitialRequests: 3,
        name:               false,
        cacheGroups:        {
          vendors: {
            name:   'vendors',
            test:   /(vue|vue-router)/,
            chunks: 'all',
          },
          states: {
            name:   'states',
            test:   /vuex/,
            chunks: 'all',
          },
          babels: {
            name:   'babels',
            test:   /(@babel\/polyfill|babel-register|core-js)/,
            chunks: 'all',
          },
        },
      },
    },

    performance: {
      hints: false,
    },

    plugins: [
      new HappyPack({
        id:         'happy-babel-js',
        loaders:    ['babel-loader?cacheDirectory=true'],
        threadPool: happyThreadPool,
      }),
      new CleanWebpackPlugin([path.resolve('dist')], cleanOptions),
      new ProgressBarWebpackPlugin(),
      new VueLoaderPlugin()
    ],
  }
}
