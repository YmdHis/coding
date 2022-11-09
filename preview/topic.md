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


10.平时使用的es6语法

11.let,const,var区别

9、什么是变量提升？

10、如何理解原型链？

11、说说对OOP的理解

12.对原型，原型链的理解

13.string和object存储的方式有什么不一样

14.堆和栈的主要区别

15.了解的常见的数据结构

#### typeScript 
https://juejin.cn/post/6876659541363785735#heading-3


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

#### node事件循环
macro-task 大概包括：
setTimeout
setInterval
setImmediate
script（整体代码)
I/O 操作等。

micro-task 大概包括：
process.nextTick(与普通微任务有区别，在微任务队列执行之前执行)
new Promise().then(回调)等。




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








17.学过哪些网络协议，发qq消息是基于tcp还是udp

18.https为什么比http安全

19.http2的优势

浏览器的缓存方式：协商缓存和强缓存

同源策略，如何解决跨域

简单介绍一下promise

说说promise.all和promise.race的区别


21.了解websocket吗



从输入URL到页面呈现发生了什么？

什么情况下会引发重绘？

25.渲染树是怎么生成的

26.怎么把.vue转换成原生资源的，怎么转化的（比如说箭头函数转化成一个function）

import export require

#### 27.了解过tree-shaking吗
通常指通过打包工具"摇"我们的代码，将未引用代码 "摇" 掉。在 Webpack 项目中，有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝，虽然依赖了某些模块，但其实只使用其中的某些方法，通过 Tree Shaking ，将没有使用的方法摇掉，这样来达到删除无用代码的目的。

模块必须采用 ES6 Module 语法，因为 Tree Shaking 依赖 ES6 的静态语法：import 和 export。不同于 ES6 Module，CommonJS 支持动态加载模块，在加载前是无法确定模块是否有被调用，所以并不支持 Tree Shaking 









