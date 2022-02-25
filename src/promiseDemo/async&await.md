# async await

## 返回promise对象
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

``` js
  async function fn() {
    const info = await getInfo();
    const list = await getList(info);
    return list
  }

  fn().then(res => {
    console.log(res)
  })
```
上面的例子中 fn 前面有关键字 async，表明函数内部有异步操作。调用该函数，会立即返回一个 promise 对象

## promise对象的状态变化
async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变

## await命令
正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

``` js
async function f() {
  return await 123;
  // 等价于 return 123;
}

f().then(res => {
  console.log(res) // 123
})
```
另外一种情况是 await后面是一个定义的then方法的对象，那么await会将其等同于promise对象。
```js
class Sleep{
  constructor(timeout) {
    this.timeout = timeout;
  }

  then(resolve, reject) {
    const startTime = new Date();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    )
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime)
})()
```


## 错误处理
* 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
* 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
* 防止出错的办法，可以将await语句放在try...catch中，或者是对await后的promise对象再加一个catch方法

1、使用try catch 实现多次重复尝试

``` js
  async function fn() {
    const nums = 3;
    for(let i =0 ;i< nums; i++>){
      try{
        const res = await request()
        break;
      }catch (err){

      }
    }
  }
```
当request失败时，会被 catch 捕获，然后再次循环，直到三次。
当request成功时，会执行 break 跳出循环

2、一个简化的sleep的实现
```js
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve,interval)
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();
```


