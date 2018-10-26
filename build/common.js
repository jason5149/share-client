const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')

const build = () => {
  const project = require('../project.config')
  const mode = process.env.NODE_ENV

  const { entry, resolve } = project

  const output = {
    path: path.resolve('dist'),
  }

  const module = {
    rules: [
      { test: /\.(js|jsx)$/, use: ['babel-loader', 'eslint-loader'] },
      { test: /\.(png|jpe?g|gif|svg)$/, use: { loader: 'file-loader', options: { name: '[name].[ext]?[hash]', outputPath: '../img/' } } },
      { 
        test: /\.(le|c)ss$/, 
        use:  [
          MiniCssExtractPlugin.loader, 
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: { config: { path: 'postcss.config.js' } } },
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
      },
    ],
  }

  const optimization = {
    runtimeChunk: 'single',
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
      cacheGroups: {
        vendors: {
          name:   'vendors',
          test:   /(react|react-dom|react-router-dom)/,
          chunks: 'all',
        },
        states: {
          name:   'states',
          test:   /(mobx|mobx-react)/,
          chunks: 'all',
        },
        babels: {
          name:   'babels',
          test:   /(babel-polyfill|babel-core\/register|es6-promise|core-js)/,
          chunks: 'all',
        },
      },
    },
  }

  const performance = {
    hints: 'warning',
  }

  const plugins = [
    new HappyPack({
      id:         'happy-babel-js',
      loaders:    ['babel-loader?cacheDirectory=true'],
      threadPool: HappyPack.ThreadPool({ 
        size: os.cpus().length, 
      }),
    }),
    new CleanWebpackPlugin(
      [
        path.resolve('dist'),
      ],
      {
        root:          __dirname,
        verbose:       true,
        dry:           false,
        allowExternal: true,
      },
    ),
    new ProgressBarWebpackPlugin(),
  ]

  return {
    mode,
    entry,
    output,
    module,
    resolve,
    optimization,
    performance,
    plugins,
  }
}

module.exports = build