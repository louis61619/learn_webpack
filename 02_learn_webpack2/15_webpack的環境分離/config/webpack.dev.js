const resolveApp = require('./paths')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    hotOnly: true, // 只替換代碼而不重整
    // host: "0.0.0.0", // 設置可以讓其他外部IP訪問
    // port: 7777,
    // // compress: true, // 開啟gzip壓縮
    contentBase: resolveApp("./why"), // 本地文件查找路徑
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
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ]
}