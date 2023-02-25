import sendHttp from "../utils/http";

//获取热门标签
let getHot = () => sendHttp(`/api/front/search/keyword`,'get')

//获取热门商品列表
let getHotList = () => sendHttp(`/api/front/product/hot`,'get')

//搜索
let searchShop = (keyWord) => sendHttp(`/api/front/products?keyword=${keyWord}`,'get')

export {
    getHot,
    getHotList,
    searchShop
}