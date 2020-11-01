const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Manifest = require('webpack-manifest-plugin')
const webpack = require('webpack')

module.exports = {
  mode:'development',
  entry: {
    app:['webpack-hot-middleware/client','./src/index.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist'
  // },
  plugins: [
    new Manifest(),
    new CleanWebpackPlugin({
      dry: 'dist'
    }),
    new HtmlWebpackPlugin({
      title: 'HEROWAR',
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};