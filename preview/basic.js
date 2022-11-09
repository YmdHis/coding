// 数据类型的检测
function type(obj) {
    let classMap = []
    "Array Object Function Error Date".split(' ').map(item =>{
        classMap[`[object ${item}]`] = item.toLowerCase()
    })

    if (obj == null) {
        return ""+null
    }
    if(typeof obj === 'object' || typeof obj === 'function') {
        return classMap[Object.prototype.toString.call(obj)]
    }
    return typeof obj
}

// 实现一个new
function newObj(func,...arguments) {
    let newObj = new Object();
    newObj._porto_ = func.prototype;
    let result = func.apply(newObj, arguments);
    return typeof result === 'object' ? result : newObj
}

function argumentsShow() {
    console.log(arguments)
}
//argumentsShow(1,2,3) //[Arguments] { '0': 1, '1': 2, '2': 3 }

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


// 驼峰转下划线
const hump2ul = key => key.replace(/\B([A-Z])/g, '_$1').toLowerCase();

// 下划线转驼峰
const ul2hump = key => key.replace(/_+(\w)/g, (all, letter) => letter.toUpperCase());

// 处理接口 json 的属性风格
function deepCloneJson(node, { keyLoader = null } = {}) {
  // 检查传入参数是否引用类型，排除 boolean、function、null、undefined、number、string
  if (typeof node !== 'object' || `${node}` === 'null') return node;

  let newNode = null;

  if (node instanceof Array) {
    // 数组
    newNode = node.map(n => deepCloneJson(n, {keyLoader}));
  } else if (typeof node === 'object') {
    // 对象
    newNode = {};
    Object.keys(node).forEach(key => {
      const newkey = isFunction(keyLoader) ? keyLoader(key) : key;
      newNode[newkey] = deepCloneJson(node[key], {keyLoader});
    });
  }

  return newNode;
}

// 获取url参数
function getQueryParams(qs) {
    console.log('getQueryParams-----qs', qs);
    if (!qs) {
      qs = window.location.search;
    }
    qs = qs.replace(/\+/g, ' ');
    const params = {};
    const re = /[?&]([^=&#]+)=([^&#]*)/g;
    let tokens = re.exec(qs);
    while (tokens) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      tokens = re.exec(qs);
    }
    return params;
  }

// console.log('script start')
//   async function async1() {
//     await async2()
//     console.log('async1')
//   }
//   async function async2() {
//     console.log('async2')
//     // return Promise.resolve().then(()=>{
//     //     console.log('async2 end1')
//     // })
//     return (function() {
//         console.log('123')
//     })()
//   }
//   async1()
//   setTimeout(function() {
//     console.log('setTimeout')
//   }, 0 )
//   new Promise(resolve => {
//     console.log('promise')
//     resolve()
//   }).then(function() {
//     console.log('p1')
//   }).then(function() {
//     console.log('p2')
//   })
//   console.log('script end')

// script start
// async2
// 123
// promise
// script end
// async1
// p1
// p2
// setTimeout


const test = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(111);
    }, 1000);
}).then((value) => {
    console.log('then');
});

setTimeout(() => {
    console.log(test);
}, 3000)