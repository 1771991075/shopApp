import sendHttp from "../utils/http";

//生成订单号
let getOrder = (data) => sendHttp(`/api/front/order/pre/order`,'post',data)

//获取订单信息
let getOrderInfo = (preOrderNo) => sendHttp(`/api/front/order/load/pre/${preOrderNo}`,'get')

//获取优惠券
let getPrefer = (id) => sendHttp(`/api/front/coupons/order/${id}`,'get')

export {
    getOrder,
    getOrderInfo,
    getPrefer
}