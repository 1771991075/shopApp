import sendHttp from "../utils/http";

//获取收藏列表
let getCollectList = () => sendHttp(`/api/front/collect/user?page=1&limit=8`,'get')


export {
    getCollectList
}