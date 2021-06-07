module.exports = function(content) {
  console.log(content, "哈哈哈 這是我的loader03")
  return content + 123;
}

// Pitch Loader
module.exports.pitch = function() {
  console.log("loader pitch 03")
}