const http = require('http');

const proxy = http.createServer((req, res) =>{

  res.writeHead(200, {'x-header': 'hello-header'})
  //此方法向服务器发出信号，表明所有响应头和正文都已发送；该服务器应认为此消息已完成。 response.end() 方法必须在每个响应上调用。
  res.end('hello world')
})

proxy.listen(9999, '127.0.0.1', () =>{
  console.log('server star')
})