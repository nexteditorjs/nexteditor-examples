module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'airbnb-typescript',
    "plugin:@typescript-eslint/recommended"
],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    "project": './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    "object-curly-newline": ["off"],
    "no-constant-condition": 0,
    "max-len": ["error", { "code": 200 }],
    "no-plusplus": 0,
    "no-continue": 0,
    "@typescript-eslint/no-shadow": 0,
    "class-methods-use-this": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 0,
    "prefer-destructuring": 0,
  }
}
