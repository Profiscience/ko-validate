'use strict' // eslint-disable-line

const webpack = require('webpack')

module.exports = [
  makeConfig(),
  makeConfig({ minify: true })
]

function makeConfig({ minify } = {}) {
  return {
    entry: './src/index.js',

    output: {
      path: 'dist',
      filename: minify ? 'ko-validation.min.js' : 'ko-validation.js',
      library:  'ko-validation',
      libraryTarget: 'umd'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          // exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true
          }
        }
      ]
    },

    externals: {
      'knockout': {
        root: 'ko',
        commonjs: 'knockout',
        commonjs2: 'knockout',
        amd: 'knockout'
      },
      'lodash': {
        root: '_',
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash'
      }
    },

    devtool: 'source-map',

    plugins: minify
      ? [new webpack.optimize.UglifyJsPlugin()]
      : []
  }
}
