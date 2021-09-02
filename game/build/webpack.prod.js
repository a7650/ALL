const path = require('path')
const common = require('./webpack.common')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()

module.exports = merge(
  common,
  smp.wrap({
    mode: 'production',
    devtool: 'source-map',
    entry: {
      app: path.resolve(__dirname, '../babel/index.js')
    },
    output: {
      publicPath: './',
      filename: '[name].[contenthash].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new CleanWebpackPlugin({
        dry: 'dist'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[id].css'
      }),
      new HtmlWebpackPlugin({
        title: 'prod',
        template: path.resolve(__dirname, '../babel/index.html')
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        }
      ]
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  })
)
