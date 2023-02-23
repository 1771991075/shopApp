import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast, Card, ProductCard, Input, SubmitBar } from 'react-vant';
import { WapHomeO, Ellipsis, Arrow } from '@react-vant/icons'
import { getOrderInfo } from '../../api/order'
import './index.css'

class Order extends Component {

    state = {
        //总的订单详情
        orderInfo: null,
        //订单列表
        orderDetailList: [],
        //商品总价
        sum:0
    }

    render() {
        let { orderDetailList,sum } = this.state
        let { router } = this.props
        return (
            <div className='order'>
                <div>
                    <div className='order_header'>
                        <NavBar
                            title='提交订单'
                            leftText={<WapHomeO fontSize={20} />}
                            rightText={<Ellipsis fontSize={20} />}
                            onClickLeft={() => router.navigate(-1)}
                            onClickRight={() => Toast('更多')}
                            fixed
                        />
                    </div>
                    <div className='orderaddress'>
                        <div className='order_address'>
                            <div className='order_shouhuodizhi'>
                                <span>收货地址</span>
                            </div>
                            <div className='address' onClick={this.props.router.navigate('/address')}>
                                <span>[默认]</span>
                                <span><Arrow color='#555' /></span>
                            </div>
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
                            <Card.Body><span className='order_left_info'>备注信息</span><Input.TextArea placeholder="字数统计" maxLength={50} showWordLimit /></Card.Body>
                        </Card>
                        <Card round>
                            <Card.Body>支付方式</Card.Body>
                        </Card>
                        <Card round>
                            <Card.Body><span>商品总价:</span><span>￥{sum}</span></Card.Body>
                        </Card>
                        <div className="demo-submit-bar"><SubmitBar price={`${sum}00`} buttonText="提交订单" /></div>
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
        //获取订单信息
        let res = await getOrderInfo(preOrderNo)
        console.log(res)
        let orderInfo = res.data.data.orderInfoVo
        this.setState({
            orderInfo: orderInfo,
            orderDetailList: orderInfo.orderDetailList
        }, () => {
            //商品总价
            let {sum,orderDetailList} = this.state
            orderDetailList.forEach(item => {
                sum += +item.price
            })
            this.setState({sum:sum})
            Toast.clear()
        })
    }
}

export default WithRouter(Order)
