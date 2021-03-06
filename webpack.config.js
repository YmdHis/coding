const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {  // 入口文件
    app: './src/index.ts',
  },
  output: {  // 编译打包后的文件名及所在路径
    filename: '[name].bundle.js',  // 打包输出的文件名字
    path: path.resolve(__dirname, './dist')  // 输出路径
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
    open: false,
    hot: true,
    quiet: true,
    port: 9000,
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
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [// 插件
    new HtmlWebpackPlugin({
      title: 'hello world',
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(), // 打包前移除/清理 打包目录
    new friendlyErrorsWebpackPlugin(), // 命令行提示友好工具
  ],
}