 const path = require('path');

/*
 都可以接受任意个参数
 可以使用 .. ， . 这样的符号
 resolve返回一个绝对路径，join只是把参数拼接成一个路径
 如果最后一层是一个目录。对于resolve而言返回的是这个目录本身，path只是拼接
*/ 

path.resolve('a','b','c')    // E:\coding\src\nodeDemo\a\b\c
path.resolve('..','b','c')   // E:\coding\src\b\c
path.resolve('..','b','c/')  //E:\coding\src\b\c

path.join('a','b','c')   // a\b\c
path.join('a','b','c/')  // a\b\c\


const resolvePath = path.resolve('..','b','c/')
const joinPath = path.join('a','b','c/')


// 文件夹名称
__dirname   //E:\coding\src\nodeDemo

//文件名称
__filename  //E:\coding\src\nodeDemo\path.js

console.log(__dirname)
console.log(__filename)

//文件的后缀
path.extname()
//文件的名字
path.basename()
//文件的目录
path.dirname()