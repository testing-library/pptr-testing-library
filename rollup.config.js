import path from 'path'

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

module.exports = {
  input: path.join(__dirname, 'dom-testing-library.input.js'),
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
