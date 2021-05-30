const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    filename: "js/bundle.js",
    // 必須是一個絕對路徑
    path: path.resolve(__dirname, "./build"),
    // assetModuleFilename: "img/[name].[hash:6][ext]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-transform-arrow-functions",
              "@babel/plugin-transform-block-scoping"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "my webpack",
    }),
  ]
}