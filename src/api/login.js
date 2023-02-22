import sendHttp from "../utils/http";

//发送手机验证码
let sedUserCode = (data) => sendHttp(`/api/front/sendCode`,'post',data,{
    'content-type':'application/x-www-form-urlencoded'
})

//用户手机号登录
let userLogin = (data) => sendHttp(`/api/front/login/mobile`,'post',data)


export {
    sedUserCode,
    userLogin
}