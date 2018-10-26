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
        basePath: `/`,
      }),
      new MiniCssExtractPlugin({
        filename:      'css/[name].css',
        chunkFilename: 'css/[name].css',
      }),
      new webpack.NamedModulesPlugin(),
    ],
  }
}
