import React, { Component } from 'react'
import { Toast, NavBar, SubmitBar, ProductCard, Empty, Checkbox, Button, Stepper, SwipeCell } from 'react-vant'
import { WapHomeO, Ellipsis, ShoppingCartO } from '@react-vant/icons'
import WithRouter from '../../router/withRouter'
import { getCartList } from '../../api/cart'
import './index.css'

class Cart extends Component {

  state = {
    //购物车列表
    cartList: [],
    //数量
    num: 1
  }

  render() {
    const { cartList, num } = this.state
    return (
      <div className='cart'>
        <div className='cartnav'>
          <NavBar
            fixed
            leftArrow={<WapHomeO style={{ fontSize: '20px', color: '#fff' }} />}
            title='购物车'
            onClickLeft={() => this.props.router.navigate('/index/home')}
            rightText={<Ellipsis style={{ fontSize: '20px', color: '#fff' }} />}
            onClickRight={() => Toast('更多')}
          />
        </div>
        <div className='cartmid'>
          {
            cartList.length === 0 ? <Empty
              imageSize={90}
              image={<ShoppingCartO fontSize={90} color='#999' />}
              description="购物车是空的~~~" >
              <Button style={{ width: 160, background: '#ff6034', border: 'none' }} round type="primary" onClick={() => this.props.router.navigate('/index/home')}>
                去逛逛
              </Button> </Empty> : <div>
              <Checkbox.Group>
                {
                  cartList.map((item, index) => {
                    return (
                      <div className='cartItem' key={index}>
                        <SwipeCell
                          rightAction={
                            <Button style={{ height: '100%' }} square type="danger" onClick={(index)=>this.deleteShop(index)}>
                              删除
                            </Button>
                          }
                        >
                          <ProductCard
                            num={item.cartNum}
                            price={item.price}
                            desc={item.suk}
                            title={item.storeName}
                            thumb={item.image}
                            footer={<Stepper
                              value={num}
                              onChange={value => this.setState({ num: value })}
                              theme='round'
                              buttonSize='18'
                              disableInput
                            />}
                          />
                          <Checkbox name='a'></Checkbox>
                        </SwipeCell>
                      </div>
                    )
                  })
                }
              </Checkbox.Group>
            </div>

          }
        </div>
        <SubmitBar
          disabled={(cartList.length === 0 ? true : false)}
          price="0000"
          buttonText="提交订单"
        >
          <Checkbox disabled={(cartList.length === 0 ? true : false)}>全选</Checkbox>
        </SubmitBar>
      </div>
    )
  }

  async componentDidMount() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    //获取购物车列表
    let res = await getCartList()
    console.log(res);
    this.setState({
      cartList: res.data.data.list
    },()=>{
      Toast.clear()
    })
  }

  //删除商品
  deleteShop(index){
    let {cartList} = this.state
    cartList.splice(index,1)
    this.setState({cartList})
  }

}

export default WithRouter(Cart)
