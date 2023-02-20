//存放home页面中http请求
import sendHttp from '../utils/http'

//获取分类列表
let getCate = ()=>sendHttp(`/api/front/index`,'get')

//获取排行榜数据
let getTopList = ()=>sendHttp(`/api/front/product/leaderboard`,'get')

//获取商品列表
let getGoodsList = (listBtmIndex) =>sendHttp(`/api/front/index/product/${listBtmIndex}/?page=1&limit=10`,'get')

export {
    getCate,
    getGoodsList,
    getTopList
}