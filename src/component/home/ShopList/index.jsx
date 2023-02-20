import React, { Component } from 'react'
import Lazyimg from 'react-lazyimg-component';
import WithRouter from '../../../router/withRouter';
import loading from '../../../assets/loading.png'

class ShopList extends Component {
    render() {
        return (
            <div className='btmcate'>
                {
                    this.props.listBtm.map((item, index) => {
                        return (
                            <div className='btmlist1' key={index} onClick={() => this.props.router.navigate(`/info?id=${item.id}`) }>
                                <div className='itemimg'>
                                    <Lazyimg className="lazy" src={item.image} placeholder={<img src={loading} alt='加载失败'/>}/>
                                </div>
                                <div className='itemxinxi'>
                                    <p className='itemtitle'>{item.storeName}</p>
                                    <p className='itemotprice'>￥{item.otPrice}</p>
                                    <p className='itemprice'>￥{item.price}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

export default WithRouter(ShopList)
