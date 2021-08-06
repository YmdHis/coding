function isFunction(ops) {
  return ops && typeof ops === 'function';
}

const hump2ul = key => key.replace(/\B([A-Z])/g, '_$1').toLowerCase();
const ul2hump = key => key.replace(/_+(\w)/g, (all, letter) => letter.toUpperCase());

// 处理接口 json 的属性风格
function deepCloneJson(node, { keyLoader = null } = {}) {
  // 检查传入参数是否引用类型，排除 boolean、function、null、undefined、number、string
  if (typeof node !== 'object' || `${node}` === 'null') return node;

  let newNode = null;

  if (node instanceof Array) {
    // 数组
    newNode = node.map(n => deepCloneJson(n, {keyLoader}));
  } else if (typeof node === 'object') {
    // 对象
    newNode = {};
    Object.keys(node).forEach(key => {
      const newkey = isFunction(keyLoader) ? keyLoader(key) : key;
      newNode[newkey] = deepCloneJson(node[key], {keyLoader});
    });
  }

  return newNode;
}



const nodeobj = {
	"t__test": {
		"a___a_c": null,
		"b_b": {
			"c_c": false
		}
	},
	"account_list": [{
		"activity_id": "2021042309554002",
		"amount_remain": 10,
		"amount_total": 10,
		"amount_used": 0,
		"prize_id": "100343",
		"prize_type": 0,
		"reward_id": "",
		"reward_type": "gift-pack",
		"status": 0,
		"team_id": ""
	}, {
		"activity_id": "2021042309554002",
		"amount_remain": 11,
		"amount_total": 11,
		"amount_used": 0,
		"prize_id": "100344",
		"prize_type": 8,
		"reward_id": "1422860716541153280",
		"reward_type": "th-coupon",
		"status": 0,
		"team_id": ""
	}],
	"code": 0,
	"msg": "success"
}
console.log(deepCloneJson(nodeobj, { keyLoader: ul2hump }))

// let accountList ={
//   '0': {
//     activityId: '2021042309554002',     
//     amountRemain: 10,
//     amountTotal: 10,
//     amountUsed: 0,
//     prizeId: '100343',
//     prizeType: 10,
//     rewardId: '',
//     rewardType: 'gift-pack',
//     status: 0,
//     teamId: ''
//   }
// }

// // const res = Array.prototype.forEach.call(accountList,c => {
// //   return c.prizeType === 10;
// // });
// const res = accountList.map(c => c.prizeType === 10)
// console.log(res)