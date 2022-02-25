import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

// 创建出patch函数
var patch = init([classModule, propsModule, styleModule, eventListenersModule])

// 创建虚拟节点
var myVnode1 = h('a', {
  props: {
    href: 'http://www.atguigu.com',
    target: '_blank'
  }
}, '尚硅谷')
console.log(myVnode1)

const myVnode2 = h('div', {class: {box: true}}, "我是一个盒子")

const myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', '苹2'),
  h('li', [
      h('div', [
          h('p', '123po')
        ])
    ]),
  h('li', h('p', '火龙果')),
  h('li', [h('p', '火龙果1'),h('p', '火龙果2')]),
])

// 让虚拟节点上树
const container = document.getElementById('container')
// patch(container, myVnode1)
// patch(container, myVnode2)
patch(container, myVnode3)