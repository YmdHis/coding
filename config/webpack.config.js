const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {  // 入口文件
    app: './src/app.js',
  },
  output: {  // 编译打包后的文件名及所在路径
    filename: 'js/budle.js',  // 打包输出的文件名字
    path: path.resolve(__dirname, '../dist')  // 输出路径
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [// 插件
    new HtmlWebpackPlugin({
      title: 'hello world',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(), // 打包前移除/清理 打包目录
    new friendlyErrorsWebpackPlugin(), // 命令行提示友好工具
  ],
}