const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  // watch: true,
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
    // publicPath: "/abc",
  },
  // 為dev-server增加配置
  devServer: {
    hot: true,
    hotOnly: true,
    // host: "0.0.0.0" // 設置可以讓其他外部IP訪問
    // port: 7777,
    compress: true, // 開啟gzip壓縮
    contentBase: path.resolve(__dirname, "./why"), // 本地文件查找路徑
    watchContentBase: true, // 監聽靜態文件的改變
    // publicPath: "/abc",
    proxy: {
      // "/api": "http://localhost:8888" // 將網路請求為/api開頭的映射到localhost:8888
      "/api": {
        target: "http://localhost:8888",
        pathRewrite: {
          "^/api": ""
        },
        secure: false, // 不進行憑證的驗證
        changeOrigin: true // 如果服務端進行效驗，可以在這邊改變請求頭的來源
      }
    },
    // historyApiFallback: true
    historyApiFallback: {
      rewrites: [ // 匹配具體頁面
        {from: /abc/, to: "index.html"}
      ]
    }
  },
  resolve: { // 自動解析後綴
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "pages": path.resolve(__dirname, "./pages")
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
    // new ReactRefreshWebpackPlugin(),
    new VueLoaderPlugin()
  ]
}