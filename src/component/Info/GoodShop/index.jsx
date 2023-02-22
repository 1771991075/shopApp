import React, { Component } from 'react'
import './index.css'
import { Swiper } from 'react-vant';
import Lazyimg from 'react-lazyimg-component';
import loading from '../../../assets/loading.png'

export default class GoodShop extends Component {
    state = {
        goodShopList: []
    }

    componentDidMount() {
        const { goodShop } = this.props
        let list = goodShop.list
        //总数量
        let sum = list.length
        //总共几个元素
        let num = Math.ceil(sum / 6)
        let arry = []
        for (let i = 0; i < num; i++) {
            arry[i] = list.splice(0, 6)
        }
        this.setState({
            goodShopList: arry
        })
    }

    render() {
        const { goodShopList } = this.state
        return (
            <div className='goodshop'>
                <p className='yptj'>优品推荐</p>

                <div className='goodshopswiper'>
                    {
                        goodShopList.length !== 0 && (
                            <Swiper autoplay={3000}>
                                {
                                    goodShopList.map((item, index) => {
                                        return (
                                            <Swiper.Item key={index}>
                                                <div className='goodshoplist'>
                                                    {
                                                        item.map((like, i) => {
                                                            return <div key={i} className='goodshopitem'>
                                                                <div className='goodshopimg'><Lazyimg className="lazy" src={like.image} placeholder={<img src={loading} alt='加载失败' />} /></div>
                                                                <div className='goodshopname'>{like.storeName}</div>
                                                                <p>￥{like.price}</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </Swiper.Item>
                                        )
                                    })
                                }
                            </Swiper>
                        )
                    }
                </div>
            </div>
        )
    }
}

