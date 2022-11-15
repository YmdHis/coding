const times = 3; // 生成个数

const codeLength = 15;  // 生成长度

const num = '0123456789';

const lowerLetter = 'abcdefghijklmnopqrstuvwxyz';

const upperLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const symbolText = '~!@#$%^&*()_+';

const charset = `${num}${lowerLetter}${upperLetter}${symbolText}`  //使用的字符集

function generate(times) {
  for(let i=0;i<times;i++){
    console.log(getRadomCode(codeLength, charset))
  }
}

//生成随机数密码
function getRadomCode(codeLength, charset) {
  let code = '';
  while(code.length < codeLength){
    code += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return code
}

generate(times)
