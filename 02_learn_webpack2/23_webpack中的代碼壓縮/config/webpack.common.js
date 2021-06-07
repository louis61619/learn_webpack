const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const TeserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



const { merge } = require('webpack-merge')

const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

const commonConfig = (isProdution) => {
  return {
    // 多入口分離
    entry: {
      // main: "./src/main.js",
      index: "./src/index.js"
      // main: {
      //   import: "./src/main.js",
      //   dependOn: "shared"
      // },
      // index: {
      //   import: "./src/index.js",
      //   dependOn: "shared"
      // },
      // // lodash: "lodash"
      // shared: ["lodash", "dayjs"]
    },
    output: {
      filename: "js/[name].[chunkhash:6].bundle.js",
      path: resolveApp('./build'),
      // chunkhash只會改對應被改掉的文件的hash
      chunkFilename: "js/[name].[contenthash:6].chunk.js"
      // chunkhash 父文件改就改
      // contenthash 內容改才改
    },
    resolve: { // 自動解析後綴
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue'],
      alias: {
        "@": resolveApp("./src"),
        "pages": resolveApp("./src/pages")
      }
    },
    optimization: {
      // minimizer: [ // 取消liscence相關設置
      //   new TeserPlugin({
      //     extractComments: false
      //   })
      // ],
      // natural: 使用自然數
      // names: 使用包目錄為name
      // deterministic: 針對相同文件生成id
      chunkIds: "deterministic", // 模塊ID採用的算法
      splitChunks: {
        // async 非同步導入
        // initial 同步導入
        // all 全部
        chunks: "all",
        // 最小尺寸：如果拆分出來，那拆出來的包最小尺寸為這個值
        minSize: 20000,
        // 最大尺寸： 將大於maxSize的包，拆分成不小於miniSize的包
        // maxSize: 20000,
        // minChunks表示引入的包至少被導入幾次
        minChunks: 1,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/, // 為了同時匹配windows和mac的路徑
            filename: "js/[id]_vendors.js",
            priority: -10
          },
          // bar: {
          //   test: /bar_/,
          //   filename: "[id]_bar.js"
          // }
          default: {
            minChunks: 2,
            filename: "common_[id].js",
            priority: -20
          }
        }
      },
      // true/multiple
      // single
      // Object: name
      runtimeChunk: {
        name: 'runtime'
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
            isProdution? MiniCssExtractPlugin.loader: 'style-loader',
            "css-loader"
          ],
          sideEffects: true, // 設置這個模塊具有副作用，而不會打包
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        // inject: "head" // true false head body
        cache: true, // 當文見沒有改變時要不要使用緩存
        minify: isProdution? {
          // 要不要移除註釋
          removeComments: true,
          // 是否移除多餘的屬性
          removeRedundantAttributes: true,
          // 是否移除空屬性
          removeEmptyAttributes: true,
          // 是否移除空格
          collapseWhitespace: false,
          // 是否移除
          removeStyleLinkTypeAttributes: true,
          // 要不要對head的CSS進行壓縮
          minifyCSS: true,
          // 要不要對script標籤內的js進行壓縮
          minifyJS: {
            mangle: {
              toplevel: true
            }
          },
        }: false // 要不要壓縮
      }),
      new VueLoaderPlugin(),
      // 當我們在代碼中遇到某個變量找不到時，會通過插ProvidePlugin件自動導入對應的庫
      new webpack.ProvidePlugin({
        _: "lodash",
        join: ["lodash", "join"]
      }),
    ]
  }
}

module.exports = function(env) {

  const isProdution = env.production
  // 在進程的環境參數中加入設定
  process.env.NODE_ENV = isProdution ? "production": "development"

  const config = isProdution ? prodConfig: devConfig
  return merge(commonConfig(isProdution), config)
}