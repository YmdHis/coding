### this

#### this是在运行时绑定，并不是在编写时绑定，他的上下文取决于运行时的条件。this的绑定和函数声明的位置没有关系，只取决于函数的调用方式。

##### 隐式绑定
```js
a= {
  aa:'123',
  foo () {
    this.fn(function () {
      console.log('foo',this)
    })
  },
  fn (cb){
    cb()
  },
  bar () {
    console.log('bar', this);
    let baz = function () {
      console.log('baz', this)
    }
    baz()
  }
}
```
a.bar() 
调用时，bar的执行上下文是在a中,bar中的this被绑定到a
bar中的baz调用时，baz指向的函数是一个不带任何修饰的函数调用，baz是指向window的。

a.foo()
fn中的参数是一个匿名函数，应用默认绑定，绑定到了window

当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。
* 隐式丢失
一个常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是它会应用默认绑定，把this绑定到window或者undefined上，取决于是否严格模式。
参数传递也是一种隐式赋值，当传入参数的时候也会被隐式赋值。


##### 箭头函数
```js
const a1 = {
  text: '111',
  fn: () => {
    console.log('a1fn',this)
    console.log(this.text)
  }
}
const a2 = {
  text: '222',
  fn: function (){
    let bar = () =>{
      console.log('barthis',this)
    }
    bar()
    let foo = a1.fn
    foo()
  }
}
a2.fn()
```

* 箭头函数体内的this对象，就是定义该函数时所在的作用域指向的对象，而不是使用时所在的作用域指向的对象。

a2.fn()
调用时，fn 的执行上下文是 a2，fn 中的 this 绑定到 a2 。
箭头函数 bar 定义在 a2 -> fn 中。所以 bar 中的 this 要绑定到 fn 的作用域指向的对象，也就是 a2 。

定义 foo = a1.fn 。
a1.fn 是一个箭头函数，a1.fn 中的 this 要绑定到 a1 的作用域指向的对象，也就是 window

