/*
  功能是可以在dataObj对象中，寻找用连续点符号的属性, "item.username"
  比如 {
  a:{
    b:{
      c: 99
      }
    }
  }
  那么lookup(dataObj, 'a.b.c'结果就是100)
  这个函数是某个大厂的面试题
*/
export default function lookup (dataObj, keyName) {
  console.log(dataObj, keyName)
  // 看看keyName中有没有点符号
  if (keyName.indexOf('.') != -1) {
    // 如果有点符号，那么拆开
    var keys = keyName.split('.')
    // console.log(names)
    // 设置一个临时变量，这个变量用于周转，一层一层找下去
    var temp = dataObj
    // 每找一层，都把他变为新的临时变量
    for ( let i = 0; i < keys.length; i++ ) {
      temp = temp[keys[i]]
    }
    // console.log(temp)
    return temp
  }
  // 如果没有点符号
  return dataObj[keyName]

}