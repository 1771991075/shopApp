import React, { Component } from 'react'
import { Toast, NavBar, SubmitBar, ProductCard, Empty, Checkbox, Button, Stepper, SwipeCell } from 'react-vant'
import { WapHomeO, Ellipsis, ShoppingCartO } from '@react-vant/icons'
import WithRouter from '../../router/withRouter'
import {getCollectList} from '../../api/collect'
import {removeUserCollect} from '../../api/info'
import './index.css'

class Collect extends Component {

  state = {
    //收藏列表
    collectList: [],
    num:1
  }

  render() {
    const { collectList ,num} = this.state
    return (
      <div className='cart'>
        <div className='cartnav'>
          <NavBar
            fixed
            leftArrow={<WapHomeO style={{ fontSize: '20px', color: '#fff' }} />}
            title='收藏'
            onClickLeft={() => this.props.router.navigate('/index/home')}
            rightText={<Ellipsis style={{ fontSize: '20px', color: '#fff' }} />}
            onClickRight={() => Toast('更多')}
          />
        </div>
        <div className='cartmid'>
          {
            collectList.length === 0 ? <Empty
              imageSize={90}
              image={<ShoppingCartO fontSize={90} color='#999' />}
              description="收藏是空的~~~" >
              <Button style={{ width: 160, background: '#ff6034', border: 'none' }} round type="primary" onClick={() => this.props.router.navigate('/index/home')}>
                去逛逛
              </Button> </Empty> : <div>
              <Checkbox.Group>
                {
                  collectList.length!==0 && collectList.map((item, index) => {
                    return (
                      <div className='cartItem' key={index}>
                        <SwipeCell
                          rightAction={
                            <Button style={{ height: '100%' }} square type="danger" onClick={()=>this.delCollect(index)}>
                              取消收藏
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
                          <Checkbox name={index} onClick={(e)=>{console.log(e)}}></Checkbox>  
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
          disabled={(collectList.length === 0 ? true : false)}
          price="0000"
          buttonText="提交订单"
        >
          <Checkbox disabled={(collectList.length === 0 ? true : false)}>全选</Checkbox>
        </SubmitBar>
      </div>
    )
  }

  //获取收藏列表
  async componentDidMount() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    let res = await getCollectList()
    if(res.data.code===200){
      this.setState({
        collectList: res.data.data.list
      },()=>{
        Toast.clear()
      })
    }
  }

  //取消收藏
  async delCollect(index){
    let {collectList} = this.state
    let nowCollectId = collectList[index].productId
    let res = await removeUserCollect(nowCollectId)
    if(res.data.code===200){
      Toast.success('取消收藏')
      let ress = await getCollectList()
      if(ress.data.code===200){
        this.setState({
          collectList: ress.data.data.list
        })
      }
    }else{
      Toast.fail(res.data.message)
    }
  }

}

export default WithRouter(Collect)
