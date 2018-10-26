module.exports = {
  plugins: [
    require('postcss-preset-env')({
      browsers: ['last 2 versions'],
    }),
    require('postcss-px2rem')({
      remUnit: 75,
    }),
  ],
}
