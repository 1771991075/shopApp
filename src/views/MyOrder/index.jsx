import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast, Empty } from 'react-vant';
import { WapHomeO, Ellipsis ,OrdersO } from '@react-vant/icons'
import { getCount, willCount ,removeOrder} from '../../api/order'
import './index.css'

class MyOrder extends Component {

    state = {
        list: [
            {
                name: '待付款',
                count: 0
            }, {
                name: '待发货',
                count: 0
            }, {
                name: '待收货',
                count: 0
            }, {
                name: '待评价',
                count: 0
            }, {
                name: '已完成',
                count: 0
            }
        ],
        activeIndex: 0,
        Count: null,
        willList: [],
        //总金额
        sum: 0,
    }

    render() {
        let { list, activeIndex, Count, willList, sum } = this.state
        return (
            <div className='myorder'>
                {
                    Count && (
                        <div>
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
                                        <p><span>消费订单:{Count.orderCount}</span><span>总消费:{Count.sumPrice}</span></p>
                                    </div>
                                    <div>
                                        <OrdersO  fontSize={50}/>
                                    </div>
                                </div>
                            </div>
                            <div className='ordercate'>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <div className='ordercateitem' key={index} onClick={() => this.setState({ activeIndex: index }, () => this.getCateList())}>
                                                <div className={activeIndex === index ? 'active' : ''}>{item.name}</div>
                                                <div className={activeIndex === index ? 'on' : ''}>{item.count}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                <div className='myorder-btm'>
                    {
                        willList.length !== 0 && willList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className='will'>
                                        <div className='time'>
                                            <span className='timer'>{item.createTime}</span>
                                            <span className='daizhifu'>{item.orderStatus}</span>
                                        </div>
                                        <div className='will_mid'>
                                            <div className='will_img'>
                                                <img src={item.orderInfoList[0].image} alt="" />
                                            </div>
                                            <div className='mid_text'>
                                                <p className='text1'>{item.orderInfoList[0].storeName}</p>
                                            </div>
                                            <div className='mid_price'>
                                                <div>￥{item.payPrice}</div>
                                                <div>x{item.totalNum}</div>
                                            </div>
                                        </div>
                                        <div className='mid_jine'>
                                            <div></div>
                                            <p>共{willList.length}件商品，总金额<span>￥{sum}</span></p>
                                        </div>
                                        <div className='mid_btn'>
                                            <div></div>
                                            <div>
                                                <button className='delbtn' onClick={()=>this.remove(item.id)}>取消订单</button>
                                                <button onClick={()=>this.nowPay()}>立即支付</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dixian'>我也是有底线的</div>
                                </div>

                            )
                        })
                    }
                    {
                        willList.length === 0 && <div><Empty description="暂无订单信息~"></Empty></div>
                    }
                </div>
            </div>
        )
    }

    // 获取每个类别的列表
    async getCateList() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        let { activeIndex, sum } = this.state
        let res1 = await willCount(activeIndex)
        res1.data.data.list.forEach(item => {
            sum += +item.payPrice
        })
        this.setState({
            willList: res1.data.data.list,
            sum: sum
        }, () => {
            Toast.clear()
        })
    }

    async componentDidMount() {
        let [search] = this.props.router.searchParams
        let index = search.get('index')
        let { list } = this.state
        let res = await getCount()
        let SumCount = res.data.data
        list[0].count = SumCount.unPaidCount
        list[1].count = SumCount.unShippedCount
        list[2].count = SumCount.receivedCount
        list[3].count = SumCount.evaluatedCount
        list[4].count = SumCount.completeCount
        this.getCateList()
        this.setState({
            Count: SumCount,
            list,
            activeIndex:+index
        })
    }
    //立即支付
    nowPay(){
        
    }

    //取消订单
    remove(id){
        let res = removeOrder(id)
        if(res.data.code ===200){
            Toast.success('取消成功')
        }else{
            Toast.fail(res.data.message)
        }
    }
}

export default WithRouter(MyOrder)
