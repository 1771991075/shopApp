import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast,Button } from 'react-vant';
import { Ellipsis,ArrowLeft,} from '@react-vant/icons'
import './index.css'

class Address extends Component {
    state={
        address:[]
    }
    render() {
        return (
            <div className='address'>
                <div className='address_header'>
                    <NavBar
                        title='收货地址'
                        leftText={<ArrowLeft fontSize={20} />}
                        rightText={<Ellipsis fontSize={20} />}
                        onClickLeft={() => this.props.router.navigate(-1)}
                        onClickRight={() => Toast('更多')}
                        fixed
                    />
                </div>
                <div>

                </div>
                <div className='addressbtm'>
                    <Button type='primary' color='#ee0a24' block round onClick={()=>this.props.router.navigate('/add/address')}>新增地址</Button>
                </div>
            </div>
        )
    }
}

export default WithRouter(Address)
