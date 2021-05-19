const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [path.resolve(__dirname, './src/index')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HEROWAR',
      template: path.resolve(__dirname, './public/index.html')
    })
  ]
}
