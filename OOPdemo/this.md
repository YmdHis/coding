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
+ 使用另一个变量来给函数取别名
+ 将函数作为参数传递时会被隐式赋值，回调函数丢失this绑定
+ 如果你把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题，且与包裹着它的函数的this指向无关。在非严格模式下，会把该函数的this绑定到window上，严格模式下绑定到undefined。


#### 显示绑定
call apply bind
如果 foo.bind(obj1).call(obj2)   只取第一个显示绑定的，后面的都无效


#### new 绑定
使用new来调用Person，构造了一个新对象person1并把它(person1)绑定到Person调用中的this。
```js
function Person (name) {
  this.name = name
}
var name = 'window'
var person1 = new Person('LinDaiDai')
console.log(person1.name)
```

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

```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
```

上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。
* 这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域*。