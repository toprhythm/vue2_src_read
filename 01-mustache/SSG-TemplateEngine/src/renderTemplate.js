import lookup from './LookUp.js'
import parseArray from './parseArray.js'
/*
  函数的功能是让tokens数组变为dom字符串
*/
export default function renderTemplate ( tokens, data ) {
  console.log(tokens, data)

  // 结果字符串
  var resultStr = ''

  // 遍历tokens
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]    

    // 看类型
    if ( token[0] == 'text' ) {
      resultStr += token[1]
    } else if ( token[0] == 'name' ) {
      // resultStr += token[1]
      // resultStr += data[token[1]]
      // 如果是name类型，那么直接使用它的值，当然要用lookup
      // 因为防止这里是"a.b.c"的有逗号的形式
      resultStr += lookup(data, token[1])
    } else if ( token[0] == '#' ) {
      resultStr += parseArray(token, data)
    }

  }

  console.log('result',resultStr)

}