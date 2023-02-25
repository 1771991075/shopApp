import sendHttp from "../utils/http";

//获取地址列表
let getAddressList = () => sendHttp(`/api/front/address/list?page=1&limit=5`,'get')

//改变默认地址
let changeDefault = (data) => sendHttp(`/api/front/address/default/set`,'post',data)

//删除收货地址
let deleteAddress = (data) => sendHttp(`/api/front/address/del`,'post',data)

//添加收货地址
let addAddres = (data) => sendHttp(`/api/front/address/edit`,'post',data)

export {
    getAddressList,
    changeDefault,
    deleteAddress,
    addAddres
}