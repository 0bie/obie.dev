const {resolve} = require('path');

module.exports = {
  contextPath: resolve('public'),
  outputPath: resolve(__dirname, '../', 'public/dist'),
  utilsPath: resolve(__dirname, '../', 'public/scripts/utils/index'),
  stylesPath: resolve(__dirname, '../', 'public/css/style')
};
