import { sum } from './util/math.js'

// 瀏覽器加載es6有一個非常大的缺點 就是光loadash需要加載200多個文件
// 透過vite可以對加載的文件先進行處理
import _ from 'lodash-es'

import './css/base.css'
import './css/style.less'

// 對ts的處理
import { dateFormat } from './ts/format'

// 對img的處理
import aImg from './image/48.jpg'

// 對vue的處理
import Vue from 'vue'
import VueApp from './vue/App.vue'

// 對react處理
import React from 'react'
import ReactDOM from 'react-dom'
import ReactApp from './react/App.jsx'

console.log(sum(30, 40))

console.log(_.join(['ooo', 'lll']))

console.log(dateFormat())

const imgEl = document.createElement('img')
imgEl.src = aImg
document.body.appendChild(imgEl)

// vue
new Vue({
  render: h => h(VueApp)
}).$mount('#app')

// react
// esModule
ReactDOM.render(<ReactApp />, document.getElementById('root'))