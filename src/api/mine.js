import sendHttp from "../utils/http";

//获取用户信息
let getUser = () => sendHttp(`api/front/user`,'get')

//修改用户信息
let changeUser = (data) => sendHttp(`/api/front/user/edit`,'post',data ,{
    'content-type':'application/x-www-form-urlencoded'
})

//发送头像
let sendImg = (data) =>sendHttp(`/api/front/upload/image?model=maintain&pid=0`,'post',data,{
    'content-type':'multipart/form-data'
})

export {
    getUser,
    changeUser,
    sendImg
}