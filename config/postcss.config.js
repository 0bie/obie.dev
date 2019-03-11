const cssImport = require('postcss-import');
const cssColorFn = require('postcss-color-function');
const cssPrefix = require('autoprefixer')({browsers: 'last 2 versions'});
const cssVars = require('postcss-css-variables');

const plugins = () => [cssVars, cssColorFn, cssPrefix, cssImport];

module.exports = () => ({
  cssLoader: {
    loader: 'css-loader'
  },
  postcssLoader: {
    loader: 'postcss-loader',
    options: {plugins}
  },
  scssLoader: {
    loader: 'sass-loader'
  }
});
