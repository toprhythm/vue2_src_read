// h.js
import vnode from './vnode.js'

// console.log(vnode('div', 2,3,4,5))

// 编写一个低配版的h函数,这个函数必须填写3个参数，缺一不可
// 想但由于它的重载功能
// 也就是说，调用的时候形态必须是下面的三种之一
export default function ( sel, data, c ) {
  // 1. h('div', {}, '文字')
  // 2. h('div', {}, [])
  // 3. h('div', {}, h())

  // 检查参数的个数
  if ( arguments.length!=3 ) {
    throw new Error('对不起，h函数必须是三个参数，否则是错误的')
  } 
  // 检查参数 c 的类型
  if ( typeof c == 'string' || typeof c == 'number' ) {
    // 说明现在调用h函数是形态1
    // (sel, data, children, text, elm)
    return vnode(sel, data, undefined, c, undefined)
  } else if ( Array.isArray(c) ) {

    let children = []

    // 形态二
    for (var i = 0; i < c.length; i++) {
      // c的第i项必须是一个对象,如果不满足
      if(! (typeof c[i] == 'object' && c[i].hasOwnProperty('sel')) ) {
        throw new Error('你传入的数组参数中有项不是h函数')
      }
      // 这里不用执行c[i],因为测试语句中已经有了执行
      // 只要收集好就行
      children.push(c[i])
    }
    // 循环结束，代表children收集完毕，此时返回虚拟节点，他有children属性
    return vnode(sel, data, children, undefined, undefined)
  } else if ( typeof c == 'object' && c.hasOwnProperty('sel') ) {
    // 形态三
    // 即传入的c是唯一的children,不用执行c,因为已经执行了c
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('传入的第三个参数类型不对')
  }




}