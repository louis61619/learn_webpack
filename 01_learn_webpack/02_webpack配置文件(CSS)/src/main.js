import { sum } from './js/math'
import "./js/component"

// import "css-loader!./css/index.css"
import "./css/index.css"
import "./css/component.less"

const {
  formatDate
} = require('./js/formate')

console.log(sum())

console.log(formatDate())