const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  output: {
    filename: 'scripts/[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /quill/,
        sideEffects: false
      },
      {
        test: /date-fns/,
        sideEffects: false
      }
    ]
  },
  optimization: {
    chunkIds: 'named',
    nodeEnv: 'production',
    // occurrenceOrder: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /quill|date-fns/,
          enforce: true
        },
        admin: {
          chunks: 'initial',
          name: 'admin',
          test: /admin/,
          enforce: true
        },
        home: {
          chunks: 'initial',
          name: 'home',
          test: /home/,
          enforce: true
        },
        login: {
          chunks: 'initial',
          name: 'login',
          test: /login/,
          enforce: true
        }
      }
    },
    minimizer: [new TerserPlugin({
      parallel: true
    })]
  },
  plugins: [
    // new webpack.HashedModuleIdsPlugin(),
    // new CompressionWebpackPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(js|html|css)$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
