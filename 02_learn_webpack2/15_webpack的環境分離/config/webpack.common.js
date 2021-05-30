const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin")

const { merge } = require('webpack-merge')

const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

const commonConfig = {
  // context必須配置絕對路徑
  // context: path.resolve(__dirname, "../"),
  // entry的相對路徑並非相對於文件所在的路徑，而是context
  entry: "./src/index.js",
  output: {
    path: resolveApp('./build'),
  },
  resolve: { // 自動解析後綴
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue'],
    alias: {
      "@": resolveApp("./src"),
      "pages": resolveApp("./src/pages")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: "babel-loader"
      },
      {
        test: /\.vue$/i,
        use: "vue-loader"
      },
      {
        test: /\.css/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = function(env) {

  const isProdution = env.production
  // 在進程的環境參數中加入設定
  process.env.NODE_ENV = isProdution ? "production": "development"

  const config = isProdution ? prodConfig: devConfig
  return merge(commonConfig, config)
}