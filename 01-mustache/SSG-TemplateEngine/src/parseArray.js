import lookup from './LookUp.js'
import renderTemplate from './renderTemplate.js'
/*
  处理数组，结合renderTemplate实现递归
  // 这个函数收的参数是token，不是tokens
  就是一个简单地 ['#', 'students', []]

  千万别蒙圈，调用的次数由data决定
  比如data是这样的
  var data = {
      students: [
        { 'name': '小明', 'hobbies': ['游泳', '足球'] },
        { 'name': '小红', 'hobbies': ['游泳', '听歌'] },
        { 'name': '小强', 'hobbies': ['游泳', '画画'] },
      ]
    }
  那么parseArray函数就要递归调用renderTemplate3次，因为数组长度是3
*/
export default function parseArray ( token, data ) {
  console.log(token, data)

  // 得到这个数据中要使用的部分
  // 结果字符串 

  var v = lookup(data, token[1])
  var resultStr = ''
  // 遍历v
  // ???这个循环是整个模板引擎代码中最难的
  for (let i = 0; i < v.length; i++) {
    resultStr += renderTemplate(token[2], v[i])
  }
  return resultStr

  return '哈哈我是数组'
}