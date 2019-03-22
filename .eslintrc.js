module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
<<<<<<< HEAD
    'eslint:recommended',
    '@vue/typescript'
=======
    'eslint:recommended'
>>>>>>> init
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
<<<<<<< HEAD
    parser: 'typescript-eslint-parser'
=======
    parser: 'babel-eslint'
>>>>>>> init
  }
}
