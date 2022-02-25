/*
扫描器类
*/
export default class Scanner {
  
  constructor(templateStr) {
    // console.log('我是Scanner', templateStr)
    this.templateStr = templateStr
    // 指针
    this.pos = 0
    // 指针后的一串内容，别名尾巴，假设指针为 “我” 尾巴是: 买了一个{{thing}},好{{mood}}啊!
    this.tail = templateStr
  }

  // 功能弱，就是走过指定内容,没有返回值 我今天买了{{}}
  scan (tag) {
    if (this.tail.indexOf(tag) == 0) {
      // tag有多长，比如{{长度是2，就让指针后移多少位
      this.pos += tag.length        
      // 尾巴也要变
      this.tail = this.templateStr.substring(this.pos)
    }
  }

  // 让指针进行扫描，一直到遇见指定内容结束，并且能够返回之前路过的文字 thing
  scanUtil (stopTag) {
    // 记录一下开始执行本方法的时候的pos值
    const pos_backup = this.pos
    // ??? 写&&很有必要，防止找不到，还一直不停地找，像个傻篮子一样
    // while (this.tail.indexOf(stopTag) != 0 && this.pos < this.templateStr.length) {
    while (!this.eos() &&  this.tail.indexOf(stopTag) != 0) {
      this.pos++
      // 改变尾巴，从当前指针到后面的最后一个字符
      this.tail = this.templateStr.substring(this.pos)
    }
    return this.templateStr.substring(pos_backup, this.pos)
  }

  // ??? 官方封装了一个方法,返回布尔，代表指针是否已经到了字符串最后一位了
  eos () {
    // 如果大于等与了，就说明到头了
    return this.pos >= this.templateStr.length
  }

}