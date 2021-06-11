import { dateFormat } from './utils/format'
import _ from 'lodash'
import './css/style.css'

import Vue from 'vue'
import VueApp from './vue/App.vue'

const message = "Hello Rollup"
console.log(message)

const sum = (num1, num2) => {
  return num1 + num2
}

console.log(dateFormat())
console.log(_.join("vvj", "ddd"))

class Person {

}

new Vue({
  render: h => h(VueApp)
}).$mount('#app')

export {
  sum,
  dateFormat,
  Person
}