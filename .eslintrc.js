module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 'off',
    'prefer-destructuring': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
  },
};
