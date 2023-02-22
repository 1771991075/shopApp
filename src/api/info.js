import sendHttp from '../utils/http'

//获取商品详情信息
let getShopInfo = (id)=>sendHttp(`/api/front/product/detail/${id}?type=normal`,'get')

//获取优品推荐
let getGoodShop= ( )=>sendHttp(`/api/front/product/good`,'get')

//获取用户评价
let getUserComments = (id)=>sendHttp(`/api/front/reply/product/${id}`,'get')

//收藏商品
let addUserCollect = (data)=>sendHttp('/api/front/collect/add','post',data)

//取消收藏
let removeUserCollect = (id)=>sendHttp(`/api/front/collect/cancel/${id}`,'post')

export {
    getShopInfo,
    getGoodShop,
    getUserComments,
    addUserCollect,
    removeUserCollect
}