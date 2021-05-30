const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'js/bundle.js',
    // 必須是一個絕對路徑
    path: path.resolve(__dirname, './build'),
    // assetModuleFilename: "img/[name].[hash:6][ext]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'my webpack',
      template: './index.html',
    }),
  ],
};
