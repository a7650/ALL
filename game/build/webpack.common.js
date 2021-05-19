const path = require('path')
const Manifest = require('webpack-manifest-plugin')
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FileListPlugin = require('./plugin')

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new Manifest(),
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: {
    //     files: './src/**/*.{ts,tsx,js,jsx}'
    //   }
    // }),
    new FileListPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env']
            }
          },
          'ts-loader'
        ],
        // options: {
        //   transpileOnly: true,
        //   experimentalWatchApi: true,
        // },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      Utils: path.resolve(__dirname, '../src/utils')
    }
  },
  stats: 'none'
}
