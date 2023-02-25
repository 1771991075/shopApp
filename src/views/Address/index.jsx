import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast, Button, Radio } from 'react-vant';
import { Ellipsis, ArrowLeft, Edit } from '@react-vant/icons'
import { getAddressList, changeDefault } from '../../api/address'
import './index.css'

class Address extends Component {
    state = {
        //地址列表
        addressList: []
    }
    render() {
        let { addressList } = this.state
        return (
            <div className='address'>
                <div className='address_header'>
                    <NavBar
                        title='收货地址'
                        leftText={<ArrowLeft fontSize={20} />}
                        rightText={<Ellipsis fontSize={20} />}
                        onClickLeft={() => this.props.router.navigate(-1)}
                        onClickRight={() => Toast('更多')}
                        fixed
                    />
                </div>
                <div>
                    {
                        addressList.length !== 0 && <div>
                            <Radio.Group defaultValue="1" checkedColor={'#ee0a24'}>
                                {
                                    addressList.map((item, index) => {
                                        return (
                                            <div className='item_address' key={index}>
                                                <Radio name={item.isDefault ? '1' : item}  onClick={() => this.changeDefaultAddress1(item.id)}>
                                                    <div className='addressItem'>
                                                        <div className='address_top'>
                                                            <span>{item.realName}</span>
                                                            <span>{item.phone}</span>
                                                            {
                                                                item.isDefault && <span className='morenaddress'>默认</span>
                                                            }
                                                        </div>
                                                        <div className='address_btm'>
                                                            <p>{item.province}{item.city}{item.district}{item.detail}</p>
                                                        </div>
                                                    </div>
                                                </Radio>
                                                <div className='xiugaiaddress'>
                                                    <Edit fontSize={25} color={'#969799'} onClick={() => this.changeAddress(item)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </div>
                    }
                </div>
                <div className='addressbtm'>
                    <Button type='primary' color='#ee0a24' block round onClick={() => this.props.router.navigate('/add/address')}>新增地址</Button>
                </div>
            </div>
        )
    }
    //改变默认地址
    async changeDefaultAddress1(id) {
        let res = await changeDefault({ id: id })
        if (res.data.code === 200) {
            Toast.success('设置成功')
        } else {
            Toast.fail(res.data.message)
        }
    }

    //修改地址
    changeAddress(item) {
        this.props.router.navigate('/change/address', { state: { item } })
    }

    //获取地址列表
    async componentDidMount() {
        let res = await getAddressList()
        let addressList = res.data.data.list
        let arr = addressList.filter(item => {
            return item.isDefault
        })
        //如果没有默认地址，则设置地址列表中第一项为默认地址
        if(arr.length===0){
            this.changeDefaultAddress1({id:addressList[0].id})
        }
        this.setState({
            addressList: addressList
        })
    }
}

export default WithRouter(Address)
