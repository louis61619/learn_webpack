const babel = require('@babel/core')
const { getOptions } = require('loader-utils')

module.exports = function(content) {
  // 設置為非同步的loader
  const callback = this.async()

  // 獲取傳入的參數
  const options = getOptions(this)

  // 對源代碼進行轉換
  babel.transform(content, options, (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result.code)
    }
  })
}