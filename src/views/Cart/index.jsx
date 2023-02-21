import React, { Component } from 'react'
import { Toast, NavBar, SubmitBar, ProductCard, Empty, Checkbox, Button } from 'react-vant'
import { WapHomeO, Ellipsis, ShoppingCartO } from '@react-vant/icons'
import WithRouter from '../../router/withRouter'
import './index.css'

class Cart extends Component {

  state = {
    cartList: []
  }

  render() {
    const { cartList } = this.state
    return (
      <div className='cart'>
        <div className='cartnav'>
          <NavBar
            leftArrow={<WapHomeO style={{ fontSize: '20px', color: '#fff' }} />}
            title='购物车'
            onClickLeft={() => this.props.router.navigate('/index/home')}
            rightText={<Ellipsis style={{ fontSize: '20px', color: '#fff' }} />}
            onClickRight={() => Toast('更多')}
          />
        </div>
        <div className='cartmid'>
          {
            !cartList.length ? <Empty
              imageSize={90}
              image={<ShoppingCartO fontSize={90} color='#999'/>}
              description="购物车是空的~~~" >
              <Button style={{ width: 160 ,background:'#ff6034' ,border:'none'}} round type="primary" onClick={()=>this.props.router.navigate('/index/home')}>
                去逛逛
              </Button> </Empty> :
              cartList.map((item, index) => {
                return (
                  <div key={index}>
                    <ProductCard
                      num="2"
                      price="2.00"
                      desc="描述信息"
                      title="商品名称"
                      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                    />
                  </div>
                )
              })
          }
        </div>
        <div className='cartbtm'>
          <SubmitBar
            disabled={(cartList.length===0?true:false)}
            price="0000"
            buttonText="提交订单"
            // tip={
            //   <>
            //     你的收货地址不支持同城送,
            //     <span style={{ color: '#1989fa' }}>修改地址</span>
            //   </>
            // }
          >
            <Checkbox disabled={(cartList.length===0?true:false)}>全选</Checkbox>
          </SubmitBar>
        </div>
      </div>
    )
  }
}

export default WithRouter(Cart)
