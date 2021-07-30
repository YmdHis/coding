# babel

## 什么是babel

主要用来将ECMAScript 2015+版本的代码转换为向后兼容的语法，以便能够运行在当前或者旧版本的浏览器中。

## 使用方法

### 1、在命令行中使用

在项目中执行
```
npm i @babel/core @babel-cli -D
```
安装之后就可以在package.json的scripts中执行babel脚本命令。如下是使用babel编译src文件夹中的内容。
```
"babelBu": "babel src -d dist"
```

### 2、在webpack中使用
在webpack中使用babel需要安装 babel-loader
```
npm i @babel/core babel-loader -D
```
然后在webpack.config.js中配置需要用babel来处理的文件。
```
// webpack.config.js
// ...
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
```
#### 配置
光是安装了babel是没有用的，需要去配置来配置babel的工作。
新建babel.config.js文件，或者是新建.babelrc文件或者babelrc.js
babel.config.js文件一般是新建在项目根目录下，作用范围是项目全局。.babelrc/babelrc.js的作用范围是针对文件夹的。即该配置所在的文件夹以及子文件夹都会应用配置。而且下层配置文件会覆盖上层配置文件的规则。如果把.babelrc/babelrc.js文件建在项目根目录下，那效果和babel.config.js的效果一样。如果两种文件都存在，那么.babelrc会覆盖babel.config.js的配置。

需要在配置文件中引入对应的插件（Plugins）来告诉babel需要编译哪些。
所以，如果一个一个去引入对应的插件来进行编译是很麻烦的。
babel推出了一个babel-env预设，只要安装这一个preset，就会根据你设置的目标浏览器，自动将代码中的新特性转换成目标浏览器支持的代码。
```
npm i @babel/preset-env -D
```
```
// babel.config.js
// 此处设置的目标浏览器是支持chrome58
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58'
        }
      }
    ]
  ]
};
```
###### 注意1：即使不设置targes，也会有一个默认值，规则为 > 0.5%, last 2 versions, Firefox ESR, not dead。

**https://juejin.cn/post/6844903858632654856#heading-6**