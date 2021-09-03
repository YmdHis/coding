// a= {
//   aa:'123',
//   foo () {
//     this.fn(function () {
//       console.log('foo',this)
//     })
//   },
//   fn (cb){
//     cb()
//   },
//   bar () {
//     console.log('bar', this);
//     let baz = function () {
//       console.log('baz', this)
//     }
//     baz()
//   }
// }

//箭头函数体内的this对象，就是定义该函数时所在的作用域指向的对象，而不是使用时所在的作用域指向的对象。
// const a1 = {
//   text: '111',
//   fn: () => {
//     console.log('a1fn',this)
//     console.log(this.text)
//   }
// }
// const a2 = {
//   text: '222',
//   fn: function (){
//     let foo = a1.fn
//     foo()
//     let bar = () =>{
//       console.log('barthis',this)
//     }
//     bar()
//   }
// }
// a2.fn()

function initIncrement() {
  let count = 0;
  let message = `count is ${count}`

  function increment() {
    count++;
    console.log(count)
  }

  function log() {
    console.log(message)
  }

  return [increment, log]
}

[increment, log] = initIncrement();

increment();
increment();
increment();
log()