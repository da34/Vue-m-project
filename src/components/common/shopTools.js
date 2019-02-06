const shopTools = {}
//获取商品
const shop = JSON.parse(window.localStorage.getItem('shopInfo') || '{}')
// console.log(shop);
//更新数据
shopTools.upData = function (goods) {
  shop[goods.id]
    ? shop[goods.id] += goods.num
    : shop[goods.id] = goods.num
  this.saveShop(shop)
}


//获取商品详情
shopTools.getShopDetails = function () {
  return JSON.parse(window.localStorage.getItem('shopInfo') || '{}')
}


//获取商品总数

shopTools.getShopCount = function () {
  let num = 0
  for (var shopKey in shop) {
    num += shop[shopKey]
  }
  return num
}


//删除商品
shopTools.unShop = function (goods) {
  // console.log(shop[goods.id]);
  delete shop[goods.id]
  this.saveShop()
}

//存储商品数据
shopTools.saveShop = function () {
  window.localStorage.setItem('shopInfo', JSON.stringify(shop))
  // JSON.stringify()
}


export default shopTools
