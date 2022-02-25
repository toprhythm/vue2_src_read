import vnode from './vnode.js'
import createElement from './createElement.js'

// 修补函数模块
export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数是dom还是vnode
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 传入的第一个参数是dom节点，此时要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 判断oldVnode和newVnode是不是同一个节点
  if ( oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel ) {
    // 进行精细化比较
    console.log( '是同一个节点' )
  } else {
    // 暴力插入新的，删除旧的
    console.log( '不是同一个节点，暴力拆除旧的创建新的' )
    let newVnodeElm = createElement(newVnode)
    // 插入老节点之前
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  } 
}