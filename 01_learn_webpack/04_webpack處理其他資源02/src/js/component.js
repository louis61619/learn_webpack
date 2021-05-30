
import image from '../img/47.jpg'

function compoenent() {
  const element = document.createElement('div')

  element.innerHTML = ['home', 'me'].join(" ")
  element.className = "content"

  // 創建一個img元素並設置src
  // const imgEl = document.createElement('img')
  const imgEl = new Image(300)
  // imgEl.src = require('../img/47.jpg').default
  imgEl.src = image
  element.appendChild(imgEl)

  // // 創建div，設置背景圖片
  const bgDivEl = document.createElement('div')
  bgDivEl.style.width = 200 + 'px'
  bgDivEl.style.height = 200 + 'px'
  bgDivEl.className = 'bg-image'
  bgDivEl.style.backgroundColor = 'red'
  element.appendChild(bgDivEl)

  // 創建i元，設置字體圖標
  const iEl = document.createElement('i')
  iEl.className = 'twicon-td-flag my-icon'
  element.appendChild(iEl)

  return element

}

document.body.appendChild(compoenent())