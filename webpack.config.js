const commonConfig = require('./config/webpack.common');
const webpackMerge = require('webpack-merge');

/**
 * @param {object} env - The environment variables
 * passed in `package.json`
 * Reference: https://goo.gl/rxNF0r
 */

module.exports = (env) => {

  if (!env) {
    throw new Error('You must pass an --env.env flag into your build to run webpack');
  }

  const envConfig = require(`./config/webpack.${env.env}`);
  const mergedConfig = webpackMerge(commonConfig, envConfig);

  return mergedConfig;

};
