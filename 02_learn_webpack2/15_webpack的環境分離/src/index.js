/***
 * 
 * npm run build 可以透過 --watch監聽變化
 * 編譯成功之後都會生成新的文件
 * 可以透過vs code的live server
 * 
 */

import axios from 'axios'

import { sum } from './math'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactApp from './App.jsx'
import Vue from 'vue'
import VueApp from './App.vue'

console.log(sum(8, 325))
console.log(<ReactApp />)


if(module.hot) {
  module.hot.accept("./math", () => {
    console.log("math")
  })
}

ReactDOM.render(<ReactApp />, document.getElementById('root'))

new Vue({
  render: h => h(VueApp)
}).$mount("#app")

// axios.get('/api/moment').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })