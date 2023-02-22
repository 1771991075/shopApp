import sendHttp from '../utils/http'

//获取购物车列表
let getCartList = () =>sendHttp(`/api/front/cart/list?page=1&limit=20&isValid=false`,'get')

//加入购物车
let addCartList = (data) =>sendHttp(`/api/front/cart/save`,'post', data )

//添加商品数量
let addShopCount = () =>sendHttp(`/api/front/cart/num`,'post')

export {
    getCartList,
    addCartList,
    addShopCount
}