const path = require('path')

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build")
  },
  module: {
    rules: [
      {
        // 規則使用正則表達式
        test: /\.css$/, // 匹配資源
        // loader: "css-loader" 單個loader的簡化寫法
        use: [ // 從後往前加載
          // { loader: "css-loader" }
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            // options: {
            //   postcssOptions: { // 依賴的插件
            //     plugins: [
            //       // require('autoprefixer'), // postcs-preset-env已經包含這個插件的功能
            //       // require('postcss-preset-env')
            //       'postcss-preset-env'
            //     ]
            //   }
            // }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        // test: /\.(png|jpg|jpeg|gif|svg)$/,
        test: /\.(png|jpe?g|gif|svg)/, // 正則表達式中？表示前面的字符為一個或零個
        use: [
          {
            // loader: "file-loader",
            loader: "url-loader", // 轉為base64的data
            options: { // vue-cli就是這樣對文件重命名的
              name: "img/[name].[hash:6].[ext]",
              limit: 1024 * 1024 // 小於1MB的圖片轉為base64
              // outputPath: "img"
            }
          }
        ]
      }
    ]
  }
}