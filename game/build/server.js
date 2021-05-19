const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const path = require('path')
const { merge } = require('webpack-merge')
const { cwd } = require('process')
const devConfig = require('./webpack.dev')

const args = process.argv.slice(2).reduce((ret, cur) => {
  const [key, val] = cur.split('=')
  return {
    ...ret,
    [key]: val
  }
}, {})

const app = express()
const config = merge(devConfig, require(path.resolve(cwd(), args.config)))
const compiler = webpack(config)

const devMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  logLevel: 'error'
})

app.use(devMiddlewareInstance)

app.use(webpackHotMiddleware(compiler))

const port = 3000
app.listen(port, function () {
  console.log(`dev: http://localhost:${port}`)
})
