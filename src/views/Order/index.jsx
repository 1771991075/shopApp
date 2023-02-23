import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast, Card, ProductCard, Input, SubmitBar } from 'react-vant';
import { WapHomeO, Ellipsis, Arrow, WechatPay ,Alipay } from '@react-vant/icons'
import { getOrderInfo } from '../../api/order'
import { getAddressList } from '../../api/address'
import './index.css'

class Order extends Component {

    state = {
        //总的订单详情
        orderInfo: null,
        //订单列表
        orderDetailList: [],
        //商品总价
        sum: 0,
        //默认地址
        defaultAddress: null,
        //备注信息
        remarkMsg:'',
        //付款方式
        payActive:0
    }

    render() {
        let { orderDetailList, sum, defaultAddress,remarkMsg,payActive } = this.state
        let { router } = this.props
        return (
            <div className='order'>
                <div>
                    <div className='order_header'>
                        <NavBar
                            title='提交订单'
                            leftText={<WapHomeO fontSize={20} />}
                            rightText={<Ellipsis fontSize={20} />}
                            onClickLeft={() => router.navigate('/index/home')}
                            onClickRight={() => Toast('更多')}
                            fixed
                        />
                    </div>
                    <div className='orderaddress' onClick={() => router.navigate('/address')}>
                        <div className='order_address'>
                            <div className='order_shouhuodizhi'>
                                <span className='shouhuidizhi'>收货地址</span>
                                <div>
                                    {
                                        defaultAddress !== null && <span className='shouhuoxingming'>{defaultAddress.realName}{defaultAddress.phone}</span>
                                    }
                                </div>
                                <div>
                                    <span className='getaddress'>[默认]</span>
                                    {
                                        defaultAddress != null && <span className='shdz'>{defaultAddress.province}{defaultAddress.city}{defaultAddress.district}{defaultAddress.detail}</span>
                                    }
                                </div>
                            </div>
                            <span><Arrow color='#555' /></span>
                        </div>
                    </div>
                    <div className='order_content'>
                        <Card round>
                            <Card.Body border>共{orderDetailList.length}件商品</Card.Body>
                            <Card.Body>
                                {
                                    orderDetailList && orderDetailList.map((item, index) => {
                                        return (
                                            <ProductCard key={index}
                                                num={item.payNum}
                                                price={item.price}
                                                desc={item.productName}
                                                title={item.sku}
                                                thumb={item.image}
                                            />
                                        )
                                    })
                                }
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body><span className='order_left_info'>快递费用</span><span>免运费</span></Card.Body>
                            <Card.Body><span className='order_left_info'>备注信息</span><Input.TextArea placeholder="请输入备注" maxLength={150} showWordLimit value={remarkMsg} onChange={(val)=>this.setState({remarkMsg:val})}/></Card.Body>
                        </Card>
                        <Card round>
                            <Card.Body>支付方式</Card.Body>
                            <div className={payActive===0?'activepay payff':'payff'} onClick={()=>{this.setState({payActive:0})}}>
                                <span className='payleft'><WechatPay color='#1989fa' fontSize={18}  />微信支付</span>
                                <span className='payright'>微信快捷支付</span>
                            </div>
                            <div className={payActive===1?'activepay payff':'payff'} onClick={()=>{this.setState({payActive:1})}}>
                                <span className='payleft'><Alipay color='#1989fa' fontSize={18} />支付宝支付</span>
                                <span className='payright'>支付宝快捷支付</span>
                            </div>
                        </Card>
                        <Card round>
                            <Card.Body><span>商品总价:</span><span>￥{sum}</span></Card.Body>
                        </Card>
                        <div className="demo-submit-bar"><SubmitBar price={sum * 100} buttonText="提交订单" onClick={()=>this.commitOrder()}/></div>
                    </div>
                </div>
            </div>
        )
    }
    async componentDidMount() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        let [search] = this.props.router.searchParams
        let preOrderNo = search.get('preOrderNo')
        //获取默认地址
        let res1 = await getAddressList()
        let addressList = res1.data.data.list
        let defaultIdx = addressList.findIndex(item => {
            return item.isDefault === true
        })
        //获取订单信息
        let res = await getOrderInfo(preOrderNo)
        console.log(res)
        let orderInfo = res.data.data.orderInfoVo
        this.setState({
            orderInfo: orderInfo,
            orderDetailList: orderInfo.orderDetailList,
            defaultAddress: addressList[defaultIdx]
        }, () => {
            //商品总价
            let { sum, orderDetailList } = this.state
            orderDetailList.forEach(item => {
                sum += +item.price
            })
            this.setState({ sum: sum })
            Toast.clear()
        })
    }
    //提交订单
    commitOrder(){

    }
}

export default WithRouter(Order)
