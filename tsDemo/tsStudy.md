
## 类型别名  type  用来给类型起一个新名字
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

## 接口 interface  定义对象的类型

简单的例子如下：定义了一个Person接口，然后定义了一个变量tom的类型是Person。
这样就约束了tom的形状必须和Person一致。定义的变量比接口少一些或者多一些参数都是不允许的。

```ts
interface Person {
  name: string,
  age: number
}

let tom: Person = {
  name:'tom',
  age: 2
}

let amy: Person = {
  //Type '{ name: string; age: number; sex: string; }' is not assignable to type 'Person'.
  name: 'amy',
  age: 3,
  sex: 'male'
}
```

## 类实现接口

用 implements 关键字来实现

```ts
interface IPoint {
  x: number,
  y: number,
  drawPoint: () => void,
  getDistances: (p:IPoint) => number
}

class Point implements IPoint {
  x: number;
  y: number;
  drawPoint = () => {
    //todo
  };
  getDistances = (p: IPoint) =>{
    //todo
    return 1;
  };
  getName = () =>{
    return 'name'
  }
}
```

## type 和 interface的异同

用interface描述数据结构，用type描述类型

1、都可以描述一个对象或者函数
```ts
interface User {
  name: string,
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}

type User = {
  name: string,
  age: number
}

type SetUser = (name: string, age: number) => void;
```

2、都允许拓展（extends）
interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。
```ts
// interface extends interface
interface Name { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

// type extends type
type Name = { 
  name: string; 
}
type User = Name & { age: number  };

// interface extends type
type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

// type extends interface
interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

3、只有type可以做的

type 可以声明基本类型别名，联合类型，元组等类型

```ts
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

// type 语句中还可以使用 typeof 获取实例的 类型进行赋值
let div = document.createElement('div');
type B = typeof div
```

4、只有interface可以做的

interface可以声明合并

```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

## 泛型 

不预先指定具体的类型，而在使用的时候再指定类型的一种特性

可以把泛型理解为代表类型的参数

```ts
interface Test<T = any> {
    userId: T;
}

type TestA = Test<string>;
type TestB = Test<number>;

const a: TestA = {
    userId: '111',
};

const b: TestB = {
    userId: 2222,
};

```

泛型约束  定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。
```ts
interface ILengthwise {
  length: number
}

function loggingIdentity<T extends ILengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity(3);  //Argument of type 'number' is not assignable to parameter of type 'ILengthwise'
loggingIdentity({length: 10, value: 3});
```

## 可选属性

如果希望不要完全匹配一样的形状，可以使用可选属性
可选属性的含义：该属性可以存在也可以不存在
```ts
interface Car {
  door: number,
  window?: string,
}

let car1: Car = {
  door: 2
}
let car2: Car = {
  door: 1,
  window: 'six',
}
```

## 任意属性
有时候希望一个接口有任意的属性
```ts
interface Animal {
  name: string,
  [sonmeThing: string]: any
}

let dog: Animal = {
  name: 'dog',
  age: 2
}

let cat: Animal = {
  name: 'cat',
  eat: 'fish'
}

//需要注意的是，如果一旦使用了任意属性，那么可选属性和确定属性的类型都必须是任意属性的类型的子集。
//以下，任意属性中允许的类型是sting，而可选属性age的类型是number，所以报错。

interface IAnimal {
  //Property 'age' of type 'number' is not assignable to string index type 'string'
  name: string,
  age?: number,
  [someThing: string]: string
}

//一个接口中只能定义一个任意属性，如果接口中有多个类型的属性，可以使用联合类型:
interface NewAnimal {
  name: string,
  age?: number,
  [someThing: string]: string | number
}
```
## Readonly
Readonly<T> 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。


## Exclude
Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
```ts
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
```

## Extract
Extract<T, U> 的作用是从 T 中提取出 U。
```ts
type T2 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T3 = Extract<string | number | (() => void), Function>; // () => void
```


## keyof

keyof 取 interface 的键

```ts
interface Point {
    x: number;
    y: number;
}

// type keys = "x" | "y"
type keys = keyof Point;
```

## 基于一个已有的类型，扩展出一个大部分内容相同，有部分区别的类型

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: number;
  age: number;
  name: string;
};

// 相当于: type PartialUser = { id?: number; age?: number; name?: string; }
type PartialUser = Partial<User>

// 相当于: type PickUser = { id: number; age: number; }
type PickUser = Pick<User, "id" | "age">

//相当于 type PickUser = { id: number; name: string; }
type WithoutSex = Omit<User, 'age'>;
```