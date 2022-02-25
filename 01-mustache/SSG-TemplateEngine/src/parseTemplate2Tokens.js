import Scanner from './Scanner.js'
import nestTokens from './nestTokens.js'

/*
  将模板字符串转为tokens数组
*/
export default function parseTemplate2Tokens ( templateStr ) {
    var tokens = []
    // 创建扫描器
    var scanner = new Scanner(templateStr)
    var words
    // 让扫描器扫描
    while ( !scanner.eos() ) {
      // 收集左边的双大括号之前的str
      words = scanner.scanUtil('{{')
      // 存起来
      // 安全校验，如果words非空，再存，因为有可能返回空
      if ( words!='' ) {
        tokens.push(['text', words])
      }
      // 略过左双大括号
      words = scanner.scan('{{')
      // 收集右边的双大括号之前的keyword, username...
      words = scanner.scanUtil('}}') 
      // 存起来
      if ( words!='' ) {
        // 这个words就是{{}}中间的东西，因为下标为0的项是 "#"
        if ( words[0] == '#' ) {
          tokens.push(['#', words.substring(1)])
        } else if ( words[0] == '/' ) {
          tokens.push(['/', words.substring(1)])
        } else {
          tokens.push(['name', words])
        }
      }
      // 略过右双大括号
      words = scanner.scan('}}')
    }
    return nestTokens(tokens)
}