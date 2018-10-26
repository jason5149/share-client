const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const build = () => {
  const output = {
    filename:      'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
  }
  
  const plugins = [
    new HtmlWebpackPlugin({
      filename: path.resolve('dist', 'index.html'),
      template: path.resolve('public', 'template', 'index.ejs'),
      basePath: `/client/`,
    }),
    new MiniCssExtractPlugin({
      filename:      'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',
    }),
    new webpack.NamedChunksPlugin(),
  ]

  return {
    output,
    plugins,
  }
}

module.exports = build