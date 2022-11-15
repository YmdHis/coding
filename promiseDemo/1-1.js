function a() {
  return new Promise((resove,reject)=>{
    return resove(123)
  })
}


async function b() {
  try {
    const res = await a()
    throw('xxx')
  } catch (err){
    console.log(err)
  }
}


async function c() {
  try {
    let res = await b();
    console.log('c',res)
  } catch (err){
    console.log('err',err)
  }

}

function getFoo() {
  return new Promise(res => {
    setTimeout(res,3000)
  })
}

function getBar() {
  return new Promise(res => {
    setTimeout(res,3000)
  })
}

async function test(){
  let foo = await getFoo();
let bar = await getBar();
console.log(foo,bar)
}

test()


