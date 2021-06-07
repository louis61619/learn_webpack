const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')

const schema = require('../hy-schema/loader01-schema.json')
// Normal Loader
// // 同步loader
// module.exports = function(content) {
//   console.log(content, "哈哈哈 這是我的loader01")

//   // 同步的loader，兩種方法返回數據
//   // return content + 123;
//   this.callback(null, content)

// }

// 非同步
module.exports = function(content) {
  console.log(content, "哈哈哈 這是我的loader01")

  // 獲取傳入的參數
  const options = getOptions(this)
  console.log("傳入的參數", options)

  validate(schema, options, {
    name: "hy-loader01"
  })

  const callback = this.async()

  setTimeout(() => {
    callback(null, content)
  }, 2000)
}


// Pitch Loader
module.exports.pitch = function() {
  console.log("loader pitch 01")
}