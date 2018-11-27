const os = require('os')
const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')

const pkgConfig = require('../package')
const projectConfig = require('../project.config')

const cleanWebpackOptions = {
  root:          __dirname,
  verbose:       true,
  dry:           false,
  allowExternal: true,
}

const build = env => {
  const { title, version } = pkgConfig
  const { basePath, entry, resolve } = projectConfig
  const mode = process.env.NODE_ENV
  
  const output = {
    path: path.resolve('dist'),
  }

  const module = {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        use:  ['babel-loader', 'eslint-loader'], 
      },
      { 
        test: /\.(sa|sc|c)ss$/, 
        use:  [
          MiniCssExtractPlugin.loader, 
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: { config: { path: 'postcss.config.js' } } },
          { loader: 'sass-loader' },
        ],
      },
      // {
      //   test: /\.(le|c)ss$/,
      //     use:  [
      //     MiniCssExtractPlugin.loader, 
      //     { loader: 'css-loader' },
      //     { loader: 'postcss-loader', options: { config: { path: 'postcss.config.js' } } },
      //     { loader: 'less-loader', options: { javascriptEnabled: true } },
      //     // { loader: 'sass-loader' },
      //   ],
      // },
      { 
        test: /\.(png|jpe?g|gif|svg)$/, 
        use:  { 
          loader:  'url-loader',
          options: {
            limit: 8192,
          },
        }, 
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
          ecma:     6,
          mangle:   true,
          comments: false,
          compress: {
            warnings: false,
          },
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
          name:     'vendors',
          test:     modules => /react|react-dom|react-router-dom|mobx|mobx-react|history|scheduler|process|value-equal|object-assign|prop-types|resolve-pathname|buildin/.test(modules.context),
          chunks:   'initial',
          priority: 10,
        },
        babels: {
          name:     'babels',
          test:     modules => /@babel\/polyfill|es6-promise|core-js/.test(modules.context),
          chunks:   'initial',
          priority: 2,
        },
      },
    },
  }

  const performance = {
    hints: false,
  }

  const plugins = [
    new webpack.DefinePlugin({
      APP_ENV:     env !== 'production' ? JSON.stringify('dev') : JSON.stringify('prod'),
      APP_VERSION: JSON.stringify(version),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve('dist', 'index.html'),
      template: path.resolve('public', 'index.ejs'),
      title,
      basePath,
    }),
    new HappyPack({
      id:         'happy-babel-js',
      loaders:    ['babel-loader?cacheDirectory=true'],
      threadPool: HappyPack.ThreadPool({ 
        size: os.cpus().length, 
      }),
    }),
    new ProgressBarWebpackPlugin(),
    new CleanWebpackPlugin(
      [path.resolve('dist')], 
      cleanWebpackOptions
    ),
    new WebpackBar(),
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