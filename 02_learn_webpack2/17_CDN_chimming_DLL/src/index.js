// import _ from 'lodash'
import dayjs from 'dayjs'
// import './bar_01'

console.log(join(["Hello", "Index"]))
console.log(dayjs(), "Index")
// console.log(_)

// import(/* webpackChunkName: "foo" */'./foo').then(res => {
//   console.log(res)
// })

// import(/* webpackChunkName: "foo_02" */'./foo_02').then(res => {
//   console.log(res)
// })


const button = document.createElement('button')
button.innerHTML = "加載元素"
button.addEventListener('click', () => {
  // prefetch -> 魔法註釋(magic comments)
  /* webpackPrefetch: true */ // 預獲取
  /* webpackPreload: true */ // 預加載，會在父文件做並行加載
  import(
    /* webpackChunkName: "element" */
    /* webpackPreload: true */
    './element'
  ).then(({default: element}) => {
    console.log(element)
    document.body.appendChild(element)
  })
})

document.body.appendChild(button)