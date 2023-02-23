import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast, Button, Form, Input, Picker, Cell, Switch } from 'react-vant';
import { Ellipsis, ArrowLeft, } from '@react-vant/icons'
import './index.css'

class Add extends Component {
    state = {
        //地址列表
        addressList: [],
        //表单数据，用户新地址
        addressObj:{
            city:'郑州市',
            detail:'瓦屋里新居',
            district:'郑州高新技术产业开发区',
            isDefault:true,
            phone:'',
            province:'河南省',
            realName:'lzc'
        }
    }
    render() {
        let {addressObj} = this.state
        return (
            <div className='address'>
                <div className='address_header'>
                    <NavBar
                        title='添加收货地址'
                        leftText={<ArrowLeft fontSize={20} />}
                        rightText={<Ellipsis fontSize={20} />}
                        onClickLeft={() => this.props.router.navigate(-1)}
                        onClickRight={() => Toast('更多')}
                        fixed
                    />
                </div>
                <div className='addform'>
                    <Form>
                        <Cell>
                            <Input
                                prefix={'姓名'}
                                value={addressObj.realName}
                                onChange={(value)=>this.setState({name:value})}
                                placeholder='收货人姓名'
                            />
                        </Cell>
                        <Cell>
                            <Input
                                prefix={'电话'}
                                value={addressObj.phone}
                                onChange={(value)=>this.setState({phone:value})}
                                placeholder='收货人手机号'
                            />
                        </Cell>
                        <Form.Item
                            isLink
                            name='picker'
                            label='地区'
                            trigger='onConfirm'
                            onClick={(_, action) => {
                                action.current?.open()
                            }}
                        >
                            <Picker
                                popup
                                columns={[
                                    '南京',
                                    '苏州',
                                    '常州',
                                    '淮安',
                                    '扬州',
                                    '南通',
                                    '宿迁',
                                    '泰州',
                                    '无锡',
                                ]}
                            >
                                {val => val || '选择省/市/区'}
                            </Picker>
                        </Form.Item>
                        <Cell>
                            <Input
                                prefix={'详细地址'}
                                value={addressObj.detail}
                                onChange={(value)=>this.setState({addressInfo:value})}
                                placeholder='街道门牌、楼层房间号等信息'
                            />
                        </Cell>
                    </Form>
                    <div className='morendizhi'>
                        <Cell
                            defaultChecked={addressObj.isDefault}
                            title='设为默认收货地址'
                            rightIcon={<Switch size={25} onClick={()=>this.changeDefault()} />}
                        />
                    </div>
                </div>
                <div className='addbtm'>
                    <Button type='primary' color='#ee0a24' block round onChange={()=>this.saveAddress()}>保存</Button>
                    <Button type='default' block round >删除</Button>
                </div>
            </div>
        )
    }

    //设置是否默认地址
    changeDefault(){
        let {addressObj} = this.state
        addressObj.isDefault = !addressObj.isDefault
        this.setState({
            addressObj
        })
    }

    //保存地址
    saveAddress(){
        let addressObj = {
            name:this.state.name,
            address:this.state.address,
            phone:this.state.phone,
            addressInfo:this.sate.addressInfo
        }
        console.log(addressObj);
    }

}

export default WithRouter(Add)
