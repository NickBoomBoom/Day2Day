const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolvePath = src => path.resolve(__dirname, src)

module.exports = {
  mode: 'development', // 开发模式
  entry: {
    main: ['@babel/polyfill', resolvePath('../src/main.js')],
    header: ['@babel/polyfill', resolvePath('../src/header.js')],
  }, // 入口文件
  output: {
    filename: '[name].[hash:8].js', // 打包后的文件名称
    path: resolvePath('../dist'), // 打包后的目录
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolvePath('../public/index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: resolvePath('../public/header.html'),
      filename: 'header.html',
      chunks: ['header']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'] // 从右向左解析原则
    },
    {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析原则
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          fallback: {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:8].[ext]"
            }
          }
        }
      }]
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          fallback: {
            loader: "file-loader",
            options: {
              name: 'media/[name].[hash:8].[ext]'
            }
          }
        }
      }]
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        }
      }]
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      exclude: /node_modules/
    }
    ]
  },
}