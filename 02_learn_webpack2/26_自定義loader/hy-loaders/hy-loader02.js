module.exports = function(content) {
  console.log(content, "哈哈哈 這是我的loader02")
  return content + 123;
}
// Pitch Loader
module.exports.pitch = function() {
  console.log("loader pitch 02")
}