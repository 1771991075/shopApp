import sendHttp from '../utils/http'

//获取商品详情信息
let getShopInfo = (id)=>sendHttp(`/api/front/product/detail/${id}?type=normal`,'get')

export {
    getShopInfo
}