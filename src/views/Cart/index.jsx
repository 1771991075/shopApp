import React, { Component } from 'react'
import { Toast, NavBar, SubmitBar, ProductCard, Empty } from 'react-vant'
import { Search } from '@react-vant/icons'
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
            title='购物车'
            leftText='返回'
            onClickLeft={() => this.props.router.navigate(-1)}
            rightText={<Search fontSize={20} />}
            onClickRight={() => Toast('按钮')}
          />
        </div>
        <div className='cartmid'>
          {
            !cartList.length ? <Empty description="空空如也" />:
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
          <div className="demo-submit-bar">
            <SubmitBar price="0000" buttonText="提交订单" />
          </div>
        </div>
      </div>
    )
  }
}

export default WithRouter(Cart)
