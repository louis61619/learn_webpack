import code from "./doc.md"
import "./style.css"
import "highlight.js/styles/default.css"

console.log("Hello Loader")

const sum = (num1, num2) => {
  return num1 + num2
}

document.body.innerHTML = code