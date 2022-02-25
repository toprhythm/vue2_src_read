// 手写第一次上树时
import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

// v1.0
// const myVnode1 = h('h1', {}, '你好')

// v2.0
const myVnode1 = h('ul', {}, [
  h('li', {  }, 'A'),
  h('li', {  }, 'B'),
  h('li', {  }, [
    h('div', {}, [
      h('ol', {}, [
        h('li', {}, '哈哈'),
        h('li', {}, '西西'),
        h('li', {}, '呵呵')
      ])
    ])
  ]),
  h('li', {  }, 'D')
])

const container = document.getElementById("container")
patch(container, myVnode1)

const btn = document.getElementById("btn")

const myVnode2 = h('section', {}, [
  h('h1', {}, '我是新的h1'),
  h('h2', {}, '我是新的h2'),
])

btn.onclick = function () {
  patch(myVnode1, myVnode2)
}