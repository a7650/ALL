const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware")

const app = express();
const config = require('./webpack.dev');
const compiler = webpack(config);

const devMiddlewareInstance = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'error'
})

app.use(devMiddlewareInstance);

app.use(webpackHotMiddleware(compiler))

const port = 3000
app.listen(port, function () {
    console.log(`dev: http://localhost:${port}`);
});