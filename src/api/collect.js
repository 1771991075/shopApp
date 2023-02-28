import sendHttp from "../utils/http";

//获取收藏列表
let getCollectList = () => sendHttp(`/api/front/collect/user?page=1&limit=8`,'get')

//取消多个收藏
let removeUserCollect1 = (data)=>sendHttp(`/api/front/collect/delete`,'post',data)

export {
    getCollectList,
    removeUserCollect1
}