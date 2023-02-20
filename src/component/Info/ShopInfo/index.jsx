import React, { Component } from 'react'
import WithRouter from '../../../router/withRouter'

class ShopInfo extends Component {
    render() {
        const {shop} = this.props
        return (
            <div className='infoxinxi'>
                <p className='infoprice'>￥{shop.price}</p>
                <p className='infotitle'>{shop.storeName}</p>
                <div className='infokucun'>
                    <span>￥{shop.otPrice}</span>
                    <span>库存:{shop.stock}</span>
                    <span>销量:{shop.sales}</span>
                </div>
            </div>
        )
    }
}
export default WithRouter(ShopInfo)