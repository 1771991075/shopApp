import sendHttp from "../utils/http";

//发送手机验证码
let sendCode = () => sendHttp(`/api/front/sendCode`,'post')

//用户手机号登录
let userLogin = () => sendHttp(`/api/front/login/mobile`,'post')


export {
    sendCode,
    userLogin
}