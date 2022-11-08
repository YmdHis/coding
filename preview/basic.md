#### 网络相关

[网络相关](https://juejin.cn/post/7016593221815910408#heading-1)


#### 1、函数
+ 1.1 arguments
  arguments是一个包含传入函数中的参数的类数组
  ```js
		function foo() {
				console.log(arguments)
		}
		foo(1,2,3)
		// [Arguments] { '0': 1, '1': 2, '2': 3, callee: ƒ foo(), length: 3, Symbol(Symbol.iterator): ƒ values()}
	```
	>callee 是arguments对象的属性，指向当前执行的这个函数。就是说返回的是正在被执行的function对象
	>callee 表示对函数对象本身的引用，这有利于匿名函数的递归或者保证函数的封装性
	>callee 拥有length属性，arguments.length是实参长度，callee.length是形参长度

	>caller 调用者，调用当前的函数的对象 （代表当前函数在哪个地方被调用）
	```js
	function foo() {
    if (foo.caller == null) {
        console.log ("该函数在全局作用域内被调用!");
    } else
    console.log ("调用我的是函数是" + myq.caller);
	}
 	foo() //该函数在全局作用域内被调用!

	function callFoo() {
		foo()
	}
	callFoo() // 调用我的函数是function callFoo (){}

	```