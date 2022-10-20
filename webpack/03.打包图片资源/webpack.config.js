const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // ! 处理不了 html 中的img标签文件
        test: /\.(jpg|png|gif)$/,
        // url-loader file-loader ; url-loader 依赖于 file-loader
        loader: 'url-loader',
        options: {
          // 图片小于8kb,base64
          limit: 8 * 1024,
          // ! url-loader 默认使用es6 模块化解析,html-loader 默认使用commonjs
          esModule: false,
          name:'[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        // ! 处理html中的img 图片; 负责引入img,从而能被url-loader处理
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}