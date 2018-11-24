module.exports = api => {
  api.cache(false)

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env', 
        { 
          modules: false,
        },
      ],
    ],
    plugins: [
      'lodash',
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'import',
        { libraryName: 'antd-mobile', style: true },
        'antd',
      ],
      [
        'import',
        { libraryName: 'pms-saas-component', camel2DashComponentName: false },
        'pms-saas-component',
      ],
      [
        'import',
        { libraryName: 'pms-saas-common', camel2DashComponentName: false },
        'pms-saas-common',
      ],
    ],
  }
}