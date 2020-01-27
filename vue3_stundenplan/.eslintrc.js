module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'vue/valid-template-root': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  // overrides: [
  //   {
  //     files: ['**/*.vue'],
  //     rules: {},
  //   },
  // ],
  parserOptions: {
    parser: 'babel-eslint',
  },
}
