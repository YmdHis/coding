function fun(extra){
 if(Object.prototype.toString.call(extra) !== '[Object Object]'){
   extra = {extra: encodeURIComponent(JSON.stringify(extra)) }
 }
 console.log(...extra)
}

console.log(Object.prototype.toString.call(fun))