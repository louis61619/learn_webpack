const path = require('path')

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
    // assetModuleFilename: "img/[name].[hash:6][ext]"
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
        // type: "asset/resource", // file-loader
        // type: "asset/inline" // url-loader
        type: "asset",
        generator: {
          filename: "img/[name].[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 1024
          }
        }
      },
      {
        test: /\.(ttf|eot|woff2?)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:6][ext]"
        }
      }
    ]
  }
}