import React, { Component } from 'react';
import { Popup, Stepper, Cell ,ActionBar ,Toast  } from 'react-vant';
import { CartO, StarO } from '@react-vant/icons';
import './index.css';
import bus from '../../../utils/bus';
import WithRouter from '../../../router/withRouter';
import {addCartList} from '../../../api/cart';

class InfoPopup extends Component {

    state = {
        isShow: false,
        //购买数量
        num:1
    }

    render() {
        let { isShow ,num } = this.state
        let { productAttr, skuList, msgInfo ,router} = this.props
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
                            <Cell title='数量' center>
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
                                <ActionBar.Icon icon={<CartO color='red' />} text='购物车' onClick={()=>router.navigate('/index/cart')} />
                                <ActionBar.Icon icon={<StarO color='red' />} text='店铺' />
                                <ActionBar.Button type='warning' text='加入购物车' onClick={()=>{this.addCart()}} />
                                <ActionBar.Button type='danger' text='立即购买' />
                            </ActionBar>
                        </div>
                    </div>
                </Popup>
            </div>
        )
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
        Toast.clear()
    }

    changeSku(index, i) {
        this.props.skuList[index] = i
        //向父组件传值，更新skuList
        this.props.setSkuList(this.props.skuList)
    }

    componentDidMount(){
        bus.on('sendIsShow',()=>{
            this.setState({ isShow: true })
        })
    }
}

export default WithRouter(InfoPopup)
