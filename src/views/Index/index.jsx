import React, { Component } from 'react'
import { Tabbar } from 'react-vant'
import { WapHomeO, UserO, ShoppingCartO } from '@react-vant/icons'
import WithRouter from '../../router/withRouter'
import { Outlet } from 'react-router-dom'
import './index.css'

class Index extends Component {
  render() {
    return (
      <div className='box'>
        <div className='indexlist'>
          <Tabbar activeColor='#f44336' inactiveColor='#000' onChange={(active) => this.goPage(active)} value={this.props.active}>
            <Tabbar.Item icon={<WapHomeO />}>首页</Tabbar.Item>
            <Tabbar.Item icon={<ShoppingCartO />}>购物车</Tabbar.Item>
            <Tabbar.Item icon={<UserO />}>我的</Tabbar.Item>
          </Tabbar>
        </div>
        <Outlet></Outlet>
      </div>
    )
  }
  
  goPage(active){
    switch (active) {
      case 0:
        this.props.router.navigate('home');
        break;
      case 1:
        this.props.router.navigate('cart');
        break;
      default:
        this.props.router.navigate('mine');
    }
  }

}

export default WithRouter(Index)
