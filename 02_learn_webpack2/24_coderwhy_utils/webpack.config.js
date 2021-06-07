const path = require('path')

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "renny_utils.js",
    // AMD/CommonJs/瀏覽器
    // Commonjs: 社區規範的commonjs，這裡面沒有module物件
    // Commonjs2: Node實現的Commonjs，這裡面有module物件 module.exports
    libraryTarget: "umd",
    library: "utils",
    globalObject: "this", // node中代表模塊，瀏覽器內代表window
  }
}