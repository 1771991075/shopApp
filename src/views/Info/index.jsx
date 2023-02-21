import React, { Component, createRef } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Search, ActionBar, Button, ImagePreview, Tabs } from 'react-vant';
import { CartO, StarO } from '@react-vant/icons'
import Content from '../../component/Content'
import { getShopInfo, getGoodShop } from '../../api/info'
import InfoSwiper from '../../component/Info/InfoSwiper';
import ShopInfo from '../../component/Info/ShopInfo';
import GoodShop from '../../component/Info/GoodShop';
import './index.css'
class Info extends Component {

    swiperRef = createRef()

    state = {
        //轮播图片
        images: null,
        //商品详情
        shop: null,
        //优品推荐列表
        goodShop: null,
        //富文本标签图片列表
        imgList: []
    }

    async componentDidMount() {
        let [search] = this.props.router.searchParams
        let id = search.get('id')
        let imgList = []
        let res = await getShopInfo(id)
        console.log(res.data.data.productInfo);
        let scrollHeight = 0
        this.setState({
            shop: res.data.data.productInfo,
            images: JSON.parse(res.data.data.productInfo.sliderImage)
        }, () => {
            res.data.data.productInfo.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
                imgList.push(capture);
            })
            this.setState({ imgList })
            //获取轮播图高度
            scrollHeight = this.swiperRef.current.clientHeight
        })
        getGoodShop().then(res => this.setState({ goodShop: res.data.data }))

        //开启滚动监听
        window.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop
            let tab = document.querySelector(".rv-sticky")
            if (scrollTop >= scrollHeight) {
                tab.style.display = 'block'
            } else {
                tab.style.display = 'none'
            }
        }
    }

    componentWillUnmount() {
        window.onscroll = null
    }

    render() {
        const { shop, images, goodShop, imgList } = this.state
        return (
            <div className='info'>
                <Tabs
                    defaultActive={0}
                    sticky
                    scrollspy={{ autoFocusLast: true, reachBottomThreshold: 50 }}
                    color={'#e93323'}
                >
                    <Tabs.TabPane title={`商品`} >
                        <div className='infoTop'>
                            <NavBar
                                title={<Search placeholder="搜索商品" shape="round" align="center" color='#e93323' />}
                                onClickLeft={() => this.props.router.navigate(-1)}
                            />
                            <div ref={this.swiperRef} >
                                {
                                    images && (<InfoSwiper images={images} />)
                                }
                            </div>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane title={`评价`}>
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
                    </Tabs.TabPane>
                    <Tabs.TabPane title={`推荐`}>
                        <div className='goodShop'>
                            {
                                goodShop && <GoodShop goodShop={goodShop} />
                            }
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane title={`详情`}>
                        <div className='shopxiangqing'>
                            <p>商品详情</p>
                        </div>
                        <div className='shopcontent' onClick={(e) => this.showImg(e)}>
                            {
                                shop && <Content imgList={imgList}>{shop.content}</Content>
                            }
                        </div>
                    </Tabs.TabPane>
                </Tabs>

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
    showImg(e) {
        //获取当前点击的图片的路径
        let imgsrc = e.target.currentSrc
        let index = this.state.imgList.findIndex(item => item === imgsrc)
        ImagePreview.open({
            images: this.state.imgList,
            startPosition: index
        })
    }
}

export default WithRouter(Info)
