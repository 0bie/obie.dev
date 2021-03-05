const webpack = require('webpack');
const commonPaths = require('./common-paths');
const {cssLoader, postcssLoader, scssLoader} = require('./postcss.config')();
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: commonPaths.contextPath,
  entry: {
    home: './scripts/entry/home',
    style: './css/entry/style'
  },
  output: {
    publicPath: '/dist/',
    path: commonPaths.outputPath
  },
  resolve: {
    alias: {
      utils: commonPaths.utilsPath,
      styles: commonPaths.stylesPath
    },
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postcssLoader,
          scssLoader
        ]
      },
      {
        test: /\.(jpe?g|\.png|gif|\.svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 10000, outputPath: commonPaths.outputPath}
          },
          {
            loader: 'image-webpack-loader',
            options: {bypassOnDebug: true}
          },
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
        new TerserPlugin({
            parallel: true,
            extractComments: false
        }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            calc: false,
            zindex: false
          }]
        }
      })
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ]
};
