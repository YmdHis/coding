// 最大子列和
function maxSubSum(orginArr) {
  let thisSum = 0;
  let maxSum = 0;
  for(let i =0; i<orginArr.length; i++){
    thisSum += orginArr[i];
    if (thisSum > maxSum) maxSum = thisSum;
    else if (thisSum < 0) thisSum = 0;
  }
  return maxSum;
}


let arr = [1,2,3,4,3,4,2,1,5]
//数组去重
function qc(arr){
  return [...new Set(arr)]
}
console.log(qc(arr))
