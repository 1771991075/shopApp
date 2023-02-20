import React, { Component } from 'react'
import WithRouter from '../../../router/withRouter'
import Lazyimg from 'react-lazyimg-component';
import loading from '../../../assets/loading.png'

class ShopTopList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.listTop.map((item, index) => {
                        return (
                            <div key={index} className='paihangbangitem' onClick={() => this.props.router.navigate(`/info?id=${item.id}`)}>
                                <div className='itemimg'>
                                <Lazyimg className="lazy" src={item.image} placeholder={<img src={loading} alt='加载失败'/>}/>
                                </div>
                                <div className='itemright'>
                                    <div>
                                        <p>{item.storeName}</p>
                                    </div>
                                    <div className='price'>
                                        <div className='priceleft'>￥{item.price}</div>
                                        <div className='buycount'>销量{item.sales}件</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default WithRouter(ShopTopList)