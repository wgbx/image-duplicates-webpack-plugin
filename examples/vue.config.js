const ImageDuplicatesWebpackPlugin = require('../packages/index')

module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    plugins: [
      new ImageDuplicatesWebpackPlugin()
    ]
  }

}
