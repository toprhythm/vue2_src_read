import h from './mysnabbdom/h.js'
// alert('mysnabbdom')

// var myVnode1 = h('div',{},'文字')
// console.log(myVnode1)

// v1.0
// var myVnode2 = h('div',{},[
//   h('p', {}, '哈哈'),
//   h('p', {}, '西西'),
//   h('p', {}, '呵呵'),
//   h('p', {}, h('span', {}, 'A'))
//   // 'asdfkladsk' // 测试你传入的数组参数中有项不是h函数
// ])
// console.log(myVnode2)

// v2.0
var myVnode3 = h('ul', {}, [
    h('li', {}, '苹果'),
    h('li', {}, '西瓜'),
    h('li', {}, [
        h('div', {}, [
            h('p', {}, '哈哈'),
            h('p', {}, '呵呵')
          ])
      ]),
    h('h1', {}, h('p', {}, '火龙果'))
  ])
console.log(myVnode3)

// var myVnode3 = h('div',{},{})
// console.log(myVnode3)