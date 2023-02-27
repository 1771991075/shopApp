import sendHttp from "../utils/http";

//获取用户信息
let getUser = () => sendHttp(`api/front/user`,'get')

//发送头像
let sendImg = (data) =>sendHttp(`/api/front/upload/image?model=maintain&pid=0`,'post',data)

//保存个人修改信息
let saveUser = (data) => sendHttp(`/api/front/user/edit`,'post',data)

export {
    getUser,
    sendImg,
    saveUser
}