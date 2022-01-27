function countValidWords(sentence){
  const symbolSet = '-!.,';
  const arr = sentence.split(' ');
  console.log(arr)
  const currentArr = arr.filter(item =>{
    if(item.length === 0) return false

    if(/\d/.test(item))return false

    const fhSet = '!.,'
    let flag = 0
    for(let i=0; i<item.length; i++){
      if(item[0] === '-' || item[item.length-1] === '-') return false
      if(item[i] === '-' && (fhSet.includes(item[i-1]) || fhSet.includes(item[i+1]))) return false
      if(item[i] === '-') flag++
      if(flag >1) return false;

      if(fhSet.includes(item[i]) && (i !==(item.length-1))) return false
    }
    return true
  })
  console.log(currentArr)
  return currentArr.length
}


console.log(countValidWords("!this  1-s b8d!"))
