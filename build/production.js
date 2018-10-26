const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {
  return {
    mode:    process.env.NODE_ENV,
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.resolve('dist', 'index.html'),
        template: path.resolve('public', 'template', 'index.ejs'),
        env:      process.env.NODE_ENV,
        basePath: `/client/`,
      }),
      new MiniCssExtractPlugin({
        filename:      'css/style.[contenthash].css',
        chunkFilename: 'css/style.[contenthash].css',
      }),
      new webpack.NamedModulesPlugin(),
    ],
  }
}
