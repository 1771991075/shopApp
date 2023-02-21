import React, { Component } from 'react'
import { Grid } from 'react-vant';
import { TodoListO ,BalanceListO ,ClockO ,ThumbCircleO ,QuestionO ,Arrow } from '@react-vant/icons';
import './index.css'

class Mine extends Component {
  render() {
    return (
      <div className='mine'>
        <div className='mineTop'>
          <div className='minetop_user'>
            <div className='mineimg'>
              <img src="https://api.java.crmeb.net/crmebimage/store/2020/08/15/adae23e354114cd5bd8f3cae740741c23opxeh8kw2.jpg" alt="" />
            </div>
            <div className='mineuserInfo'>
              <p className='mineusernicheng'>用户昵称</p>
              <p className='mineuserid'>用户ID</p>
            </div>
          </div>
        </div>
        <div className='minemid'>
          <ul>
            <li><p className='p1'>0.00</p><p className='p2'>余额</p></li>
            <li><p className='p1'>0</p><p className='p2'>积分</p></li>
            <li><p className='p1'>6</p><p className='p2'>优惠券</p></li>
            <li><p className='p1'>0</p><p className='p2'>收藏</p></li>
          </ul>
        </div>
        <div className='mineordercenter'>
          <div className='mineordercenter_top'>
            <span className='mineorderspan'>订单中心</span>
            <span className='mineseemore'><span>查看全部</span><Arrow  /></span>
          </div>
          <div>
            <Grid columnNum={5} border={false} square={true}>
              <Grid.Item icon={<TodoListO  />} text='待付款' />
              <Grid.Item icon={<BalanceListO  />} text='待发货' />
              <Grid.Item icon={<ClockO  />} text='待收货' />
              <Grid.Item icon={<ThumbCircleO  />} text='待评价' />
              <Grid.Item icon={<QuestionO  />} text='退货/售后' />
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default Mine
