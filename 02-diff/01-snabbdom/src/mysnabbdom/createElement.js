// 真正创建节点,将vnode创建为Dom，插入到pivot元素之前

// v1.0
// export default function ( vnode, pivot/* 标杆 */ ) {
// console.log( '目的是把vnode插入pivot前' )
// let domNode = document.createElement(vnode.sel)
// // 有子节点还是有文本
// if ( vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0) ) {
//     // 它内部是文字
//     domNode.innerText = vnode.text
//     // 将孤儿节点上树,让标杆元素的父元素调用insertBefore方法，将新的节点插入到标杆节点之前
//     pivot.parentNode.insertBefore(domNode, pivot)
//   } else if ( Array.isArray(vnode.children) && vnode.children.length > 0 ) {
//     // 它内部的数组子节点，需要递归创建dom

//   }
// }

// v2.0
// 真正创建节点,是孤儿节点，不进行插入
export default function ( vnode ) {
  console.log( '目的是把vnode' )
  let domNode = document.createElement(vnode.sel)
  // 有子节点还是有文本
  if ( vnode.text != '' && vnode.children == undefined || vnode.children.length == 0 ) {
      // 它内部是文字
      domNode.innerText = vnode.text
      // 补充elm属性
      vnode.elm = domNode
    } 

    // 返回elm，elm属性纯dom
    return vnode.elm
}