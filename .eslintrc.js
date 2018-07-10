module.exports = {
  extends: [
    'plugin:@lifeomic/node/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};
