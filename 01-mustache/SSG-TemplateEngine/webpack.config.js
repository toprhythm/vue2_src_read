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