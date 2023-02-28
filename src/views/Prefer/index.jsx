import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { Toast, Empty, Tabs } from 'react-vant';
import { CouponO } from '@react-vant/icons'
import { getPrefer, getUnPrefer } from '../../api/mine'
import './index.css'

class Prefer extends Component {

    state = {
        //优惠券
        preferList: [],
        activeIndex:0
    }

    render() {
        let { preferList ,activeIndex } = this.state
        return (
            <div className='prefer'>
                <div>
                    <div className='prefer_header'>
                        <Tabs color={'#e93323'} onChange={(tabIndex)=>this.changeIndex(tabIndex)}>
                            <Tabs.TabPane key={0} title={`未使用`}>
                            </Tabs.TabPane>
                            <Tabs.TabPane key={1} title={`已使用/过期`}>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
                <div className='youhuiquan'>
                    {
                        preferList.length === 0 ? <Empty
                            imageSize={90}
                            image={<CouponO fontSize={90} color='#999' />}
                            description="暂无优惠券~~~" >
                        </Empty> : <div>
                            {
                                preferList.map((item, index) => {
                                    return (
                                        <div className='yhqitem' key={index}>
                                            <div className='yhqitem1' style={{backgroundColor:activeIndex===0?'#e93323':'#a6a6a6'}}>
                                                <div className='yhqleft'><span className='hb'>￥</span><span className='money'>{+item.money}</span></div>
                                                <p className='manjian'>满{+item.minPrice}元可用</p>
                                            </div>
                                            <div className='yhqitem2'>
                                                <div className='yhqright'><span className='tongyong'>通用</span><span>{item.name}</span></div>
                                                <div className='yhqright2'>
                                                    <div>{item.useStartTimeStr}~{item.useEndTimeStr}</div>
                                                    <div className='keyong' style={{backgroundColor:activeIndex===0?'#e93323':'#a6a6a6',borderColor:activeIndex===0?'#e93323':'#a6a6a6'}}>{activeIndex===0?'可用':'过期'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='dixian'>我也是有底线的~</div>
                        </div>
                    }
                </div>
            </div>
        )
    }

    //改变索引时
    changeIndex(tabIndex){
        this.setState({
            activeIndex:tabIndex
        },()=>{
            if(this.state.activeIndex===0){
                this.getUse()
            }else{
                this.getUnUse()
            }
        })
    }

    //获取可用优惠券
    async getUse() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        let res = await getPrefer()
        this.setState({
            preferList: res.data.data.list
        }, () => {
            Toast.clear()
        })
    }
    //获取不可用优惠券
    async getUnUse() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        let res = await getUnPrefer()
        this.setState({
            preferList: res.data.data.list
        }, () => {
            Toast.clear()
        })
    }

    componentDidMount() {
        this.getUse()
    }
}

export default WithRouter(Prefer)
