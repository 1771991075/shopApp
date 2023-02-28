import sendHttp from "../utils/http";

//获取用户信息
let getUser = () => sendHttp(`api/front/user`,'get')

//发送头像
let sendImg = (data) =>sendHttp(`/api/front/upload/image?model=maintain&pid=0`,'post',data)

//保存个人修改信息
let saveUser = (data) => sendHttp(`/api/front/user/edit`,'post',data)

//获取优惠券
let getPrefer = ()=> sendHttp(`api/front/coupon/list?page=1&limit=20&type=usable`,'get')

//获取过期的优惠券
let getUnPrefer = () => sendHttp(`/api/front/coupon/list?page=1&limit=20&type=unusable`,'get')

export {
    getUser,
    sendImg,
    saveUser,
    getPrefer,
    getUnPrefer
}