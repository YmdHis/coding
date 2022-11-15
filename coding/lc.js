let sum = 0;
var maxProfit = function(prices) {
  if(prices.length < 2) return 0;
  let profit = 0;
  dfs(prices,0,prices.length,0,profit);
  return sum
};

function dfs(prices,index,len,status,profit) {
  debugger;
  if(index == len) {
    sum = Math.max(profit,sum)
    return 
  }
  if(status == 0){
    dfs(prices,index+1,len,1,profit-prices[index])
  }else if(status == 1){
    dfs(prices,index+1,len,1,profit+prices[index])
  }
  dfs(prices,index+1,len,status,profit)
}

let arr = [7,1,5,3,6,4]
maxProfit(arr)


