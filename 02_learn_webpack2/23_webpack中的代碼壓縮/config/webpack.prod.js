const path = require('path')
const resolveApp = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMiniMizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: "development",
  devtool: "source-map", // 不進行eval轉換並生成map
  externals: {
    lodash: "_",
    dayjs: "dayjs"
  },
  optimization: {
    // 目的是標註出哪些代碼沒有被使用，然後由Terser替我們刪除
    // 可以在package.json中設定所有模塊都沒有副作用
    usedExports: true,
    minimize: true,
    minimizer: [ // 取消liscence相關設置
      new TerserPlugin({
        extractComments: false, // 是否抽離註釋
        parallel: true, // 多核
        terserOptions: {
          compress: {
            arguments: false, // 替換參數
            dead_code: true
          },
          mangle: true,
          toplevel: true, // 替換變數
          keep_classnames: true, // 替換類名
          keep_fnames: true // 替換函數名
        }
      })
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css"
    }),
    new CssMiniMizerPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin() // 作用域提升
    new PurgeCssPlugin({
      paths: glob.sync(`${resolveApp("./src")}/**/*`, {nodir: true}), // 同步匹配CSS文件並傳入絕對路徑匹配所有文件並不包韓資料夾
      safelist: function() { // 添加不刪除的CSS標籤
        return {
          standard: ["body", "html"]
        }
      }
    }),
    new CompressionPlugin({ // 進行gzip壓縮
      threshold: 0,
      test: /\.(css|js)$/i, // 以css和js結尾的時候進行壓縮
      minRatio: 0.8, // 壓縮比例
      algorithm: "gzip",
      // exclude
      // include
    }),
  new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js/,])
  ]
}