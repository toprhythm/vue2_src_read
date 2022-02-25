# 01-什么是mustache模板引擎

## 01-引导

模板引擎是数据变为视图最优雅的解决方案

数据:

```
[
	{name: '张三', age:20}
]
```

视图:

```
<div>姓名：张三<div>
<div>年龄：20<div>
```

for (item,index) in list, v-for实际上就是一种模板引擎，类mustache

## 02-历史上曾经出现的数据变为视图的方法

- 纯DOM xx.innerHTML 笨拙

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
    
      <ul id="list">
        <!-- <li>
          <div class="hd"></div>
          <div class="bd">
            <p></p>
            <p></p>
            <p></p>
          </div>
        </li> -->
      </ul>
    
      <script>
        var userList = [
          { "name": "小明", "age": 20, "sex": "男" },
          { "name": "小红", "age": 21, "sex": "女" },
          { "name": "小强", "age": 22, "sex": "男" },
        ]
    
        var list = document.getElementById('list')
    
        for (let i = 0; i < userList.length; i++) {
          // 每遍历一项，都要用DOM方法去创建li标签
          let oLi = document.createElement('li')
          // oLi.innerText = userList[i].name
          // 创建hd这个Div
          let hdDiv = document.createElement('div')
          hdDiv.className = 'hd'
          hdDiv.innerText = userList[i].name + '的基本信息'
          // 创建bd这个Div
          let bdDiv = document.createElement('div')
          bdDiv.className = 'bd'
          // 创建三个P
          let p1 = document.createElement('p')
          p1.innerText = '姓名: ' + userList[i].name
          // 创建的节点是孤儿节点，所以必须上树才能被用户看见
          bdDiv.appendChild(p1)
          let p2 = document.createElement('p')
          p2.innerText = '年龄: ' + userList[i].age
          // 创建的节点是孤儿节点，所以必须上树才能被用户看见
          bdDiv.appendChild(p2)
          let p3 = document.createElement('p')
          p3.innerText = '性别: ' + userList[i].sex
          // 创建的节点是孤儿节点，所以必须上树才能被用户看见
          bdDiv.appendChild(p3)
    
    
          // 创建的节点是孤儿节点，所以必须上树才能被用户看见
          oLi.appendChild(hdDiv)
          // 创建的节点是孤儿节点，所以必须上树才能被用户看见
          oLi.appendChild(bdDiv)
          // 创建的节点是孤儿节点，所以必须上树才能被用户看见
          list.appendChild(oLi)
        }
      </script>
    </body>
    </html>
    ```

  

- 数组join法 旧时代十分流行，现在很少

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
      
    <ul id="list"></ul>
    
    <script>
      // Invalid or unexpected token
      // var str = '
      // asd
      // fd;sd
      // '
    
      // 反引号 但是是es6
      // var str = `
      // asflkl;df
      // ds;lfkl;sdfk
      // dfgkl;fd
      // `
    
      // 数组join
      // var str = [
      // // ？？？ 能换行了
      //   'A',
      //   'B',
      //   'C',
      //   'D'
      // ]
      // console.log( str.join('') )// ABCD
    
      // 循序渐进,很神奇!! 能想出这种方法的人是人才，join到一起是没有换行，但是人阅读的时候是有换行的感觉的，很神奇!!,还可以斩断连接
      var userList = [
        { "name": "小明", "age": 20, "sex": "男" },
        { "name": "小红", "age": 21, "sex": "女" },
        { "name": "小强", "age": 22, "sex": "男" },
      ]
    
      var list = document.getElementById('list')
    
      // 遍历用户数组，每遍历1项，就以字符串的视角将HTML字符串添加到list中
      // 斩断连接大法好!!!
      for (let i = 0; i < userList.length; i++) {
        list.innerHTML += [
                            '<li>',
                            '  <div class="hd">'+ userList[i].name +'的信息</div>',
                            '  <div class="bd">',
                            '    <p>姓名：'+ userList[i].name +'</p>',
                            '    <p>年龄: '+ userList[i].age +'</p>',
                            '    <p>性别：'+ userList[i].sex +'</p>',
                            '  </div>',
                            '</li>',
                          ].join('') 
      }
    
      // var str = [
      //   '<li>',
      //   '  <div class="hd"></div>',
      //   '  <div class="bd">',
      //   '    <p>姓名：</p>',
      //   '    <p>年龄: </p>',
      //   '    <p>性别：</p>',
      //   '  </div>',
      //   '</li>',
      // ].join('') 
      // console.log( str )
      
    </script>
    
    </body>
    </html>
    ```

  

- ES6的反引号法: 现在最常用的，url: \`/user/${userId}`

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
    
    <ul id="list"></ul>
    
    <script>
        var userList = [
          { "name": "小明", "age": 20, "sex": "男" },
          { "name": "小红", "age": 21, "sex": "女" },
          { "name": "小强", "age": 22, "sex": "男" },
        ]
    
        var list = document.getElementById('list')
    
        // 遍历用户数组，每遍历1项，就以字符串的视角将HTML字符串添加到list中
        // 斩断连接大法好!!!
        for (let i = 0; i < userList.length; i++) {
          list.innerHTML += `
                              <li>
                                <div class="hd"> ${userList[i].name}的信息 </div>
                                <div class="bd">
                                  <p>姓名: ${userList[i].name} </p>
                                  <p>年龄: ${userList[i].age} </p>
                                  <p>性别: ${userList[i].sex} </p>
                                </div>
                              </li>
                            `
        }
    </script>
    
    </body>
    </html>
    ```

  

- 模板引擎 解决变为视图的最优雅的方法

- http://github.com/janl/mustache.js

- www.bootcdn.cn

- Mustache.render(templateStr, data)



- 04-mustache的基本使用-循环对象数组

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

<div id="container"></div>
  
<script src="./lib/mustache.js"></script>
<script>
  // console.log( Mustache )
  /*
      Object
      Context: ƒ Context(view, parentContext)
      Scanner: ƒ Scanner(string)
      Writer: ƒ Writer()
      clearCache: ƒ clearCache()
      escape: ƒ escapeHtml(string)
      name: "mustache.js"
      parse: ƒ parse(template, tags)
      render: ƒ render(template, view, partials, tags)
      tags: (2) ['{{', '}}']
      templateCache: （…）
      version: "4.0.1"
      get templateCache: ƒ templateCache()
      set templateCache: ƒ templateCache(cache)
      [[Prototype]]: Object
  */

  var templateStr = `
    <ul>
      {{#userList}}
      <li>
        <div class="hd"> {{name}}的信息 </div>
        <div class="bd">
          <p>姓名: {{name}} </p>
          <p>年龄: {{age}} </p>
          <p>性别: {{sex}} </p>
        </div>
      </li>
      {{/userList}}
    </ul>
  `
  
  let data = {
    userList: [
      { "name": "小明", "age": 20, "sex": "男" },
      { "name": "小红", "age": 21, "sex": "女" },
      { "name": "小强", "age": 22, "sex": "男" },
    ]
  }
  var domStr = Mustache.render(templateStr, data)
  // console.log( domStr )
  var container = document.getElementById('container')
  container.innerHTML = domStr

</script>

</body>
</html>
```

- 05-mustache基本使用-不循环

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

<div id="container"></div>
  
<script src="./lib/mustache.js"></script>
<script>
  var templateStr = `
    <div>我买了一个{{thing}},我很{{mood}}啊</div>
  `
  
  let data = {
    thing: '华为手机',
    mood: '开心'
  }
  var domStr = Mustache.render(templateStr, data)
  // console.log( domStr )
  var container = document.getElementById('container')
  container.innerHTML = domStr

</script>

</body>
</html>
```

- 06-mustache循环简单数组

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <!--  简单数组就是类似于 [0,1,2,3] -->
<div id="container"></div>
  
<script src="./lib/mustache.js"></script>
<script>
  var templateStr = `
    <ul>
      {{#arr}}
        <li>{{.}}</li>
      {{/arr}}
    </ul>
  `
  
  let data = {
    arr: ['A', 'B', 'C', 'D', 'E']
  }
  var domStr = Mustache.render(templateStr, data)
  // console.log( domStr )
  var container = document.getElementById('container')
  container.innerHTML = domStr

</script>

</body>
</html>
```

- 07-mustache数组的嵌套情况

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <!--  简单数组就是类似于 [0,1,2,3] -->
<div id="container"></div>
  
<script src="./lib/mustache.js"></script>
<script>
  var templateStr = `
    <ul>
      {{#arr}}
        <li>
          {{name}}的爱好是:
          <ol>
            {{#hobbies}}
              {{.}}
            {{/hobbies}}
          </ol>
        </li>
      {{/arr}}
    </ul>
  `
  
  let data = {
    arr: [
      {"name": "小明", "age": 20, "hobbies": ["游泳","羽毛球"]},
      {"name": "小红", "age": 22, "hobbies": ["听歌","游戏"]},
      {"name": "小强", "age": 25, "hobbies": ["建模"]}
    ]
  }
  var domStr = Mustache.render(templateStr, data)
  // console.log( domStr )
  var container = document.getElementById('container')
  container.innerHTML = domStr

</script>

</body>
</html>
```

- 08-mustache基本使用-布尔值

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <!--  简单数组就是类似于 [0,1,2,3] -->
<div id="container"></div>
  

<script type="text/tamplate">
  asdjjklasf
  sdfkljkldfs
  dskfljlksd
</script>
<script src="./lib/mustache.js"></script>
<script>
  var templateStr = `
    {{#m}}
      <h1>你好</h1>
    {{/m}}
  `
  
  let data = {
    m: true,
    // m: false
  }
  var domStr = Mustache.render(templateStr, data)
  // console.log( domStr )
  var container = document.getElementById('container')
  container.innerHTML = domStr

</script>

</body>
</html>
```

- 09-script模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

<div id="container"></div>

<script type="text/tamplate" id="mytemplate">
  <ul>
      {{#userList}}
      <li>
        <div class="hd"> {{name}}的信息 </div>
        <div class="bd">
          <p>姓名: {{name}} </p>
          <p>年龄: {{age}} </p>
          <p>性别: {{sex}} </p>
        </div>
      </li>
      {{/userList}}
    </ul>
</script>
<script src="./lib/mustache.js"></script>
<script>

  var templateStr = document.getElementById('mytemplate').innerHTML

  let data = {
    userList: [
      { "name": "小明", "age": 20, "sex": "男" },
      { "name": "小红", "age": 21, "sex": "女" },
      { "name": "小强", "age": 22, "sex": "男" },
    ]
  }
  var domStr = Mustache.render(templateStr, data)
  // console.log( domStr )
  var container = document.getElementById('container')
  container.innerHTML = domStr

</script>

</body>
</html>
```

- 10 正则表达式简单填充

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  
<script>
  var templateStr = '<h1>我买了一个{{thing}}, {{mood}}啊</h1>'

  var data = {
    thing: "白菜",
    mood: "高兴`"
  }

  // 这样只能替换第一个 匹配项
  // console.log( '我爱尚硅谷, 我也爱打篮球'.replace('我', '你') )

  // 替换所有匹配项
  // console.log( '我爱尚硅谷, 我也爱打篮球'.replace(/我/g, '你') )

  // 高级写法
  // console.log( '我爱尚硅谷, 我也爱打篮球'.replace(/我/g, function ( a,b,c ) {
  //   // 我 0 我爱尚硅谷, 我也爱打篮球
  //   // 我 7 我爱尚硅谷, 我也爱打篮球
  //   console.log( a,b,c )
  //   return '它'// 它爱尚硅谷, 它也爱打篮球
  // }) )

  // 解决我们的需求
  // console.log( templateStr.replace(/\{\{(\w+)\}\}/g, function ( findStr,resultStr,resultIndex,metaStr ) {
  //   console.log( findStr )
  //   console.log( resultStr )
  //   console.log( resultIndex )
  //   console.log( metaStr )
  //   return '☆'
  // }) )
//   {{thing}}
// 10-正则表达式简单填充模板.html:34 thing
// 10-正则表达式简单填充模板.html:35 9
// 10-正则表达式简单填充模板.html:36 <h1>我买了一个{{thing}}, {{mood}}啊</h1>

  // console.log( templateStr.replace(/\{\{(\w+)\}\}/g, function ( findStr,$1 ) {
  //   return data[$1]// thing
  // }) )

function render( templateStr, data ) {
  return templateStr.replace(/\{\{(\w+)\}\}/g, function ( findStr,$1 ) {
    return data[$1]// thing
  })
}

var result = render(templateStr, data)
console.log( result )


</script>

</body>
</html>
```



## 03-什么是tokens

- tokens是一个js嵌套数组，说白了，就是模板字符串js表示
- 他是“ast抽象语法树”“虚拟dom节点”等等的开山鼻祖
- 模板字符串 `h1 我买了一个{{thing}}，好{{mood}}啊 /h1`
- tokens

```shell
[
	["text", "<h1>我买了一个"],
	["name", "thing"],
	["text", "好"],
	["name", "mood"],
	["text", "啊"]
]
```

---

- 嵌套更深的tokens {{#arr}} {{.}}  {{/arr}}

```
[
	["text", "div ul"],
	["#", "arr", [
		["text","<li>"],
		["name", "."],
		["text", "</li>"]
	]],
	["text", "ul div"]
]
```



## 04-底层tokens思想

- 修改4.0.1版本的mustache.js的第256行，

```
   if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    var tokens = nestTokens(squashTokens(tokens));

    console.log(tokens)

    return tokens
```

- html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  
<script src="./lib/mustache.js"></script>
<script>
  var templateStr = `
    <ul>
      {{#userList}}
      <li>
        <div class="hd"> {{name}}的信息 </div>
        <div class="bd">
          <p>姓名: {{name}} </p>
          <p>年龄: {{age}} </p>
          <p>性别: {{sex}} </p>
        </div>
      </li>
      {{/userList}}
    </ul>
  `
  Mustache.render(templateStr, {})
  //  [Array(4), Array(6), Array(4)]
//   0: "text"
// 1: "      <li>\n        <div class=\"hd\"> "
// 2: 30
// 3: 66

</script>

</body>
</html>
```

- 查看log



## 05-配置webpack开发环境

```
webpack: 4.44.2
webpack-cli: 3.3.12
webpack-dev-server: 3.11.0
```

webpack-config.js

```js
const path = require('path')

module.exports = {
  // 模式，开发
  mode: 'development',
  // 入口
  entry: './src/index.js',
  // 打包到什么文件
  output: {
    filename: 'bundle.js'
  },
  // 配置开发服务器
  devServer: {
    // 静态文件路径
    contentBase: path.join(__dirname, "www"),
    // 是否enable压缩
    compress: false,
    // 服务器端口
    port: 8080,
    // 虚拟打包的路径，bundle文件没有真的生成
    publicPath: "/xuni/"
  }
}
```

- cd SSG-TemplateEngine
- npm i -D webpack@4 webpack-dev-server@3
- webpack.config.js
- npm i -g webpack-dev-server@3
- npm i -D webpack-cli@3
- ​    "dev": "webpack-dev-server"
- npm run dev
- src/haha.js

```js
// import { ha } from "./haha.js"
// ha()

import * as haha from "./haha.js";
haha.ha()

// alert('haha, i am runing')
console.log('呵呵呵')
console.log('123sad')


```

- src/index.js

```js
// import { ha } from "./haha.js"
// ha()

import * as haha from "./haha.js";
haha.ha()

// alert('haha, i am runing')
console.log('呵呵呵')
console.log('123sad')
```





