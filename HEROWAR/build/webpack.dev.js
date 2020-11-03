const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const { constants } = require('buffer')
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    entry: {
        app: ['webpack-hot-middleware/client', './src/index.ts']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    stats: 'none'
})