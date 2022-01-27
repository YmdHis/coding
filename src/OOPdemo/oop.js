function foo (){
  const _isClass = this instanceof foo;
  if(!_isClass){
    return new foo()
  }
  this.name = 'cxh'
}



function Foo (){}
const fun = new Foo()

/*
 new的作用

 1、创建了一个空对象，作为返回的实例
 2、将生成的空对象的_proto_属性指向了构造函数的原型对象prototype
 3、将当前实例对象赋给了内部this
 4、执行构造函数初始化代码

*/

/*
  constructor

  fun.constructor只是通过默认的 [[Prototype]] 委托指向 Foo，这和“构造”毫无关系。
  举例来说，Foo.prototype 的 .constructor 属性只是 Foo 函数在声明时的默认属性。
  如果你创建了一个新对象并替换了函数默认的 .prototype 对象引用，那么新对象并不会自动获得 .constructor 属性。
*/

function Foo() { /* .. */ }
Foo.prototype = { /* .. */ }; // 创建一个新原型对象
var a1 = new Foo();
a1.constructor === Foo; // false!
a1.constructor === Object; // true!

/**
  a1 并没有 .constructor 属性，所以它会委托 [[Prototype]] 链上的 Foo.
  prototype。但是这个对象也没有 .constructor 属性（不过默认的 Foo.prototype 对象有这
  个属性！），所以它会继续委托，这次会委托给委托链顶端的 Object.prototype。这个对象
  有 .constructor 属性，指向内置的 Object(..) 函数。
 */


/**
  继承
*/

function Game(){
  this.name = 'lol';
}
Game.prototype.getName = function (){
  return this.name;
}

function LOL() {}
LOL.prototype = new Game();
LOL.prototype.constructor = LOL;
const game = new LOL();

// 本质： 重写原型对象，将父对象的属性方法，作为子对象原型对象的属性和方法 
//缺点：1、父类的属性一旦赋值给子类的原型属性，会属于子类的共享。 2、实例化子类时，不能向父类传参

//构造函数继承
//经典继承：在子类构造函数内部调用父类构造函数

function Game(){
  this.name = 'lol';
}
Game.prototype.getName = function (){
  return this.name;
}

function LOL() {
  Game.call(this);
}
const game = new LOL();

//缺点：原型链上的共享方法无法被读取继承

//组合继承
function Game(){
  this.name = 'lol';
}
Game.prototype.getName = function (){
  return this.name;
}

function LOL() {
  Game.call(this)
}
//使用现有的对象来提供新创建对象的__proto__
LOL.prototype = Object.create(Game.prototype);
LOL.prototype.constructor = LOL;
const game = new LOL();