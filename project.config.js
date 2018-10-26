module.exports = {
  ENTRY_CONFIG: {
    VENDORS: [
      'vue',
      'vue-router'
    ],
    STATES: [
      'vuex'
    ],
    BABELS: [
      '@babel/polyfill',
      'babel-register'
    ]
  },
  "PROXY": "http://dev.tangjc.com",
}
