/*
  函数的功能是折叠token，将#和/之间的tokens能够折叠起来，作为他的下标为3的项
*/
export default function nestTokens( tokens ) {
  // 结果数组
  var nestedTokens = []

  // 收集器，天生指向nextedTokens,引用类型,指向同一个数组
  var collector = nestedTokens

  // 栈结构，栈顶（靠近端口的，最新进入的，是当前操作的这个tokens小数组）
  var sections = []

  // console.log(tokens)

  // for v1.0 错误的，看官方源码发现collector
  // for (var i =0; i < tokens.length; i++) {
  //   let token = tokens[i]

  //   switch ( token[0] ) {
  //     case '#':
  //         // 给这个token下标为2的项创建一个数组，以收集子元素
  //         token[2] = []
  //         // 压栈，入栈
  //         sections.push(token)
  //         nestedTokens.push(token)
  //         // console.log(token[1]+'入栈了')
  //         break
  //     case '/':
  //         // 弹栈，出栈,pop会返回刚刚弹出的项
  //         let section_pop = sections.pop()
  //         // console.log(a[1]+'出栈了')
  //         // 刚刚弹出的项还没有加入到结果数组中
  //         nestedTokens.push(section_pop)
  //         break
  //     default:
  //         // 判断,栈队列当前情况
  //         if ( sections.length == 0 ) {
  //           nestedTokens.push(tokens)
  //         } else {
  //           sections[sections.length - 1][2].push(token)
  //         }

  //   }

  // }

  // for v2.0
  for (var i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    switch ( token[0] ) {
      case '#':
          // 向收集器中放入这个Token
          collector.push(token)
          // 入栈
          sections.push(token)
          // 收集器换人,给token添加下标为2的项，并且让收集器指向他
          token[2] = []
          collector = token[2]
          break
      case '/':
          // 出栈,会返回弹出的项
          sections.pop()
          // 改变收集器为栈结构队尾（队wei是栈顶）那一项的下标为2的数组
          collector = sections.length > 0 ? sections[sections.length -1][2]:nestedTokens
          break
      default:
          // 不要管当前collector是谁，可能是nestedTokens，也可能是某个token的下标为2的数组，不要管是谁，直接推入collector即可
          collector.push(token)

    }
  }

  return tokens  
}