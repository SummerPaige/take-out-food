const loadAllItems = require("./items.js");
const loadPromotions = require("./promotions.js");

function bestCharge(selectedItems) {//["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]
  let allItems=loadAllItems();
  let promotions=loadPromotions();
  let items=getItem(selectedItems,allItems);
  let recipt_menu=getMenu(items);
  let originalCost=getOriginalCost(items);
  let halfItems=promotions[1].items;
  let halfPrice=getHalfPrice(items, halfItems);
  let halfItems_name=getHalfItems_name(items, halfItems);
  let moreThan30Price=getMoreThan30Price(originalCost);
  let recipt_promotions=compareWithpromotions(originalCost,halfPrice,halfItems_name,moreThan30Price);
  recipt_all=recipt_menu+recipt_promotions;
  return  recipt_all;
}
function getItem(selectedItems,allItems){//将选中的菜单转换成含有id,name,price,num的数组
  let item=[];
  for(let i in selectedItems ){
    selectedItems[i]=selectedItems[i].split('x');
    for(let j of allItems){
      if(selectedItems[i][0].trim()==j['id'].trim()){
        j.num=parseInt(selectedItems[i][1]);
        item.push(j);//添加了num的j
      }
    }
  }
  return item;
}
/*selectedItems= ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
allItems=[{
  id: 'ITEM0001',
  name: '黄焖鸡',
  price: 18.00
}, {
  id: 'ITEM0013',
  name: '肉夹馍',
  price: 6.00
}, {
  id: 'ITEM0022',
  name: '凉皮',
  price: 8.00
}, {
  id: 'ITEM0030',
  name: '冰锋',
  price: 2.00
}];
*/
function getMenu(items){
  let menu='';
  let menu_head='============= 订餐明细 =============\n';
  let menu_foot='-----------------------------------\n';
  let menu_list='';
  let menu_price='';
  for(let i of items){
    menu_list+=(i.name+' x '+''+i.num+' = ');
    menu_price=i.price*i.num;
    menu_list+=(menu_price.toString()+'元'+'\n');
  }
  return menu_head+menu_list+menu_foot;
}

function getOriginalCost(items){
  return items.reduce(function(pre,cur){
    return pre+(cur.price*cur.num);
  },0);//0是初始值，number
}


function getHalfPrice(items, halfItems){
  let price=0;
  for(let i of items){
    if(halfItems.includes(i['id'])){
      price+=i.price*0.5*i.num;
      //halfItems_name.push(i.name);
    }else{
      price+=i.price*i.num;}
  }
  return price;
}

function getHalfItems_name(items, halfItems){
  let price=0;
  let halfItemsName=[];
  for(let i of items){
    if(halfItems.includes(i['id'])){
      halfItemsName.push(i.name);
    }
  }
  return halfItemsName;
}


function getMoreThan30Price(originalCost){
  let price=0;
  let quot=Math.floor(originalCost/30);
  price=originalCost-quot*6;
  return price;
}

function compareWithpromotions(originalCost,halfPrice,halfItems_name,moreThan30Price){
  let price=0;
  let saveMoney=0;
  let recipt=' ';

  if(halfPrice<moreThan30Price){
    recipt='使用优惠:\n' +'指定菜品半价('
    price=halfPrice;
    saveMoney=originalCost-price;
    recipt+=halfItems_name.join('，')+')，' +'省'+saveMoney+'元\n'+'-----------------------------------\n'+'总计：'+halfPrice+'元\n'+'===================================';

  }else if(moreThan30Price<halfPrice){
    recipt='使用优惠:\n'+'满30减6元，省6元\n'+'-----------------------------------\n'+'总计：'+moreThan30Price+'元\n'+'===================================';
  }else{
    recipt='总计：'+originalCost+'元\n'+'===================================';
  }
 return recipt;
}

module.exports = bestCharge;
