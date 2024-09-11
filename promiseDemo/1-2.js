// async function test() {
//   await asyncStat()
//   console.log('link')
// }


async function stat () {
  foo();
  return 111
}

async function test() {
  // const a =
  console.log( stat())
  console.log(1)
}


test()






async function asyncStat() {
  try {
    await Promise.race([
      await new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('setTimeout')
          resolve()}, 1000);
      }),
      stat()
    ]).finally(()=>{
      console.log('then')
    })
  } catch(err) {
    console.log('err',err)
  }

}
