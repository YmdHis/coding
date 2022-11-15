### 手写实现简单new


```js
function _new(constructor, ...args) {
  let obj = Object.create(constructor.prototype) ;
  let res = constructor.apply(obj, args)
  return res instanceof Object ? res : obj
}

function car(name){
  this.name = name
}
let foo = _new(car,'aaa')
```

new的步骤
* 创建一个对象，把对象的_proto_指向构造函数的prototype
* 构造函数的this绑定到这个对象的执行上下文，执行构造函数


以上res是构造函数执行的结果；默认情况下构造函数是没有返回值的，返回的内容为新增的obj对象；
如果构造函数有返回值，并且返回值是object类型，则new实现的结果为该返回值；
如果构造函数有返回值，但是返回值不是object类型，则new实现的结果为新建的obj。