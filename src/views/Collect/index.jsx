import React, { Component } from 'react'
import { Toast, ProductCard, Empty, Checkbox, Button } from 'react-vant'
import { ShoppingCartO } from '@react-vant/icons'
import WithRouter from '../../router/withRouter'
import { getCollectList,removeUserCollect1 } from '../../api/collect'
import './index.css'

class Collect extends Component {

  state = {
    //收藏列表
    collectList: [],
    isShow: false,
    //选中的收藏列表
    checkList: []
  }

  render() {
    let { collectList, isShow, checkList } = this.state
    return (
      <div className='collect'>
        <div className='cartmid'>
          {
            collectList.length === 0 ? <Empty
              imageSize={90}
              image={<ShoppingCartO fontSize={90} color='#999' />}
              description="收藏是空的~~~" >
              <Button style={{ width: 160, background: '#ff6034', border: 'none' }} round type="primary" onClick={() => this.props.router.navigate('/index/home')}>
                去逛逛
              </Button> </Empty> : <div>
              <div className='guanli-top'><span>当前共{collectList.length}件商品</span><span onClick={() => this.setState({ isShow: !isShow })}>{isShow?'取消':'管理'}</span></div>
              <Checkbox.Group onChange={v => this.setState({ checkList: v })} value={checkList}>
                {
                  collectList.length !== 0 && collectList.map((item, index) => {
                    return (
                      <div className='cartItem' key={item.id}>
                        <ProductCard
                          num={item.cartNum}
                          price={item.price}
                          desc={item.suk}
                          title={item.storeName}
                          thumb={item.image}
                          style={{ paddingLeft: isShow ? '40px' : '10px' }}
                          onClick={() => this.props.router.navigate(`/info?id=${item.productId}`) }
                        />
                        <Checkbox style={{ display: isShow ? 'block' : 'none' }} name={item}></Checkbox>
                      </div>
                    )
                  })
                }
              </Checkbox.Group>
            </div>

          }
        </div>
        <div style={{ display: isShow ? 'block' : 'none' }}>
          <div className='collect-btm'>
            <div>
              <Checkbox disabled={(collectList.length === 0 ? true : false)} onChange={(checked) => {
                if(checked){
                  this.setState({
                    checkList: collectList
                  })
                }else{
                  this.setState({
                    checkList:[]
                  })
                }
              }} checked={(checkList.length === collectList.length && collectList.length !== 0)}>全选</Checkbox>
            </div>
            <div className='removecollectbtn'><button onClick={() => this.delCollect()}>取消收藏</button></div>
          </div>
        </div>
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
    if (res.data.code === 200) {
      this.setState({
        collectList: res.data.data.list
      }, () => {
        Toast.clear()
      })
    }
  }

  //取消收藏
  async delCollect() {
    let { checkList } = this.state
    let arr = []
    checkList.forEach(item => {
      arr.push(item.id)
    })
    arr = arr.join(',')
    let data = {
      ids:arr
    }
    let res = await removeUserCollect1(data)
    if (res.data.code === 200) {
      Toast.success('取消成功')
      let ress = await getCollectList()
      if (ress.data.code === 200) {
        this.setState({
          collectList: ress.data.data.list
        })
      }
    } else {
      Toast.fail(res.data.message)
    }
  }

}

export default WithRouter(Collect)
