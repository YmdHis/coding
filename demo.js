
let obj = {
  created(){
    console.log(1)
    this.onShow()
    console.log(2)
  },
  async onShow(){
    await this.init()
  },
  async init(){
    Promise.all([this.pro1,this.pro2])
  },
  async pro1(){
    await new Promise((resolve) =>{
      console.log('p1')
      resolve()
    })
  },
  async pro2(){
    await new Promise((resolve) =>{
      console.log('p2')
      resolve()
    })
  }
}

obj.created()

