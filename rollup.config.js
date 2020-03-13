import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import path from 'path'

module.exports = {
  input: path.join(__dirname, 'rollup.input.js'),
  output: {
    file: 'dom-testing-library.js',
    format: 'iife',
    name: '__dom_testing_library__',
  },
  plugins: [
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}
