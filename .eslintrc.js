module.exports = {
  extends: ['airbnb-base', 'appx'],
  // extends: ['eslint-config-alloy/typescript-react'],
  env: { browser: true, commonjs: true, es6: true, node: true, worker: true },
  // 这里填入你的项目需要的全局变量
  globals: {
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    Component: true,
    wx: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  // 这里填入你的项目需要的个性化配置，比如：
  rules: {
    // error; 结尾必须有分号
    semi: [2, 'never'],
  },
}
