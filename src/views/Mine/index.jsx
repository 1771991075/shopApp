import React, { Component } from 'react'
import { Grid } from 'react-vant';
import { TodoList, BalanceList, Clock, ThumbCircle, Question, Arrow } from '@react-vant/icons';
import './index.css'
import WithRouter from '../../router/withRouter';
import { getUser } from '../../api/mine'

class Mine extends Component {

  state = {
    //用户信息
    user: null
  }

  render() {
    let { user } = this.state
    return (
      <div className='mine'>
        {
          user && <div>
            <div className='mineTop'>
              <div className='minetop_user'>
                <div className='mineimg'>
                  <img src="https://api.java.crmeb.net/crmebimage/store/2020/08/15/adae23e354114cd5bd8f3cae740741c23opxeh8kw2.jpg" alt="" />
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
                <li onClick={() => this.props.router.navigate('/index/prefer')}><p className='p1'>{user.couponCount}</p><p className='p2'>优惠券</p></li>
                <li onClick={() => this.props.router.navigate('/index/collect')}><p className='p1'>{user.collectCount}</p><p className='p2'>收藏</p></li>
              </ul>
            </div>
          </div>
        }
        <div className='mineordercenter'>
          <div className='mineordercenter_top'>
            <span className='mineorderspan'>订单中心</span>
            <span className='mineseemore'><span>查看全部</span><Arrow /></span>
          </div>
          <div>
            <Grid columnNum={5} border={false} square={true}>
              <Grid.Item icon={<TodoList color='#1989fa' />} text='待付款' />
              <Grid.Item icon={<BalanceList />} text='待发货' />
              <Grid.Item icon={<Clock />} text='待收货' />
              <Grid.Item icon={<ThumbCircle />} text='待评价' />
              <Grid.Item icon={<Question />} text='退货/售后' />
            </Grid>
          </div>
        </div>
      </div>
    )
  }

  async componentDidMount() {
    //获取用户信息
    let resUser = await getUser()
    this.setState({
      user: resUser.data.data
    })
  }
}

export default WithRouter(Mine)
