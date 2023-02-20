import React, { Component } from 'react'
import WithRouter from '../../../router/withRouter'
import {Swiper } from 'react-vant';
import Lazyimg from 'react-lazyimg-component';
import loading from '../../../assets/loading.png'

class InfoSwiper extends Component {
    render() {
        const {images} = this.props
        return (
            <div>
                <Swiper autoplay={3000} className="lbtimg">
                    {
                        images.map((item,index)=>{
                            return (
                                <Swiper.Item key={index}>
                                    <div><Lazyimg className="lazy imggg" src={item} placeholder={<img src={loading} alt='加载失败'/>}/></div>
                                </Swiper.Item>
                            )
                        })
                    }
                </Swiper>
            </div>
        )
    }
}

export default WithRouter(InfoSwiper)
