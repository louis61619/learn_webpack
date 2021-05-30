
// es module導出內容，commonjs導入內容
const math = require('./js/math')

// commonjs導出內容， es module導入內容
import { formatDate } from './js/formate'

console.log(math.sum())

console.log(formatDate())

console.log(xx)