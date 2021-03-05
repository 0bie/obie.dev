const cssPrefix = require('autoprefixer')
const cssImport = require('postcss-import')
const cssVars = require('postcss-css-variables')
const cssColorFn = require('postcss-color-function')

module.exports = () => ({
    cssLoader: {
        loader: 'css-loader'
    },
    postcssLoader: {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    [cssVars()],
                    [cssColorFn()],
                    [cssPrefix({overrideBrowserslist: 'last 2 versions'})],
                    [cssImport()]
                ]
            }
        }
    },
    scssLoader: {
        loader: 'sass-loader'
    }
})
