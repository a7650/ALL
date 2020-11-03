const common = require('./webpack.common')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        app: './src/index.ts',
    },
    output: {
        publicPath: './',
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new UglifyJSPlugin({
        //     sourceMap: true
        // }),
        new CleanWebpackPlugin({
            dry: 'dist'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[id].css'
        }),
        new webpack.HashedModuleIdsPlugin()
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
    },
})