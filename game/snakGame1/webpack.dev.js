const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [path.resolve(__dirname, './jscript.js')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SNAK',
      template: path.resolve(__dirname, './index.html')
    })
  ]
}
