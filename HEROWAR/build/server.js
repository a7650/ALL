const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler))

const port = 3000
app.listen(port, function () {
    console.log(`dev: http://localhost:${port}`);
});