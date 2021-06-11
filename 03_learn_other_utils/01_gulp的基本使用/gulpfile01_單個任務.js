const GulpClient = require("gulp")

// 定義任務
const foo = (cb) => {
  console.log("foo")
  cb()
}

// 這樣寫也是可以
GulpClient.task("bar", (cb) => {
  console.log("bar")
  cb()
})

// 私有任務
const abc = (cb) => {
  cb()
}

// npx gulp foo執行
module.exports = {
  foo
}

// 默認任務
module.exports.default = (cb) => {
  console.log("default task")
  cb()
}