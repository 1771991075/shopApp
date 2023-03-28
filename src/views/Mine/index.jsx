import React, { Component } from 'react'
import { Grid } from 'react-vant';
import { TodoList, BalanceList, Clock, ThumbCircle, Question, Arrow, LocationO, ServiceO, CouponO, LikeO } from '@react-vant/icons';
import './index.css'
import WithRouter from '../../router/withRouter';
import { getUser } from '../../api/mine'
import { getCount } from '../../api/order'

class Mine extends Component {

  state = {
    //用户信息
    user: null,
    //所有订单数量
    unPaidCount: 0,
    unShippedCount: 0,
    receivedCount: 0,
    evaluatedCount: 0,
    completeCount: 0
  }

  render() {
    let { user, unPaidCount,unShippedCount, receivedCount,evaluatedCount,completeCount} = this.state
    return (
      <div className='mine'>
        {
          user && <div>
            <div className='mineTop'>
              <div className='minetop_user'>
                <div className='mineimg' onClick={() => this.props.router.navigate('/user')}>
                  <img src={user.avatar} alt="" />
                </div>
                <div className='mineuserInfo'>
                  <p className='mineusernicheng'>{user.nickname}</p>
                  <p className='mineuserid'>{user.phone}</p>
                </div>
              </div>
            </div>
            <div className='minemid'>
              <ul>
                <li><p className='p1'>{user.nowMoney}</p><p className='p2'>余额</p></li>
                <li><p className='p1'>{user.integral}</p><p className='p2'>积分</p></li>
                <li onClick={() => this.props.router.navigate('/prefer')}><p className='p1'>{user.couponCount}</p><p className='p2'>优惠券</p></li>
                <li onClick={() => this.props.router.navigate('/collect')}><p className='p1'>{user.collectCount}</p><p className='p2'>收藏</p></li>
              </ul>
            </div>
          </div>
        }
        <div className='mineordercenter'>
          <div className='mineordercenter_top'>
            <span className='mineorderspan'>订单中心</span>
            <span className='mineseemore'><span onClick={() => this.props.router.navigate('/myorder?index=0')}>查看全部</span><Arrow /></span>
          </div>
          <div>
            <Grid columnNum={5} border={false} square={true}>
              <Grid.Item icon={<TodoList color='#1989fa' />} text='待付款' badge={{ content: unPaidCount===0?'':unPaidCount }} onClick={() => { this.props.router.navigate('/myorder?index=0') }} />
              <Grid.Item icon={<BalanceList />} text='待发货' badge={{ content: unShippedCount===0?'':unShippedCount  }} onClick={() => { this.props.router.navigate('/myorder?index=1') }} />
              <Grid.Item icon={<Clock />} text='待收货' badge={{ content: receivedCount===0?'':receivedCount  }} onClick={() => { this.props.router.navigate('/myorder?index=2') }} />
              <Grid.Item icon={<ThumbCircle />} text='待评价' badge={{ content: evaluatedCount===0?'':evaluatedCount  }} onClick={() => { this.props.router.navigate('/myorder?index=3') }} />
              <Grid.Item icon={<Question />} text='退货/售后' badge={{ content: completeCount===0?'':completeCount  }} onClick={() => { this.props.router.navigate('/myorder?index=4') }} />
            </Grid>
          </div>
        </div>
        <div className='minefuwu'>
          <div className='minefuwu_top'>
            <p>我的服务</p>
          </div>
          <div className='minefuwulist'>
            <div className='minefuwuitem'>
              <div className='imgg' onClick={() => this.props.router.navigate('/address')}>
                <LocationO fontSize={27} color={'#e93323'} />
                <p>收货地址</p>
              </div>
            </div>
            <div className='minefuwuitem'>
              <div className='imgg'>
                <ServiceO fontSize={27} color={'#e93323'} />
                <p>我的客服</p>
              </div>
            </div>
            <div className='minefuwuitem' onClick={() => this.props.router.navigate('/prefer')} >
              <div className='imgg'>
                <CouponO fontSize={27} color={'#e93323'} />
                <p>优惠券</p>
              </div>
            </div>
            <div className='minefuwuitem' onClick={() => this.props.router.navigate('/collect')}>
              <div className='imgg'>
                <LikeO fontSize={27} color={'#e93323'} />
                <p>我的收藏</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async componentDidMount() {
    this.$plus(()=>{
      // 改变导航栏字体颜色
      plus.navigator.setStatusBarBackground("#1db0fc");
      plus.navigator.setStatusBarStyle("light");
    })
    //获取用户信息
    let resUser = await getUser()
    let res = await getCount()
    let allCount = res.data.data
    this.setState({
      user: resUser.data.data,
      unPaidCount: allCount.unPaidCount,
      unShippedCount: allCount.unShippedCount,
      receivedCount: allCount.receivedCount,
      evaluatedCount: allCount.evaluatedCount,
      completeCount: allCount.completeCount
    })
  }
}

export default WithRouter(Mine)
