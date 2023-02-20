import Lazyimg from 'react-lazyimg-component';
import React from 'react'
import {Swiper} from 'react-vant';
import './index.css'
import loading from '../../../assets/loading.png'

export default function index() {
  return (
    <div>
        <div className="demo-swiper">
            <Swiper autoplay={2000}>
              <Swiper.Item>
                <div>
                    <Lazyimg className="lazyy" src={'https://api.java.crmeb.net/crmebimage/public/content/2022/08/04/0f78716213f64bfa83f191d51a832cbf73f6axavoy.jpg'} placeholder={<img className='loadimg' src={loading} alt='加载失败'/>}/>
                </div>
              </Swiper.Item>
              <Swiper.Item>
                <div>
                    <Lazyimg className="lazyy" src={'https://api.java.crmeb.net/crmebimage/public/content/2023/01/11/be09e755268b43ee90b0db3a3e1b7132r7a6t2wvsm.jpg'} placeholder={<img className='loadimg' src={loading} alt='加载失败'/>}/>
                </div>
              </Swiper.Item>
            </Swiper>
        </div>
    </div>
  )
}

