const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {
  const output = {
    filename:      'js/[name].js',
    chunkFilename: 'js/[name].js',
  }
  
  const plugins = [
    new MiniCssExtractPlugin({
      filename:      'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
    new webpack.NamedChunksPlugin(),
  ]
  
  return {
    output,
    plugins,
  }
}