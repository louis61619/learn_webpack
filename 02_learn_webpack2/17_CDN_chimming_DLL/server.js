const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app  = express()

const config = require('./webpack.config.js')

// 傳入配置信息，webpack根據配置信息進行編譯
const compiler = webpack(config)

const middleware = webpackDevMiddleware(compiler)
app.use(middleware)

app.listen(3000, () => {
  console.log("服務開啟在3000端口上")
})