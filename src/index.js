/* 
  第一次对 b 进行 RHS 查询时是无法找到该变量的。
  因为在任何相关的作用域中都无法找到它。
  如果 RHS 查询在所有嵌套的作用域中遍寻不到所需的变量，引擎就会抛出 ReferenceError异常。

  当引擎执行 LHS 查询时，如果在顶层（全局作用域）中也无法找到目标变量，
  全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎，前提是程序运行在非“严格模式”下。
*/

// function foo(a) {
// 	console.log( a + b ); //ReferenceError
// 	b = a;
// }
// foo(2);


/* 
  引擎执行 console.log() 声明，并查找 a、b 和 c 三个变量的引用。
  它首先从最内部的作用域，也就是 bar(..) 函数的作用域气泡开始查找。
  引擎无法在这里找到 a，因此会去上一级到所嵌套的 foo(..) 的作用域中继续查找。
  在这里找到了 a，因此引擎使用了这个引用。对 b 来讲也是一样的。
  而对 c 来说，引擎在 bar(..) 中就找到了它。
*/

// function foo(a) {
//   var b = a * 2;
//   function bar(c) {
//   console.log( a, b, c );
//   }
//   bar( b * 3 );
//   }
//   foo( 2 ); // 2, 4, 12



/* 变量提升 
 函数声明和变量声明都会被提升，但是是函数会首先被提升，然后才是变量。
*/

// foo(); // 1
// var foo;
// function foo() {
// console.log( 1 );
// }
// var foo = function() {
// console.log( 2 );
// }

//这段代码编译器理解如下
// function foo() {
//   console.log( 1 );
// }
// foo( ); //1
// foo = function() {
//   console.log(2);
// }


// console.log(typeof a); // function 函数提升在变量之前
// var a=2;
// function a() {
//     console.log(3);
// }
// //声明完成之后才是赋值操作 a=2，所以此时a的类型是number
// console.log(typeof a); // number



// 闭包
// function foo() {
//   var a = 2;
//   function baz() {
//     console.log( a ); // 2
//   }
//   bar( baz );
// }
// function bar(fn) {
//   fn();
// }
// foo()

// function foo(a) {
//   b = a;
//   console.log( a + b );

//   }
//   foo( 2 );

// let name = 'the window'
// let obj = {
//   name: 'the obj',
//   getNameFunc: function(){
//     console.log('---',this)
//     return function(){
//       return this
//     }
//   }
// }
// console.log(obj.getNameFunc()())


//为了模块的定义引入了包装函数（可以传入任何依赖），并且将返回值，也就是模块的 API，储存在一个根据名字来管理的模块列表中
//"foo" 和 "bar" 模块都是通过一个返回公共 API 的函数来定义的。"foo" 甚至接受 "bar" 的示例作为依赖参数，并能相应地使用它。

// var MyModules = (function Manager() {
//   var modules = {};
//   function define(name, deps, impl) {
//     for (var i=0; i<deps.length; i++) {
//       deps[i] = modules[deps[i]];
//     }
//     modules[name] = impl.apply( impl, deps );
//   }
//   function get(name) {
//     return modules[name];
//   }
//   return {
//     define: define,
//     get: get
//   };
// })()

// MyModules.define( "bar", [], function() {
//   function hello(who) {
//     return "Let me introduce: " + who;
//   }
//   return {
//     hello: hello
//   };
// });
// MyModules.define( "foo", ["bar"], function(bar) {
//   var hungry = "hippo";
//   function awesome() {
//     console.log( bar.hello( hungry ).toUpperCase() );
//   }
//   return {
//     awesome: awesome
//   };
// });

// var bar = MyModules.get( "bar" );
// var foo = MyModules.get( "foo" );
// console.log(bar.hello( "hippo" )); // Let me introduce: hippo
// foo.awesome();


//词法作用域意味着作用域是由书写代码时函数声明的位置来决定的
// function foo() {
//   console.log( a ); // 2
// }
// function bar() {
//   var a = 3;
//   foo();
// }
// var a = 2;
// bar()



//this

global.count = 0;
function foo(num) {
  console.log( "foo: " + num );
  this.count++;
  console.log(this)
}
// foo.count = 0;
var i;
for (i=0; i<10; i++) {
  if (i > 5) {
    foo( i );
  }
}
console.log(global.count)

//在浏览器环境下 打印2，因为a定义在全局作用域中，就是全局对象的一个同名属性（非严格模式下）
var a = 2;
function foo(){
  console.log('a',this.a)
}
foo()