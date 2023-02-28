import React, { Component } from 'react'
import { Toast, NavBar, SubmitBar, ProductCard, Empty, Checkbox, Button, Stepper, SwipeCell } from 'react-vant'
import { WapHomeO, Ellipsis, ShoppingCartO } from '@react-vant/icons'
import WithRouter from '../../router/withRouter'
import { getCartList, deleteShop, addShopCount } from '../../api/cart'
import { getOrder } from '../../api/order'
import './index.css'

class Cart extends Component {

  state = {
    //购物车列表
    cartList: [],
    //选中列表
    checkedList: [],
    //总价
    sum: 0
  }

  render() {
    const { cartList, checkedList, sum } = this.state
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
              <Checkbox.Group onChange={v => this.setState({ checkedList: v }, () => { this.changeSum() })} value={checkedList}>
                {
                  cartList.length !== 0 && cartList.map((item, index) => {
                    return (
                      <div className='cartItem' key={item.id}>
                        <SwipeCell
                          rightAction={
                            <Button style={{ height: '100%' }} square type="danger" onClick={() => this.delShop(item.id)}>
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
                              min={1}
                              value={item.cartNum}
                              onChange={value => this.changeNum(item.id, value, index)}
                              theme='round'
                              buttonSize='18'
                              disableInput
                            />}
                          />
                          <Checkbox name={item} ></Checkbox>
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
          disabled={(checkedList.length === 0 ? true : false)}
          price={sum * 100}
          buttonText="提交订单"
          onSubmit={() => this.submitOrder()}
        >
          <Checkbox disabled={(cartList.length === 0 ? true : false)} onChange={(checked) => {
            if (checked) {
              this.setState({
                checkedList: cartList
              }, () => {
                this.changeSum()
              })
            } else {
              this.setState({
                checkedList: []
              }, () => {
                this.changeSum()
              })
            }
          }} checked={(checkedList.length === cartList.length && cartList.length !== 0)}>全选</Checkbox>
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
    this.setState({
      cartList: res.data.data.list
    }, () => {
      Toast.clear()
    })
  }

  //提交购物车订单
  async submitOrder() {
    let { checkedList} = this.state
    let orderDetails = []
    checkedList.forEach(item=>{
      let obj = {shoppingCartId:item.id}
      orderDetails.push(obj)
    })
    let data = {
      preOrderType: "shoppingCart",
      orderDetails:orderDetails
    }
    let res = await getOrder(data)
    let preOrderNo = res.data.data.preOrderNo
    this.props.router.navigate(`/order?preOrderNo=${preOrderNo}`)
  }

  //计算价格
  changeSum() {
    let { checkedList } = this.state
    let sum = 0
    checkedList.forEach(item => {
      let goodsItemPrice = item.price * item.cartNum
      sum += goodsItemPrice
    })
    this.setState({
      sum: sum
    })
  }

  //增加、减少商品数量
  async changeNum(id, value, index) {
    let { cartList } = this.state
    let nowChangeItem = cartList[index]
    let res = await addShopCount({ id: id, number: value })
    if (res.data.code === 200) {
      nowChangeItem.cartNum = value
      Toast.success(res.data.message)
      this.setState({
        cartList: cartList
      }, () => {
        this.changeSum()
      })
    } else {
      Toast.info(res.data.message)
    }
  }

  //删除商品
  async delShop(id) {
    let data = { ids: id }
    let res = await deleteShop(data)
    if (res.data.code === 200) {
      Toast.success('删除成功')
      let index = this.state.cartList.findIndex(item => {
        return item.id === id
      })
      if (index !== -1) {
        this.state.cartList.splice(index, 1)
        let idx = this.state.checkedList.findIndex(item=>{
          return item.id === id
        })
        this.state.checkedList.splice(idx,1)
        this.setState({ 
          cartList: this.state.cartList,
          checkedList:this.state.checkedList
        }, () => {
          this.changeSum()
        })
      }
    } else {
      Toast.fail(res.data.message)
    }
  }

}

export default WithRouter(Cart)
