const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  devtool: "source-map",
  context: path.resolve(__dirname, "."), // 配置上下文就是相對路徑的起點
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build")
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/i,
      //   use: {
      //     loader: "hy-loader01",
      //     options: {
      //       name: "why",
      //       age: "19"
      //     }
      //   }
      // },
      // {
      //   test: /\.js$/i,
      //   use: [
      //     "hy-loader02",
      //   ],
      //   // pre 優先 post 最後
      //   // pitch post => inline => normal => pre
      //   // normal pre => normal => inline => post
      //   enforce: "post"
      // },
      // {
      //   test: /\.js$/i,
      //   use: [
      //     "hy-loader03",
      //   ]
      // }
      {
        test: /\.js$/i,
        use: {
          loader: "hybabel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
      },
      {
        test: /\.md$/i,
        use: [
          // "html-loader",
          "hymd-loader",
        ]
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  resolveLoader: {
    modules: ["node_modules", "./hy-loaders"]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}