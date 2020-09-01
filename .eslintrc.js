const {overrides, ...config} = require('@hover/javascript/eslint')

module.exports = {
  ...config,
  ignorePatterns: ['dom-testing-library.js', 'rollup.input.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.eslint.json', 'tsconfig.json'],
  },
  rules: {
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': ['error', {allow: ['__regex', '__flags']}],
  },
}
