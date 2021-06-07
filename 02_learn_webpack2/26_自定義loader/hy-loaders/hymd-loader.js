const marked = require('marked')
const hljs = require('highlight.js')

module.exports = function(content) {
  // console.log('md loader')
  marked.setOptions({
    highlight: function(code, lang) {
      return hljs.highlight(lang, code).value
    }
  })
  const htmlContent = marked(content)
  
  const innerContent = "`" + htmlContent + "`"
  const moduleConde = `var code=${innerContent}; export default code;`

  // 必須導出js或是二進制
  return moduleConde
}