const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    // path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取js的css单独成文件
          // 'style-loader', // 创建style标签 将样式放入
          'css-loader', // 将css文件整合到js中
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader, // 提取js的css单独成文件
          'css-loader',
          'postcss-loader',
          'less-loader',

        ],
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
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
        },
      },
      {
        test: /\.html$/,
        // ! 处理html中的img 图片; 负责引入img,从而能被url-loader处理
        loader: 'html-loader',
      },

      // TODO: 打包其他资源
      {
        exclude: /\.(css|js|html|less)$/, // 排除已处理资源
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],

  // TODO: devServer   npx webpack serve 运行
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 8000,
    open: true,
  },
};
