const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AhtoUploadPlugin = require('./plugins/AutoUploadPlugin')

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new AhtoUploadPlugin({
      host: "18.181.167.166",
      username: "ec2-user",
      // privateKey: "/Users/hsiehjungjui/.ssh/id_rsa",
      remotePaht: "/www/test"
    })
  ]
}