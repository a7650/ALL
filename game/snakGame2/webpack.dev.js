const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [path.resolve(__dirname, './index.ts')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SNAK',
      template: path.resolve(__dirname, './index.html')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
