import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Search, ActionBar, Button } from 'react-vant';
import { CartO, StarO } from '@react-vant/icons'
import Content from '../../component/Content'
import {getShopInfo,getGoodShop} from '../../api/info'
import InfoSwiper from '../../component/Info/InfoSwiper';
import ShopInfo from '../../component/Info/ShopInfo';
import GoodShop from '../../component/Info/GoodShop';
import './index.css'
class Info extends Component {
    state = {
        //轮播图片
        images: null,
        //商品详情
        shop: null,
        //优品推荐列表
        goodShop: null
    }

    componentDidMount() {
        let [search] = this.props.router.searchParams
        let id = search.get('id')
        getShopInfo(id).then(res => {
            console.log(res.data.data.productInfo);
            this.setState({
                shop: res.data.data.productInfo,
                images: JSON.parse(res.data.data.productInfo.sliderImage)
            })
        })
        getGoodShop().then(res=>this.setState({goodShop:res.data.data}))
    }

    render() {
        const { shop, images ,goodShop} = this.state
        return (
            <div className='info'>
                <div className='infoTop'>
                    <NavBar
                        title={<Search placeholder="搜索商品" shape="round" align="center" color='#e93323' />}
                        onClickLeft={() => this.props.router.navigate(-1)}
                    />
                    {
                        images && (<InfoSwiper images={images}/>)
                    }
                </div>
                {
                    shop && <ShopInfo shop={shop} />
                }
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
                <div className='goodShop'>
                    {
                        goodShop && <GoodShop goodShop={goodShop}/>
                    }
                </div>
                <div className='shopxiangqing'>
                    <p>商品详情</p>
                </div>
                <div className='shopcontent'>
                    {
                        shop && <Content>{shop.content}</Content>
                    }
                </div>
                <div className='demo-action-bar'>
                    <ActionBar>
                        <ActionBar.Icon icon={<CartO color='red' />} text='购物车' />
                        <ActionBar.Icon icon={<StarO color='red' />} text='店铺' />
                        <ActionBar.Button type='warning' text='加入购物车' />
                        <ActionBar.Button type='danger' text='立即购买' />
                    </ActionBar>
                </div>
            </div>
        )
    }
}

export default WithRouter(Info)
