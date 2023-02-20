import React, { Component } from 'react'
import { Search, Tabs,Toast } from 'react-vant';
import { FireO, Arrow } from '@react-vant/icons'
import './index.css'
import WithRouter from '../../router/withRouter'
import HomeSwiper from '../../component/home/HomeSwiper'
import ListCate from '../../component/home/ListCate';
import ShopList from '../../component/home/ShopList'
import { getTopList,getGoodsList,getCate } from '../../api/home';
import ShopTopList from '../../component/home/ShopTopList';

class Home extends Component {

  state = {
    //搜索
    value: '',
    //列表分类
    listCate: [],
    //排行榜
    listTop: [],
    //下面分类
    btmCate: [],
    //下面列表
    listBtm: [],
    //下面列表的索引
    listBtmIndex:'1'
  }

  render() {
    let { value, listCate, listTop, btmCate, listBtm} = this.state
    return (
      <div className='homecontainer'>

        <div className='hometop'>
          <div className='search'>
            <Search value={value} placeholder="搜索商品" shape='round' />
          </div>
          <HomeSwiper/>
        </div>

        <div className='homemid'>
          <ListCate listCate={listCate}/>

          <div className='shoplist'>
            <div className='shoppaihang'>
              <div className='spphb'><FireO />商品排行榜</div>
              <div className='gengduo'>更多<Arrow /></div>
            </div>
            <ShopTopList listTop={listTop}/>
          </div>

          <div className='btmlist'>
            <Tabs border type='jumbo' background='#f1f1f1' color='#e93323' 
                  onClickTab={(active)=>{this.getBtmList(active)}}>
              {btmCate.map((item, index) => (
                <Tabs.TabPane
                  key={index}
                  title={item.name}
                  description={item.info}
                >
                </Tabs.TabPane>
              ))}
            </Tabs>
            <ShopList listBtm={listBtm}/>
            <div className='more'><p>没有更多了</p></div>
          </div>

        </div>
      </div>
    )
  }

  async componentDidMount() {

    //获取分类
    let res = await getCate()
    //获取商品排行榜
    let ress = await getTopList()
    //获取底部列表
    let resss = await getGoodsList(this.state.listBtmIndex)
    this.setState({
      listCate: res.data.data.menus,
      btmCate: res.data.data.explosiveMoney,
      listTop: ress.data.data.splice(0, 3),
      listBtm: resss.data.data.list
    })
  }

  async getBtmList(active){
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    this.setState({
      listBtm:[],
      listBtmIndex:active.index+1
    })
    let resss = await getGoodsList(this.state.listBtmIndex)
    this.setState({
      listBtm: resss.data.data.list
    },()=>{
      Toast.clear();
    })
  }

}

export default WithRouter(Home)
