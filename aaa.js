const membersList = []

const cashBackList = membersList.filter(c=>c.assistAmount !== 0)
const {assistAmount:cash}  = cashBackList[0]
console.log(cash)