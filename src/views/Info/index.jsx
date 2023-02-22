import React, { Component, createRef } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Search, ActionBar, ImagePreview, Tabs, Cell, Rate, Toast } from 'react-vant';
import { CartO, StarO ,Star } from '@react-vant/icons'
import Content from '../../component/Content'
import { getShopInfo, getGoodShop, getUserComments ,addUserCollect ,removeUserCollect } from '../../api/info'
import InfoSwiper from '../../component/Info/InfoSwiper';
import ShopInfo from '../../component/Info/ShopInfo';
import GoodShop from '../../component/Info/GoodShop';
import InfoPopup from '../../component/Info/Popup';
import bus from '../../utils/bus'
import './index.css'
class Info extends Component {

    swiperRef = createRef()

    state = {
        shop: null,
        //轮播图片
        images: null,
        //商品详情
        msgInfo: {
            price: '',
            otPrice: '',
            storeName: "",
            sales: 0,
            stock: 0,
            image: "",
            sku: ""
        },
        //优品推荐列表
        goodShop: null,
        //富文本标签图片列表
        imgList: [],
        //商品规格
        productAttr: [],
        //存放每个商品规格的索引
        skuList: [],
        // sku规格对应的详情数据对象
        productValue: [],
        //用户评价
        InfoUserComments: null,
        //用户收藏
        userCollect:false
    }

    async componentDidMount() {
        let [search] = this.props.router.searchParams
        let id = search.get('id')
        let imgList = []
        let res = await getShopInfo(id)
        console.log(res);
        this.setState({
            userCollect:res.data.data.userCollect
        })
        let scrollHeight = 0
        //获取商品规格
        let productAttr = res.data.data.productAttr
        let skuList = []
        //处理商品规格等选项
        productAttr.forEach(item => {
            skuList.push(0)
            item.attrValues = item.attrValues.split(',')
        })
        let productValue = res.data.data.productValue
        this.setState({
            shop: res.data.data.productInfo,
            images: JSON.parse(res.data.data.productInfo.sliderImage),
            productAttr,
            productValue,
            skuList
        }, () => {
            res.data.data.productInfo.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
                imgList.push(capture);
            })
            this.setState({ imgList })
            //获取轮播图高度
            scrollHeight = this.swiperRef.current.clientHeight
            this.getShopInfo()
        })
        //获取推荐列表
        getGoodShop().then(res => this.setState({ goodShop: res.data.data }))
        //获取用户评价
        getUserComments(id).then(res => this.setState({ InfoUserComments: res.data.data }))

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

    getShopInfo() {
        //获取初始化选择的sku名称
        let skuName = []
        this.state.skuList.forEach((item, index) => {
            //获取每个属性默认选择的值
            let attr = this.state.productAttr[index].attrValues[item]
            skuName.push(attr)
        })
        //处理当前选中的商品的规格
        skuName = skuName.join(',')
        //获取当前规格对象
        let productValue = this.state.productValue;
        let skuInfo = productValue[skuName];
        console.log(skuInfo);
        let { msgInfo } = this.state;
        msgInfo.price = skuInfo.price;
        msgInfo.otPrice = skuInfo.otPrice;
        msgInfo.sales = skuInfo.sales;
        msgInfo.stock = skuInfo.stock;
        msgInfo.storeName = this.state.shop.storeName;
        msgInfo.image = skuInfo.image;
        msgInfo.sku = skuInfo.suk;
        msgInfo.productAttrUnique = skuInfo.id;
        msgInfo.productId = skuInfo.productId;
        this.setState({
            msgInfo
        })
    }

    componentWillUnmount() {
        window.onscroll = null
    }

    render() {
        const { shop, images, goodShop, imgList, productAttr, skuList, msgInfo, InfoUserComments ,userCollect } = this.state
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
                            <Cell title={`已选择: ${msgInfo.sku}`} isLink onClick={() => { this.changeIsShow() }} />
                        </div>
                        {
                            InfoUserComments && (
                                <div className='pingjia'>
                                    <p>用户评价({InfoUserComments.sumCount})</p>
                                    <div className='pingjiaxinxi'>
                                        <div className='pingjiauserImg'>
                                            <img src={InfoUserComments.productReply.avatar} alt="" />
                                        </div>
                                        <div className='pingjiaInfo'>
                                            <div className='pingjiaInfo2'>
                                                <span className='pingjiaspan1'>{InfoUserComments.productReply.nickname}<Rate size={'13px'} gutter={'2px'} color={'rgb(255, 210, 30)'} value={InfoUserComments.productReply.score}
                                                    onChange={(e) => {
                                                        InfoUserComments.productReply.score = e
                                                        this.setState({InfoUserComments})
                                                    }} /></span>
                                                <span className='pingjiaspan1'>{InfoUserComments.productReply.createTime}</span>
                                            </div>
                                            <p className='pingjiaspan1'>{InfoUserComments.productReply.sku}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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
                        <ActionBar.Icon icon={<CartO color='red' />} text='购物车' onClick={()=>this.props.router.navigate('/index/cart')}/>
                        <ActionBar.Icon icon={userCollect?<Star color='red'/>:<StarO color='red' />} text='收藏' onClick={()=>this.changeUserCollect()} />
                        <ActionBar.Button type='warning' text='加入购物车' onClick={()=>this.changeIsShow()} />
                        <ActionBar.Button type='danger' text='立即购买' onClick={()=>this.changeIsShow()}  />
                    </ActionBar>
                </div>
                <InfoPopup  skuList={skuList} productAttr={productAttr} userCollect={userCollect} msgInfo={msgInfo} setSkuList={(skuList) => {
                    this.setState({ skuList },()=> this.getShopInfo())}} getCollect={()=>this.changeUserCollect()}/>
            </div>
        )
    }

    //点击收藏、取消收藏
    async changeUserCollect(){
        if(this.state.userCollect){
            let res = await removeUserCollect(this.state.msgInfo.productId)
            console.log(res);
            if(res.data.code === 200){
                Toast.success('取消收藏')
                this.setState({
                    userCollect:false
                })
                return
            }
            Toast.info(res.data.message)
        }else{
            let data = {
                category:"product",
                id:this.state.msgInfo.productId
            }
            let res = await addUserCollect(data)
            console.log(res);
            if(res.data.code === 200){
                Toast.success('收藏成功')
                this.setState({
                    userCollect:true
                })
                return
            }
            Toast.info(res.data.message)
        }
    }

    //点击展示的图片
    showImg(e) {
        //获取当前点击的图片的路径
        let imgsrc = e.target.currentSrc
        let index = this.state.imgList.findIndex(item => item === imgsrc)
        ImagePreview.open({
            images: this.state.imgList,
            startPosition: index
        })
    }
    //打开弹出层
    changeIsShow() {
        // 调用子组件方法改变子组件状态
        // this.popupRef.current.isShow()
        bus.emit('sendIsShow',true)
    }
}

export default WithRouter(Info)
