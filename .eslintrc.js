module.exports = {
  env: {
    browser: false,
    es6: true,
    'jest/globals': true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['jest'],
  rules: {
    'no-unused-vars': 1,
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 0,
    'no-console': false,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
