const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMiniMizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: "development",
  devtool: "source-map", // 不進行eval轉換並生成map
  externals: {
    lodash: "_",
    dayjs: "dayjs"
  },
  optimization: {
    minimize: false,
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
    new webpack.optimize.ModuleConcatenationPlugin() // 作用域提升
  ]
}