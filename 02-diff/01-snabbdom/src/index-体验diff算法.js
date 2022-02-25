import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

// 得到dom容器，和按钮
const container = document.getElementById('container')
const btn = document.getElementById('btn')

// 创建出patch函数
var patch = init([classModule, propsModule, styleModule, eventListenersModule])

// v2.0
// const vnode1 = h('ul', {}, [
//     h('li', {}, 'A'),
//     h('li', {}, 'B'),
//     h('li', {}, 'C')
//   ])

// v3.0
// const vnode1 = h('ul', {}, [
//     h('li', {key: 'A'}, 'A'),
//     h('li', {key: 'B'}, 'B'),
//     h('li', {key: 'C'}, 'C')
//   ])

// v5.0
// const vnode1 = h('div', {}, [
//     h('p', {key: 'A'}, 'A'),
//     h('p', {key: 'B'}, 'B'),
//     h('p', {key: 'C'}, 'C')
//   ])

// v6.0
const vnode1 = h('div', {}, [
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'A'}, 'A'),
    h('p', {key: 'C'}, 'C')
  ])

patch(container, vnode1)

// v1.0 
// desc: 确实是最小化更新
// const vnode2 = h('ul', {}, [
//     h('li', {}, 'A'),
//     h('li', {}, 'B'),
//     h('li', {}, 'C'),
//     h('li', {}, 'D')
//   ])

// v2.0
// desc: 不是最小化更新，而是暴力拆迁,丑八怪法
// becouse: E其实是在最后插入的，但是显示在第一个，其实就是原来第一个元素的文本，由A变E，原来第二个元素有B为A...,并不是我们的diff不够聪明，而是我们没有给每一个Item指定Key，就是v-for里的key，我们的老朋友, key是唯一表示，提升diff性能
// const vnode2 = h('ul', {}, [
//     h('li', {}, 'E'),
//     h('li', {}, 'A'),
//     h('li', {}, 'B'),
//     h('li', {}, 'C'),
//   ])

// v3.0
// desc:使用key,不会在最后插入，然后暴力拆迁了，而是智能修补
// const vnode2 = h('ul', {}, [
//     h('li', {key: 'E'}, 'E'),
//     h('li', {key: 'A'}, 'A'),
//     h('li', {key: 'B'}, 'B'),
//     h('li', {key: 'C'}, 'C'),
//   ])

// v4.0
// desc: 把ul改成ol，验证必须是同一个dom元素(必须都是ul)，才可以最小量更新，否则必须暴力拆迁
// 如何定义是同一个虚拟节点，选择器相同或者key相同
// const vnode2 = h('ol', {}, [
//     h('li', {key: 'E'}, 'E'),
//     h('li', {key: 'A'}, 'A'),
//     h('li', {key: 'B'}, 'B'),
//     h('li', {key: 'C'}, 'C'),
//   ])

// v5.0
// section四个P是否是最小量更新, 答案：不是最小化更新，是拆迁,暴力拆除旧的，插入新的, 说明只进行同层比较，不进行不同层比较
// const vnode2 = h('div', {}, h('section', {}, [
//     h('p', {key: 'E'}, 'E'),
//     h('p', {key: 'A'}, 'A'),
//     h('p', {key: 'B'}, 'B'),
//     h('p', {key: 'C'}, 'C'),
//   ]))

// v6.0 同层乱序，是可以最小量更新的
const vnode2 = h('div', {}, [
    h('p', {key: 'E'}, 'E'),
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'A'}, 'A'),
    h('p', {key: 'C'}, 'C')
  ])

// 点击按钮时，让vnode1修补成vnode2,最小化更新
btn.onclick = function () {

  patch(vnode1, vnode2)

}

/*
  怎么证明vnode1转换到vnode2？是没有使用暴力拆迁，而是修补？
    f12改文字丑八怪法，在其他没有修改的元素的文本内容随意修改成其他文本例如li的文本是A，随意改成cbg，然后点击按钮，如果只是生D，其他dom元素的文本内容依旧是丑八怪，那么说明确实是最小化更新,别名DIFF
*/