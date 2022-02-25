const list = [
  {
    configId: 51,
    biz: "biz",
    bizCnName: "bizCnName",
    app: "app",
    appCnName: "appCnName",
    server: "server",
    serverCnName: "serverCnName",
    env: "pre",
    file: "file",
    fileCnName: "fileCnName",
  },
];

function listToTree(dataMap) {
  const tree = [];

  const temp = {};
  dataMap.map(item => temp[item.biz] = item.bizCnName);
  const bizList = Object.entries(temp).reduce((acc, cur)=> acc.concat({label: `${cur[0]}(${cur[1]})`, value: cur[0],children:[]}), []);

  dataMap.forEach(data =>{
    bizList.forEach(item =>{
      if(data.biz == item.value){
        item.children.push({label:`${data.app}(${data.appCnName})}`,value:data.app,children:[]})
      }
    })
    
  })

  console.log(bizList);

  return tree;
}

// listToTree(list)


const listToTree1 = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}


let dataArr = [];
    arr.map(mapItem => {
      if (dataArr.length == 0) {
          dataArr.push({ date: mapItem.date, List: [mapItem] })
      } else {
         let res = dataArr.some(item=> {//判断相同日期，有就添加到当前项
          if (item.date == mapItem.date) {
            item.List.push(mapItem)
            return true
          }
        })
        if (!res) {//如果没找相同日期添加一个新对象
          dataArr.push({ date: mapItem.date, List: [mapItem] })
        }
      }
    })


    function dealWithData(data){
      let c = [];
       let d = {};
       data.forEach(element => {
        if(!d[element.year]){
          c.push({
            year: element.year,
            allData: [element]
          });
          d[element.year] = element;
        }else{
          c.forEach(ele => {
            if(ele.year == element.year){
                ele.allData.push(element);
            }
          });
        }        
     });
      return c;
    }


    const obj = {
      a:1,
      b:2
    }