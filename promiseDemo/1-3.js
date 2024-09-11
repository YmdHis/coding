async function test() {
  const [data] = await Promise.all([
    foo()
  ])
  console.log(data)
}

function foo() {
  return new Promise((resolve)=>{
   return resolve(null)
  })
}

test()