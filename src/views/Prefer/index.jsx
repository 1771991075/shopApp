import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast ,Empty ,Cell} from 'react-vant';
import { ArrowLeft, Ellipsis,CouponO } from '@react-vant/icons'
import {getUser} from '../../api/mine'
import './index.css'

class Prefer extends Component {

    state = {
        //优惠券
        preferList: 0
    }

    render() {
        let { preferList } = this.state
        return (
            <div className='prefer'>
                <div>
                    <div className='prefer_header'>
                        <NavBar
                            title='优惠券'
                            leftText={<ArrowLeft fontSize={20} />}
                            rightText={<Ellipsis fontSize={20} />}
                            onClickLeft={() => this.props.router.navigate(-1)}
                            onClickRight={() => Toast('更多')}
                            fixed
                        />
                    </div>
                </div>
                <div className='youhuiquan'>
                    {
                        preferList === 0 ? <Empty
                            imageSize={90}
                            image={<CouponO fontSize={90} color='#999' />}
                            description="暂无优惠券~~~" >
                        </Empty> : <div>
                            <Cell title='优惠券' isLink value={`${preferList}张可用`} />
                        </div>
                    }
                </div>
            </div>
        )
    }
    async componentDidMount(){
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        let res = await getUser()
        this.setState({
            preferList:res.data.data.couponCount
        },()=>{
            Toast.clear()
        })
    }
}

export default WithRouter(Prefer)
