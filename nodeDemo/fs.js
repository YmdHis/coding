const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, './text');

// 异步读取文件
fs.readFile(pathToFile, 'utf-8', function(err, result) {
  if(err) {
    // console.log('error',err)
    return err;
  }
  // console.log('result', result);
})

//同步的读取文件 
const fileContent = fs.readFileSync(pathToFile, 'utf-8')
// console.log(fileContent)

//把接受的函数变为promise
function promisify(func) {
  return function (...args) {
    return new Promise((resolve, rejet) => {
      args.push(function(err, result){
        if (err) return rejet(err);
        return resolve(result)
      })
      return func.apply(func, args)
    })
    
  }
}

const readFileAsync = promisify(fs.readFile)
readFileAsync(pathToFile, 'utf-8').then(res=>{
  console.log(res)
}).catch(err => {
  console.log(err)
})