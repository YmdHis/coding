const path = require('path');
const fs = require('fs');
const vm = require('vm');

function r(fileName) {
  const pathToFile = path.resolve(__dirname, fileName);
  const content = fs.readFileSync(pathToFile, 'utf-8'); //读取文件内容，字符串
  
  const wrapper = [
    '(function(r, m, e, expt){',
    '})'
  ]
  
  const wrappedContent = wrapper[0] + content + wrapper[1];
  
  //把字符串变为可执行代码
  const script = new vm.Script(wrappedContent, {
    filename: 'index.js'
  });
  const module = {
    e: {}
  };
  const result = script.runInThisContext();
  result(r,module,module.e,'你好');
  return module.e;
}

global.r = r;