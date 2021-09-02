const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [path.resolve(__dirname, './index')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HEROWAR',
      template: path.resolve(__dirname, './index.html')
    })
  ]
}
