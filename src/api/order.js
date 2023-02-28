import sendHttp from "../utils/http";

//生成订单号
let getOrder = (data) => sendHttp(`/api/front/order/pre/order`,'post',data)

//获取订单信息
let getOrderInfo = (preOrderNo) => sendHttp(`/api/front/order/load/pre/${preOrderNo}`,'get')

//获取优惠券
let getPrefer = (id) => sendHttp(`/api/front/coupons/order/${id}`,'get')

//生成订单
let getPayOrder = (data) =>sendHttp(`/api/front/order/create`,'post',data)

//确认订单
let payOrder = (data) => sendHttp(`/api/front/pay/payment`,'post',data)

//获取所有订单数量
let getCount = () => sendHttp(`/api/front/order/data`,'get')

//获取未收货。。。。
let willCount = (index) =>sendHttp(`/api/front/order/list?type=${index}&page=1&limit=20`,'get')

//取消订单
let removeOrder = (data) => sendHttp(`/api/front/order/cancel`,'post',data,{
    'content-type':'application/x-www-form-urlencoded'
})

export {
    getOrder,
    getOrderInfo,
    getPrefer,
    getPayOrder,
    payOrder,
    getCount,
    willCount,
    removeOrder
}