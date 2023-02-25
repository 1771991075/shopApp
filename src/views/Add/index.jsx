import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Toast, Button, Form, Input, Cell, Switch, Area ,Field} from 'react-vant';
import { Ellipsis, ArrowLeft, } from '@react-vant/icons'
import { areaList } from '@vant/area-data'
import {addAddres} from '../../api/address'
import './index.css'

class Add extends Component {
    state = {
        //地址列表
        addressList: [],
        //市
        city: '',
        //详细地址
        detail: '',
        ///区
        district: '',
        //是否默认收货地址
        isDefault: false,
        //电话
        phone: '',
        //省
        province: '',
        //用户名
        realName: '',
        //地区对应字符串值
        value:''
    }
    render() {
        let { realName, phone, isDefault,  detail,  value } = this.state
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
                                value={realName}
                                onChange={(value) => this.setState({ realName: value })}
                                placeholder='收货人姓名'
                            />
                        </Cell>
                        <Cell>
                            <Input
                                prefix={'电话'}
                                value={phone}
                                onChange={(value) => this.setState({ phone: value })}
                                placeholder='收货人手机号'
                            />
                        </Cell>
                        <Area
                            popup={{
                                round: true,
                            }}
                            title='省/市/区'
                            value={value}
                            areaList={areaList}
                            onConfirm={(options)=>this.setState({value:options})}
                        >
                            {(_, selectRows, actions) => {
                                return (
                                    <Field
                                        label='选择地区'
                                        value={selectRows.map(row => row?.text).join(',')}
                                        onClick={() => actions.open()}
                                    />
                                )
                            }}
                        </Area>
                        <Cell>
                            <Input
                                prefix={'详细地址'}
                                value={detail}
                                onChange={(value) => this.setState({ detail: value })}
                                placeholder='街道门牌、楼层房间号等信息'
                            />
                        </Cell>
                    </Form>
                    <div className='morendizhi'>
                        <Cell
                            defaultChecked={isDefault}
                            title='设为默认收货地址'
                            rightIcon={<Switch size={25} onClick={() => this.changeDefault()} />}
                        />
                    </div>
                </div>
                <div className='addbtm'>
                    <Button type='primary' color='#ee0a24' block round onClick={() => this.saveAddress()}>保存</Button>
                    <Button type='default' block round >删除</Button>
                </div>
            </div>
        )
    }

    //设置是否默认地址
    changeDefault() {
        let { isDefault } = this.state
        isDefault = !isDefault
        this.setState({
            isDefault
        })
    }

    //保存地址
    async saveAddress() {
        let { realName, phone, isDefault, city, detail, district, province,value } = this.state
        for (let k in areaList.province_list){
            if(k===value[0]){
                province = areaList.province_list[k]
            }
        }
        for (let i in areaList.city_list){
            if(i===value[1]){
                city = areaList.city_list[i]
            }
        }
        for (let o in areaList.county_list){
            if(o===value[2]){
                district = areaList.county_list[o]
            }
        }
        let data = {
            address:{
                province,
                city,
                district,
                cityId:2
            },
            detail:detail,
            id:0,
            isDefault,
            phone,
            realName
        }
        let res = await addAddres(data)
        if(res.data.code===200){
            Toast.success('添加成功')
            this.props.router.navigate(-1)
        }else{
            Toast.fail(res.data.message)
        }
        
    }

}

export default WithRouter(Add)
