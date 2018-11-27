const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = () => {
  const output = {
    filename:      'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
  }
  
  const plugins = [
    new MiniCssExtractPlugin({
      filename:      'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new webpack.NamedChunksPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode:      'server',
    //   analyzerPort:      9999,
    //   reportFilename:    'report.html',
    //   defaultSizes:      'parsed',
    //   openAnalyzer:      true,
    //   generateStatsFile: false,
    //   statsFilename:     'stats.json',
    //   statsOptions:      null,
    //   logLevel:          'info',
    // }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
        },
      },
    }),
  ]
  
  return {
    output,
    plugins,
  }
}