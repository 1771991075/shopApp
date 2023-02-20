import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Search, ActionBar, Swiper, Button } from 'react-vant';
import { CartO, Star } from '@react-vant/icons'
import Content from '../../component/Content'
import './index.css'
class Info extends Component {
    state = {
        //轮播图片
        images: [],
        //商品详情
        shop: null,
        price: '',
        storeName: '',
        otPrice: '',
        stock: '',
        sales: '',
        content:''
    }

    componentDidMount() {
        let [search] = this.props.router.searchParams
        let id = search.get('id')
        this.$axios.get(`/shopapp/api/front/product/detail/${id}?type=normal`).then(res => {
            console.log(res.data.data.productInfo);
            this.setState({
                //商品详情
                shop: res.data.data.productInfo,
                //轮播图
                images: JSON.parse(res.data.data.productInfo.sliderImage),
                //商品现价
                price: res.data.data.productInfo.price,
                //商品名称
                storeName: res.data.data.productInfo.storeName,
                //商品原价
                otPrice: res.data.data.productInfo.otPrice,
                //商品库存
                stock: res.data.data.productInfo.stock,
                //商品已售
                sales: res.data.data.productInfo.sales,
                //商品详情图片
                content:res.data.data.productInfo.content
            })
        })
    }

    render() {
        const { images, price, storeName, otPrice, stock, sales,content } = this.state
        return (
            <div className='info'>
                <div className='infoTop'>
                    <NavBar
                        title={<Search placeholder="搜索商品" shape="round" align="center" color='#e93323' fixed={true} />}
                        onClickLeft={() => this.props.router.navigate(-1)}
                    />
                    <Swiper autoplay={3000} className="lbtimg">
                        <Swiper.Item>
                            <div><img src={images[0]} alt="" className='imggg' /></div>
                        </Swiper.Item>
                        <Swiper.Item>
                            <div><img src={images[1]} alt="" className='imggg' /></div>
                        </Swiper.Item>
                        <Swiper.Item>
                            <div><img src={images[2]} alt="" className='imggg' /></div>
                        </Swiper.Item>
                        <Swiper.Item>
                            <div><img src={images[3]} alt="" className='imggg' /></div>
                        </Swiper.Item>
                        <Swiper.Item>
                            <div><img src={images[4]} alt="" className='imggg' /></div>
                        </Swiper.Item>
                    </Swiper>
                </div>
                <div className='infoxinxi'>
                    <p className='infoprice'>￥{price}</p>
                    <p className='infotitle'>{storeName}</p>
                    <div className='infokucun'>
                        <span>￥{otPrice}</span>
                        <span>库存:{stock}</span>
                        <span>销量:{sales}</span>
                    </div>
                </div>
                <div className='guige'>
                    <Button
                        block
                        type="primary"
                        color="linear-gradient( 135deg, #3f45ff 10%, #7367F0 100%)"
                    // onClick={() => ref.current?.show(initialSku)}
                    >
                        <span>已选择:</span>
                    </Button>
                </div>
                <div className='shopxiangqing'>
                    <p>商品详情</p>
                </div>
                <div className='shopcontent'>
                    <Content>
                        {content}
                    </Content>
                </div>
                <div className='demo-action-bar'>
                    <ActionBar>
                        <ActionBar.Icon icon={<CartO color='red' />} text='购物车' />
                        <ActionBar.Icon icon={<Star color='red' />} text='店铺' />
                        <ActionBar.Button type='warning' text='加入购物车' />
                        <ActionBar.Button type='danger' text='立即购买' />
                    </ActionBar>
                </div>
            </div>
        )
    }
}

export default WithRouter(Info)
