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






2.vue的生命周期

3.父子组件中生命周期的执行顺序

4.watch和computed的区别

5.怎样监听某一个具体的属性（比如a对象中的b属性）

6.nextTick主要是用来干什么的

7.对虚拟dom的理解，虚拟dom解决了什么问题（减少重绘回流，浏览器的开销）

8.data为什么不是一个对象而是一个函数

9.项目中axios主要解决了什么问题，如何写一个网络请求发到服务器

10.平时使用的es6语法

11.let,const,var区别

12.对原型，原型链的理解

13.string和object存储的方式有什么不一样

14.堆和栈的主要区别

15.了解的常见的数据结构

16.对数据流量太大的优化（预加载和懒加载），如果是手机端的话怎么办（1.压缩 2.部分展示）

前端是最接近用户的

17.学过哪些网络协议，发qq消息是基于tcp还是udp

18.https为什么比http安全

19.http2的优势

20.500是什么意思，301和302的区别，101是什么意思

21.了解websocket吗

22.编译型语言(java,c++)和解释性语言（js）的区别

23.为什么学习前端

24.用过弹性布局吗，主轴（flex-direction）和交叉轴(align-items)的区别

25.渲染树是怎么生成的

26.怎么把.vue转换成原生资源的，怎么转化的（比如说箭头函数转化成一个function）

27.了解过tree-shaking吗

3、介绍一下Vue的内部机制
4、说一下对虚拟DOM的理解
5、Diff算法的具体比较过程？
6、Vue数据响应式的原理？
7、Vue的生命周期钩子有哪些？
8、说一下对闭包的理解
9、什么是变量提升？
10、如何理解原型链？
11、说说对OOP的理解
12、在JS中如何实现多重继承？
13、JS基本数据类型有哪些？
14、什么是盒模型？
15、从输入URL到页面呈现发生了什么？
16、什么情况下会引发重绘？
17、了解哪些排序算法？
18、说一下快排到实现思路
