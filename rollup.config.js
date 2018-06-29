const path = require('path')

module.exports = {
  input: path.join(__dirname, 'rollup.input.js'),
  output: {
    file: 'dom-testing-library.js',
    format: 'iife',
    name: '__dom_testing_library__',
  },
  plugins: [require('rollup-plugin-node-resolve')(), require('rollup-plugin-commonjs')()],
}
