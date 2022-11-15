#### vue diff算法

* [详解diff算法](https://juejin.cn/post/6844903607913938951)


#### 1.写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？为什么说不能使用Index作为key

+ 不写key
在比较新老两个节点的时候，会判断是同一个节点，因为key都是undefined，所以不会重新创建和删除节点，所以可能在某种程度(创建和删除节点方面)上有渲染性能上的提升。但是只是针对无状态的组件，对于有状态的组件，如果复用可能会出现一些Bug。

+ 写key
因为有了key，而有了唯一的标识，能找到相同的key的话就复用，找不到就增加或者删除。

+ key的作用是为了在Diff算法执行的时候更快的找到对应的节点，提高diff的速度


+ 用index作为key时，在对数据进行一些破坏顺序的操作时，会产生没必要的dom更新，从而导致效率降低。
   当我们在前面加了一条数据时，index的顺序就会变动，导致新节点的key值全部都改变了，所以会全部重新渲染。

+ 如果结构中包含输入类的DOM，会导致更新的DOM产生错误的顺序。
   如在每一条都加上一个输入框，输入内容后，再添加一条数据改变顺序。当新旧DOM在比较时，发现虽然文本值变了，但是DOM节点还是一样的，就复用了。这样就导致了输入框的内容错位


   #### 2.`['1', '2', '3'].map(parseInt)` what & why ?

   + map的回调函数是接受三个参数 item index arr。
   parseInt可以接受两个参数，第一个是值，第二个是可以选择进制，值为2-36。第二个值为0时，默认为10进制（0x开头默认16进制，数字0开头默认8进制）
   + 所以这个地方实际上是计算 parseInt('1',0),parseInt('2',1),parseInt('3',2)
   + 第一个是1；第二个进制无法解析，返回NaN；第三个是2进制，无法解析数字3，返回NaN


   #### 3.什么是防抖和节流？有什么区别？如何实现？
   
   + 防抖和节流都是为了防止函数多次调用。
   + 区别在于，假设这个函数一直在被触发的时间间隔小于wait，防抖的情况只会调用一次这个函数，节流会在间隔wait时间调用一次这个函数。
   ```js
    // 防抖
		function debounce (func, wait = 500, immediate = true) {
			let timer;
			return function(...args) {
				if(immediate) {
						func.apply(this, args)
				}else {
						if(timer) clearTimeout(timer)
						timer = setTimeout(()=>func.apply(this, args), wait)
				}
			}
		}
		// 节流
		function throttle(func, delay) {
				let timer, last;
				return function(...args) {
						let now = +new Date();
						if(last && now < last + delay) {
								clearTimeout(timer)
								const timer = setTimeout(()=>{
										last = now
										func.apply(this, args)
								}, delay)
						}else {
								last = now
								func.apply(this, args)
						}
				}
		}
   ```

	#### 4.介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
	[set和map数据结构](https://es6.ruanyifeng.com/#docs/set-map)

	+ set
	>set类似数组，但是成员的值都是唯一的，不可重复。
	>键值与键名是一致的
	>可以遍历keys values entries forEach（遍历顺序就是插入的顺序），方法有 add delete has

	+ WeakSet
	>与set的区别：成员只能是对象；垃圾回收机制不考虑WeakSet对该对象的引用；不能遍历

	+ map
	>本质上是键值对的集合（Hash结构），键的范围不限于字符串，可以遍历

	+ WeakMap
	>只接受对象（null除外）作为键名，键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的。不能遍历

	#### 5.输出以下代码的结果，why

	```js
	var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
	}
	obj.push(1)
	obj.push(2)
	console.log(obj)

	// result
	/*
	Object(4) [empty * 2,1,2,splice: f, push: f]

	因为此处的push是array原型链上的push方法，他会在当前的数字/类数组的length后的一位插入元素
	此时的length为2，所以obj.push(1)会在索引为2的地方插入,同理obj.push(2)会在索引为3的地方插入。第一项和第二项都没有值，所以是Empty
	*/
	```

	#### 以下代码的结果
	```js
	function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
	}
	Foo.prototype.a = function() {
			console.log(3)
	}
	Foo.a = function() {
			console.log(4)
	}
	Foo.a();
	let obj = new Foo();
	obj.a();
	Foo.a();

	//result  4 2 1
	/*
	function Foo 是Foo的构造方法，没有产生实例的时候没有执行
	在Foo的原型对象上挂载了a方法，打印3
	在Foo上直接挂载了a方法，打印4
	执行Foo.a()，打印4
	new一个对象，调用Foo的构造函数，即执行了function Foo，第一步把Foo上的方法a替换成了打印1；第二步在实例对象obj上挂载了a方法打印2
	obj.a()  // 2
	Foo.a()  // 1
	*/
	```

#### 前端埋点使用gif的原因

 + 防止跨域
 + 通常创建资源节点后只有将对象注入到浏览器DOM树后，浏览器才会实际发送资源请求。反复操作DOM会引发性能问题，而且载入CSS/JS资源还会阻塞页面渲染等。   但是图片请求例外，只需要new Image就能发起请求，而且没有阻塞问题
 + 相比 PNG/JPG GIF体积最小，节约流量
 + 并且大多数是1*1的透明GIF。1*1是最小的合法图片，透明也不需要存储色彩数据，节约体积



10.平时使用的es6语法

11.let,const,var区别

9、什么是变量提升？

10、如何理解原型链？

11、说说对OOP的理解

12.对原型，原型链的理解

13.string和object存储的方式有什么不一样

14.堆和栈的主要区别

15.了解的常见的数据结构



#### 事件循环
JavaScript是单线程的语言。Event Loop是javascript的执行机制。
JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为macro-task（宏任务）与micro-task（微任务）
执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环

async/await执行顺序
async隐式返回 Promise 作为结果的函数。会把awiat后面的代码作为一个微任务加到微任务队列。如果awiat返回了一个微任务，会把这个返回的微任务加入队列，然后先跳出async函数执行后面的代码，再把async剩下的代码加入微任务队列

macro-task大概包括：
script(整体代码)
setTimeout
setInterval
setImmediate
I/O
UI render

micro-task大概包括:
process.nextTick
Promise
Async/Await(实际就是promise)
MutationObserver(html5新特性)



#### http状态码

200	get 成功
201 post 成功
301 永久重定向
302	临时重定向
304 协商缓存 服务器文件未修改
400	客户端请求有语法错误，不能被服务器识别
403	服务器受到请求，但是拒绝提供服务，可能是跨域
404	请求的资源不存在
405 请求的method不允许
500	服务器发生不可预期的错误

#### cookie sessionStorage localStorage 区别
共同点：都是保存在浏览器端、且同源的

区别：

cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下

存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大

数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭之前有效；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭

作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localstorage在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的

### cookie

1. cookie 是什么？

cookie 是存储于访问者计算机中的变量。每当一台计算机通过浏览器来访问某个页面时，那么就可以通过 JavaScript 来创建和读取 cookie。
实际上 cookie 是存于用户硬盘的一个文件，这个文件通常对应于一个域名，当浏览器再次访问这个域名时，便使这个cookie可用。因此，cookie可以跨越一个域名下的多个网页，但不能跨越多个域名使用。
PS：cookie 和 session 都能保存计算机中的变量，但是 session 是运行在服务器端的，而客户端我们只能通过 cookie 来读取和创建变量

2. cookie 能做什么？

用户在第一次登录某个网站时，要输入用户名密码，如果觉得很麻烦，下次登录时不想输入了，那么就在第一次登录时将登录信息存放在 cookie 中。下次登录时我们就可以直接获取 cookie 中的用户名密码来进行登录。

PS:虽然 浏览器将信息保存在 cookie 中是加密了，但是可能还是会造成不安全的信息泄露

页面之间的传值。在实际开发中，我们往往会通过一个页面跳转到另外一个页面。我们可以将数据保存在 cookie 中，然后在另外页面再去获取 cookie 中的数据。

PS：这里要注意 cookie 的时效性，不然会造成获取 cookie 中数据的混乱。

3. 怎么使用 cookie？

document.cookie = "name=value;expires=evalue; path=pvalue; domain=dvalue; secure;”
1、name=value 必选参数
这是一个键值对，分别表示要存入的 属性 和 值。

2、expires=evalue 可选参数
该对象的有效时间（可选）只支持GTM 标准时间，即要将时间转换，toUTCString()（默认为当前浏览器 会话有用，关闭浏览器就消失）

4.domain=dvalue 可选参数
用于限制只有设置了的域名才可以访问；如果没有设置，则默认在当前域名访问

### 从输入URL到页面呈现发生了什么？

DNS 查询 找到url的ip地址
TCP 连接 
处理请求  返回相应的html给浏览器
接受响应
渲染页面



18.https为什么比http安全

19.http2的优势

浏览器的缓存方式：协商缓存和强缓存

同源策略，如何解决跨域

简单介绍一下promise

说说promise.all和promise.race的区别


21.了解websocket吗





什么情况下会引发重绘？

25.渲染树是怎么生成的

26.怎么把.vue转换成原生资源的，怎么转化的（比如说箭头函数转化成一个function）

import export require

#### 27.了解过tree-shaking吗
通常指通过打包工具"摇"我们的代码，将未引用代码 "摇" 掉。在 Webpack 项目中，有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝，虽然依赖了某些模块，但其实只使用其中的某些方法，通过 Tree Shaking ，将没有使用的方法摇掉，这样来达到删除无用代码的目的。

模块必须采用 ES6 Module 语法，因为 Tree Shaking 依赖 ES6 的静态语法：import 和 export。不同于 ES6 Module，CommonJS 支持动态加载模块，在加载前是无法确定模块是否有被调用，所以并不支持 Tree Shaking 


### 运行 npm run XXX

运行 npm run xxx的时候，npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行；
没有找到则从全局的 node_modules/.bin 中查找，npm i -g xxx就是安装到到全局目录；
如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序。







