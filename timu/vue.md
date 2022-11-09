https://juejin.cn/post/6844903918753808398#heading-25

## vue基础用法
### 理论
#### 面试题1： 简单聊聊对于MVVM的了解

Model： 表示数据模型层
View：表示视图层
ViewModel：核心枢纽 数据绑定到 viewModel 层并自动渲染到页面中，视图变化通知 viewModel 层更新数据



#### vue是如何利用mvvm思想进行项目开发
数据双向绑定 实现了页面与数据的绑定，当数据发生变化的时候会自动渲染页面；当页面操作数据的时候 DOM 和 Model 也会发生相应的变化
例如: {{...}}来绑定数据，或者，使用v-html指令输出html代码等等

b. 通过视图绑定事件，来处理数据

#### 发布订阅模式 响应式数据
Vue.Js采用数据劫持的方式结合发布订阅模式
Observer：使用Object.defineProperty方法给data的所有属性都绑定get和set方法
进行数据劫持，实现数据的双向绑定。在这里，他就是一个发布者，发布数据变更的消息。

Dep：一个属性有一个Dep，来通知watcher数据变更。

Watcher：订阅者。编译器Compiler为每一个编译过的元素节点和文本节点添加watcher，一旦数据更新，触发watcher回调，通知视图层进行变更。

#### Diff算法的具体比较过程
逐层级对比
调用Patch函数，接受两个参数 oldVnode 和 Vnode 
sameVnode判断两个节点是否一样（key值，标签名，data的值：style click事件等），不一样就直接替换
一样的两个节点就要执行patchVnode对比，判断 oldVnode 和 Vnode是否指向同一个对象。找到子节点，如果旧的没有新的有，就将新的子节点加到真实的el下；如果旧的有新的没有，就删除；如果两者都有，就要比较子节点
现在分别对oldS、oldE、S、E两两做sameVnode比较，有四种比较方式，当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置，指针往中间移动，直到某一个的s>e，表示某一个遍历完了;就将剩下的节点根据index插入到真实dom。
如果四个指针对应的四种匹配都不成功，分为两种情况：
如果新旧子节点都存在key，那么会根据oldChild的key生成一张hash表，用S的key与hash表做匹配，匹配成功就判断S和匹配节点是否为sameNode，如果是，就在真实dom中将成功的节点移到最前面，否则，将S生成对应的节点插入到dom中对应的oldS位置，S指针向中间移动，被匹配old中的节点置为null。
如果没有key,则直接将S生成新的节点插入真实DOM（ps：这下可以解释为什么v-for的时候需要设置key了，如果没有key那么就只会做四种匹配，就算指针中间有可复用的节点都不能被复用了）


### 虚拟dom（减少重绘回流，浏览器的开销）
Virtual DOM是对DOM的抽象,本质上是JavaScript对象
DOM相对较慢,更因为频繁变动DOM会造成浏览器的回流或者重回。,因此我们需要这一层抽象,在patch过程中尽可能地一次性将差异更新到DOM中



#### 生命周期
##### 面试题2：vue生命周期
beforeCreate => created => beforeMount => mounted => beforeUpdate => updated
=> beforeDestroy => destroyed

beforeCreate: Vue创建Vue实例对象，用这个对象来处理DOM元素，这时候这个Vue对象就可以访问了。

created: props => methods =>data => computed => watch - 数据操作、不涉及到vdom和dom

beforeMount: 
 它是在挂载之前被调用的，会在此时去找到虚拟Dom，并将其编译成Render
首先判断是否有el对象，如果没有，停止编译，Vue实例的生命周期走到create就结束了。
如果有挂载的DOM节点，再查找是否有任何模板（template）被用在了DOM层。
如果有，则把template放到render函数中（如果是单文件组件，这个模板的编译将提前进行）。
如果没有template，则将外部HTML作为模板编译（于是，我们发现template优先级大于外部HTML）。
当然这个过程中，如果我们使用了模板语法，例如{{...}} v-html 等，他们还是以虚拟DOM形式存在，并没有被编译

mounted:
 虚拟Dom已经被挂载到真实Dom上，此时我们可以获取Dom节点，$ref在此时也是可以访问的。
这一步就是用Compile模块编译模板语言，当然这一步因为内容的替换，会引起大量的回流和重绘，所以这一步，在内存中进行
1.递归遍历所有的节点，分为文本节点和元素节点。
2.对于文本节点：找到是否含有{{}}，如果有的话，获取{{}}内的表达式，获取表达式相应的内容，渲染内容;对于元素节点：我们要寻找是否有v-相关属性，如果有的话，获取v-后面的指令，同时获得指令的表达式相应的值

beforeUpdate: beforeUpdate在监听到数据改变之前执行，虚拟DOM重新渲染，并应用更新，完成改变之后执行updated。

updated: dom已经更新了 — 谨慎操作数据

beforeDestroy: Vue被破坏并从内存释放之前，实例vm尚未被销毁 — 清空eventBus、reset store、clear计时器
destroyed: 实例已经被销毁 Vue实例内存被释放

#### 父子组件生命周期
父beforeCreate => 父created => 父beforeMount => 子beforeCreate => 子created => 子beforeMount => 子mounted => 父子mounted

父组件 beforeUpdate -> 子组件 beforeUpdate -> 子组件 updated -> 父组件 updated
父组件 beforeDestroy -> 子组件 beforeDestroy -> 子组件 destroyed -> 父组件 destroyed

#### 定向监听
##### 面试点3：computed 和 watch
相同点：
1. 基于vue的依赖收集机制
2. 都是被依赖的变化触发，进行改变进而进行处理计算

不同点：
1. 入和出
computed: 多入单出 —— 多个值变化，组成一个值的变化
watch: 单入多出 —— 单个值的变化，进而影响一系列的状态变更

2. 性能
computed: 会自动diff依赖，若依赖没有变化，会改从缓存中读取当前计算值
watch: 无论监听值变化与否，都会执行回调

3. 写法上
computed: 必须有return返回值
watch: 不一定

4. 时机上
computed: 从首次生成赋值，就开始计算运行了
watch: 首次不会运行，除非——immediate：true

#### nextTick主要是用来干什么的
在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新之后的DOM
vue进行DOM更新内部也是调用nextTick来做异步 队列控制。而当我们自己调用nextTick的时候，它就在更新DOM的那个microtask后追加了我们自己的 回调函数，从而确保我们的代码在DOM更新后执行

#### data为什么不是一个对象而是一个函数
因为 vue 组件可能会有多个实例。如果共用一个 data 会导致内部混乱。所以每次返回一个新的 data 。这样每个组件都有自己的 data 。

#### 条件
##### v-if & v-show & v-else & v-else-if
v-if 无dom，不会渲染实际节点及其子节点
v-show 存在实际节点及其子节点，单不展示，不占据位置

#### 循环
##### 面试题： v-for 和 v-if 循优先级
v-for > v-if 先循环 再判断

##### 面试题：key的作用
1. 模板编译原理 —— template => dom
template => 正则匹配语法 —— 生成AST：静态 + 动态 => 转换AST为可执行方法 => render() => dom


层级：只考虑单层复用，多层级遍历实现
顺序：双向指针，首尾向中间移动
替换：移动、新增、删除；优先复用 —— key => 快速识别顺序

3. key作用 —— 尽可能复用节点
常见问题：index做key、随机数做key

#### 指令
##### 默认指令
v-once - 只渲染依次
v-text - 渲染字符串
v-html - 渲染html
v-bind - : 绑定赋值
v-on - @ 监听
v-model - 双向绑定 —— 语法糖
:value + @input
* 重配置
```js
  model: {
    prop: 'selected',
    event: 'change'
  }
```


##### 自定义指令
```js
  directives: {
    zhaowa: {
      update: function() {
        // ……
      }
    }
  }
  <div v-zhaowa></div>
```

#### 事件
##### v-on
##### 修饰符
.stop .prevent .capture .self .once .passive

##### 按钮修饰符
enter delete

##### 事件设计 - 为何vue把事件写在模板上，而不是js中
模板定位事件触发源 + 触发源寻找触发事件逻辑 —— 更方便定位问题
js与事件本身解耦 —— 更便于测试隔离
viewModel销毁，自动解绑事件 —— 更便于回收

