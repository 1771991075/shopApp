import React, { Component } from 'react'
import './index.css'
import { Swiper } from 'react-vant';
import Lazyimg from 'react-lazyimg-component';
import loading from '../../../assets/loading.png'

export default class GoodShop extends Component {
    render() {
        const { goodShop } = this.props
        return (
            <div className='goodshop'>
                <p className='yptj'>优品推荐</p>

                <div className='goodshopswiper'>
                    <Swiper autoplay={3000}>
                        <Swiper.Item>
                            <div className='goodshoplist'>
                                {
                                    goodShop.list.map((item, index) => {
                                        return <div key={index} className='goodshopitem'>
                                            <div className='goodshopimg'><Lazyimg className="lazy" src={item.image} placeholder={<img src={loading} alt='加载失败' />} /></div>
                                            <div className='goodshopname'>{item.storeName}</div>
                                            <p>￥{item.price}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </Swiper.Item>
                        <Swiper.Item>
                            <div><Lazyimg className="lazy111" src='' placeholder={<img src={loading} alt='加载失败' />} /></div>
                        </Swiper.Item>
                    </Swiper>
                </div>
            </div>
        )
    }
}

