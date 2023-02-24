import sendHttp from '../utils/http'

//获取购物车列表
let getCartList = () =>sendHttp(`/api/front/cart/list?page=1&limit=20&isValid=true`,'get')

//加入购物车
let addCartList = (data) =>sendHttp(`/api/front/cart/save`,'post', data )

//添加商品数量
let addShopCount = (data) =>sendHttp(`/api/front/cart/num`,'post',data,{
    'content-type':'application/x-www-form-urlencoded'
})

//删除商品
let deleteShop = (data) =>sendHttp(`/api/front/cart/delete`,'post',data,{
    'content-type':'application/x-www-form-urlencoded'
})

export {
    getCartList,
    addCartList,
    addShopCount,
    deleteShop
}