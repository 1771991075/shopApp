import React, { Component } from 'react';
import { Popup, Stepper, Cell ,ActionBar ,Toast  } from 'react-vant';
import { CartO, StarO ,Star } from '@react-vant/icons';
import './index.css';
import bus from '../../../utils/bus';
import WithRouter from '../../../router/withRouter';
import {addCartList,getCartList} from '../../../api/cart';
import {getOrder} from '../../../api/order';

class InfoPopup extends Component {

    state = {
        isShow: false,
        //购买数量
        num:1
    }

    render() {
        let { isShow ,num } = this.state
        let { productAttr, skuList, msgInfo ,router ,userCollect,getCollect ,cartCount } = this.props
        return (
            <div>

                <Popup
                    visible={isShow}
                    closeable
                    round
                    style={{ height: '80%' }}
                    position='bottom'
                    onClose={() => this.setState({ isShow: false })}
                >

                    <div className='sku_content'>
                        <div className='sku_header'>
                            <div className='header_left'>
                                <img src={msgInfo.image} alt="" />
                            </div>
                            <div className='header_right'>
                                <p className='header_name'>{msgInfo.storeName}</p>
                                <p className='header_price'>￥{msgInfo.price}</p>
                                <p className='header_stock'> 库存:{msgInfo.stock}</p>
                            </div>
                        </div>
                        <div className='sku_info'>
                            {
                                productAttr.map((item, index) => {
                                    return (
                                        <div className='skuItem' key={index}>
                                            <div className='sku_name'>{item.attrName}:</div>
                                            <div className='sku_list'>
                                                {
                                                    item.attrValues.map((attr, i) => {
                                                        return (
                                                            <div className={skuList[index] === i ? 'sku_value sku_active' : 'sku_value'} key={i} onClick={() => this.changeSku(index, i)}>{attr}</div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <Cell title='数量:' center>
                                <Stepper
                                    value={num}
                                    theme='round'
                                    buttonSize='17'
                                    disableInput
                                    onClick={(value)=>this.setState({num:value})}
                                />
                            </Cell>
                        </div>
                        <div className='demo-action-bar'>
                            <ActionBar>
                                <ActionBar.Icon icon={<CartO color='red' />} text='购物车' badge={{ content: cartCount }} onClick={()=>router.navigate('/index/cart')} />
                                <ActionBar.Icon icon={userCollect?<Star color='red'/>:<StarO color='red' />} text='收藏' onClick={()=>getCollect()}/>
                                <ActionBar.Button type='warning' text='加入购物车' onClick={()=>{this.addCart()}} />
                                <ActionBar.Button type='danger' text='立即购买' onClick={()=>this.getOrderNum()}/>
                            </ActionBar>
                        </div>
                    </div>
                </Popup>
            </div>
        )
    }

    //生成订单号
    async getOrderNum(){
        let {msgInfo} = this.props
        let {num} = this.state
        let orderDetails = [{attrValueId: msgInfo.productAttrUnique, productId: msgInfo.productId, productNum: num}]
        let data = {
            preOrderType: "buyNow",
            orderDetails
        }
        let res = await getOrder(data)
        let preOrderNo = res.data.data.preOrderNo
        this.props.router.navigate(`/order?preOrderNo=${preOrderNo}`)
    }

    //加入购物车
    async addCart(){
        Toast.loading({
            message: '加入中...',
            forbidClick: true,
        })
        let {msgInfo} = this.props
        let data = {
            cartNum:this.state.num,
            isNew:false,
            productAttrUnique:msgInfo.productAttrUnique,
            productId:msgInfo.productId
        }
        let res = await addCartList(data)
        console.log(res);
        if(res.data.code===200){
            Toast.success('加入成功')
            this.setState({
                isShow:false,
                cartCount:this.state.cartCount+1
            },()=>{
                this.props.changeCartCount()
            })
            return
        }
        Toast.clear()
    }
    
    //改变商品规格
    changeSku(index, i) {
        this.props.skuList[index] = i
        //向父组件传值，更新skuList
        this.props.setSkuList(this.props.skuList)
    }

    //改变弹出层
    componentDidMount(){
        bus.on('sendIsShow',()=>{
            this.setState({ isShow: true })
        })
    }
}

export default WithRouter(InfoPopup)
