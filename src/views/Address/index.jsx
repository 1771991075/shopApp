import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import './index.css'

class Address extends Component {
    render() {
        return (
            <div className='address'>
                <div className='address'>
                    <NavBar
                        title='收货地址'
                        leftText={<WapHomeO fontSize={20} />}
                        rightText={<Ellipsis fontSize={20} />}
                        onClickLeft={() => router.navigate(-1)}
                        onClickRight={() => Toast('更多')}
                        fixed
                    />
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default WithRouter(Address)
