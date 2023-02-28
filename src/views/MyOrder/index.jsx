import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast} from 'react-vant';
import { WapHomeO, Ellipsis } from '@react-vant/icons'
import './index.css'

class MyOrder extends Component {

    state = {
        list: [
            {
                name: '待付款',
            }, {
                name: '待发货',
            }, {
                name: '待收货',
            }, {
                name: '待评价',
            }, {
                name: '已完成',
            }
        ],
        activeIndex:0
    }

    render() {
        let { list ,activeIndex } = this.state
        return (
            <div className='myorder'>
                <div className='myorder_header'>
                    <NavBar
                        title='提交订单'
                        leftText={<WapHomeO fontSize={20} />}
                        rightText={<Ellipsis fontSize={20} />}
                        onClickLeft={() => this.props.router.navigate(-1)}
                        onClickRight={() => Toast('更多')}
                        fixed
                    />
                    <div className='myorderInfo'>
                        <div>
                            <p className='ddxx'>订单信息</p>
                            <p><span>消费订单:0</span><span>总消费:0.00</span></p>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className='ordercate'>
                    {
                        list.map((item, index) => {
                            return (
                                <div className='ordercateitem' key={index} onClick={()=>this.setState({activeIndex:index})}>
                                    <div className={activeIndex===index?'active':''}>{item.name}</div>
                                    <div className={activeIndex===index?'on':''}>0</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='myorder-btm'>
                    <div className='will'>
                        <div className='time'>
                            <span className='timer'>2023-02-27</span>
                            <span className='daizhifu'>待支付</span>
                        </div>
                        <div className='will_mid'>
                            <div className='will_img'>
                                <img src="" alt="" />
                            </div>
                            <div className='mid_text'>
                                <p>小米</p>
                            </div>
                            <div className='mid_price'>
                                <p>￥5000</p>
                                <p>x1</p>
                            </div>
                        </div>
                        <div className='mid_jine'>
                            <p>共一件商品，总金额<span>￥5000</span></p>
                        </div>
                        <div>
                            <button>取消订单</button>
                            <button>立即支付</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WithRouter(MyOrder)
