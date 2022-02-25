// 
const path = require('path');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 虚拟打包路径
    publicPath: 'xuni',
    // 打包文件,不会物理生成，网络 /xuni/bundle.js
    filename: 'bundle.js'
  },
  devServer: {
    // 端口号
    port: 8080,
    // 静态资源文件夹
    contentBase: 'www'
  }
};