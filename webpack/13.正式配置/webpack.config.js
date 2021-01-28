const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const CssCommonLoader = [
  MiniCssExtractPlugin.loader, // 提取js的css单独成文件
  // 'style-loader', // 创建style标签 将样式放入
  'css-loader', // 将css文件整合到js中
  'postcss-loader',
];
module.exports = {
  mode: 'production',
  //  npx webpack serve 运行
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 8000,
    open: true,
  },
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    // path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /*
      yarn add eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import  --dev
       */
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: '/node_modules/',
        options: {
          fix: true,
        },
      },
      // TODO: js 兼容性处理,babel-loader @babel/preset-env @babel/core
      // promise 等 @babel/polyfill core-js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [[
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: {
                version: 3,
              },
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17',
              },
            }],
          ],
          // plugins: [
          //   [
          //     '@babel/plugin-transform-runtime',
          //     {
          //       corejs: 2,
          //     },
          //   ],
          // ],
        },
      },
      {
        test: /\.css$/,
        use: [...CssCommonLoader],
      },
      {
        test: /\.less$/,
        use: [...CssCommonLoader, 'less-loader'],
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
    // html模板处理
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
    // 提取css
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    // css压缩
    new OptimizeCssAssetsWebpackPlugin(),
  ],

};
