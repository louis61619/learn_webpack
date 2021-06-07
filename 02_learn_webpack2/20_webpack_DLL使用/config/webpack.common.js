const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const TeserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const { merge } = require('webpack-merge')

const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

const commonConfig = (isProdution) => {
  return {
    // 多入口分離
    entry: {
      main: "./src/main.js",
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
      filename: "js/[name].[hash:6].bundle.js",
      path: resolveApp('./build'),
      chunkFilename: "js/[name].[hash:6].chunk.js"
    },
    resolve: { // 自動解析後綴
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue'],
      alias: {
        "@": resolveApp("./src"),
        "pages": resolveApp("./src/pages")
      }
    },
    optimization: {
      minimizer: [ // 取消liscence相關設置
        new TeserPlugin({
          extractComments: false
        })
      ],
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
      // runtimeChunk: {
      //   name: function(entrypoint) {
      //     return `why-${entrypoint.name}`
      //   }
      // }
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
          ]
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new VueLoaderPlugin(),
      // 當我們在代碼中遇到某個變量找不到時，會通過插件自動導入對應的庫
      new webpack.ProvidePlugin({
        _: "lodash",
        join: ["lodash", "join"]
      }),
      // dll插件
      new webpack.DllReferencePlugin({
        context: resolveApp("./"), // 上下文路徑
        manifest: resolveApp("./dll/react.manifest.json"),
      }),
      new AddAssetHtmlPlugin({
        filepath: resolveApp('./dll/dll_react.js'),
        publicPath: ''
      })
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