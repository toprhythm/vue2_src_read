// import { ha } from "./haha.js"
// ha()

// import * as haha from "./haha.js";
// haha.ha()

// alert('haha, i am runing')
// console.log('呵呵呵')
// console.log('123sad')

/**
从这下面开始才是正文代码
**/
// import Scanner from './Scanner.js'
import parseTemplate2Tokens from './parseTemplate2Tokens.js'
import renderTemplate from './renderTemplate.js'
import lookup from './LookUp.js'
window.SSG_TemplateEngine = {
  // render() v1.0
  // render (templateStr, data) {
  //   // console.log('render函数被调用,我们要命令Scanner去工作')
  //   // console.log(123)
  //   // 实例化一个扫描器构造的时候提供一个参数，这个参数就是模板字符串
  //   // 也就是说这个扫描器就是针对这个模板字符串工作的
  //   var scanner = new Scanner(templateStr)

  //   // 测试scanUtil方法
  //   // var words = scanner.scanUtil('{{')
  //   // console.log(words)
  //   // console.log(scanner.pos)
  //   // scanner.scan('{{')
  //   // console.log(scanner.pos)

  //   // 当scanner的指针没有到最后一个字符
  //   while ( !scanner.eos() ) {
  //     // 收集开大括号后面的的尾巴
  //     var word = scanner.scanUtil('{{')
  //     console.log(word)
  //     scanner.scan('{{')

  //     // 收集闭大括号后面的尾巴
  //     var word = scanner.scanUtil('}}')
  //     console.log(word)
  //     scanner.scan('}}')
  //   }

  // }

  // render() v2.0
  render (templateStr, data) {
    // 调用解析模板返回tokens函数，让模板字符串转为tokens数组
    var tokens = parseTemplate2Tokens(templateStr)
    // 调用renderTemplate函数，让tokens数组变为dom字符串
    var domStr = renderTemplate(tokens, data)
    // console.log(tokens)

    // 测试lookup函数 v1.0
    //   lookup({
    //     m: {
    //       n: {
    //         p: 123
    //       }
    //     }
    //   },
    //   'm.n.p'
    //   )



  }
}

