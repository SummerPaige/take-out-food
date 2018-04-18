//const loadAllItems = require("./items.js");
//const loadPromotions = require("./promotions.js");

function bestCharge(selectedItems) {//["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]
  let allItems=loadAllItems();
  let promotions=loadPromotions();
  let items=getItem(allItems,selectedItems);
  let recipt_menu=getMenu(items);
  let originalCost=getOriginalCost(items);
  let halfItems=promotions[1].items;
  let halfPrice=getHalfPrice(items, halfItems);
  let halfItems_name=[];
  let moreThan30Price=getMoreThan30Price(originalCost);
  let recipt_promotions=compareWithpromotions(originalCost,halfPrice,moreThan30Price);
  recipt_all=recipt_menu+recipt_promotions;
  return  recipt_all;
}

function getItem(selectedItems,allItems){//将选中的菜单转换成含有id,name,price,num的数组
  let item=[];
  for(let i in selectedItems ){
    selectedItems[i]=i.split('x');
    for(let j of allItems){
      if(selectedItems[i][0]==j['id']{
        j.num=parseInt(selectedItems[i][1]);
        item.push(j);//添加了num的j
      }
    }
  }
  return item;
}

function recipt_menu(items){
  let menu='';
  let menu_head='\n============= 订餐明细 =============\n';
  let menu_foot='-----------------------------------\n';
  let menu_list='';
  let menu_price='';
  for(let i of items){
    menu_list+=(i.name+' x '+i.num+'= ');
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
      halfItems_name.push(i.name);
    }else{
      price+=i.price*i.num;}
  }
  return price;
}


function getMoreThan30Price(originalCost){
  let price=0;
  let quot=Math.floor(originalCost/30);
  price=originalCost-quot*6;
  return price;
}

function compareWithpromotions(originalCost,halfPrice,moreThan30Price){
  let price=0;
  let saveMoney=0;
  let recipt=' ';

  if(halfPrice<moreThan30Price){
    recipt='使用优惠：\n' +'指定菜品半价('
    price=halfPrice;
    saveMoney=originalCost-price;
    recipt+=halfItems_name.join(',')+ '),' +'省'+saveMoney+'元\n'+'-----------------------------------\n'+'总计: '+halfPrice+'元\n'+'===================================';

  }else if(moreThan30Price<halfPrice){
    recipt='使用优惠：\n'+'满30减6元，省6元\n'+'-----------------------------------\n'+'总计: '+moreThan30Price+'元\n'+'===================================';
  }else{
    recipt='总计: '+originalCost+'元\n'+'===================================';
  }
 return recipt;
}
//module.exports = bestCharge;
