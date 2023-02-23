import sendHttp from "../utils/http";

//获取用户信息
let getUser = () => sendHttp(`api/front/user`,'get')


export {
    getUser
}