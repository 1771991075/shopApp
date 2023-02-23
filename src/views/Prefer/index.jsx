import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast ,Empty} from 'react-vant';
import { ArrowLeft, Ellipsis,CouponO } from '@react-vant/icons'
import './index.css'

class Prefer extends Component {

    state = {
        //优惠券
        preferList: []
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
                        preferList.length === 0 ? <Empty
                            imageSize={90}
                            image={<CouponO fontSize={90} color='#999' />}
                            description="暂无优惠券~~~" >
                        </Empty> : <div></div>
                    }
                </div>
            </div>
        )
    }
    componentDidMount(){
        
    }
}

export default WithRouter(Prefer)
