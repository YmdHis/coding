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


let colors = ["blue", "white", "green", "navy", "pink", "purple", "orange", "yellow", "black", "brown"];
let reversedColors = colors.reverse();
console.log(reversedColors);
console.log(colors);