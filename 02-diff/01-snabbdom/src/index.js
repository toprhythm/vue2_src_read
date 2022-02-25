// 手写第一次上树时
import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

// v1.0
const myVnode1 = h('h1', {}, '你好')

// v2.0
// const myVnode1 = h('ul', {}, [
//   h('li', {  }, 'A'),
//   h('li', {  }, 'B'),
//   h('li', {  }, 'C'),
//   h('li', {  }, 'D')
// ])

const container = document.getElementById("container")

patch(container, myVnode1)