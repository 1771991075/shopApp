import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { Search, Toast, Empty } from 'react-vant';
import { getHot, getHotList, searchShop } from '../../api/search';
import loading from '../../assets/loading.png'
import Lazyimg from 'react-lazyimg-component';
import './index.css'

class SearchInfo extends Component {
    state = {
        value: '',
        hotCate: null,
        hotList: null,
        isShow: false,
        searchList: []
    }
    render() {
        let { value, hotCate, hotList, isShow, searchList } = this.state
        return (
            <div className='search'>
                <div className='search_header'>
                    <Search value={value} onChange={(value) => this.setState({ value })} placeholder="请输入搜索关键词" onSearch={(value) => this.search1(value)} />
                </div>
                <div className='hot_top'>
                    <p>热门搜索</p>
                    <div className='hotcate'>
                        {
                            hotCate && hotCate.map((item, index) => {
                                return <span key={index} onClick={() => this.search1(item.title)}>{item.title}</span>
                            })
                        }
                    </div>
                </div>
                {
                    isShow && <div>
                        {
                            searchList.map((item, index) => {
                                return <div className='btmlist1' key={index} onClick={() => this.props.router.navigate(`/info?id=${item.id}`)}>
                                    <div className='itemimg'>
                                        <Lazyimg className="lazy" src={item.image} placeholder={<img src={loading} alt='加载失败' />} />
                                    </div>
                                    <div className='itemxinxi'>
                                        <p className='itemtitle'>{item.storeName}</p>
                                        <p className='itemotprice'>￥{item.otPrice}</p>
                                        <p className='itemprice'>￥{item.price}</p>
                                    </div>
                                </div>
                            })
                        }
                        <Empty
                            className="custom-image"
                            imageSize={90}
                            image={<img src="https://img.yzcdn.cn/vant/custom-empty-image.png" alt='' />}
                            description={searchList.length === 0 ? '无搜索结果，换个词试试吧~' : `为您找到${searchList.length}条结果`}
                        />
                    </div>
                }
                <p className='hottuijian'>热门推荐</p>
                <div className='hotlist'>
                    {
                        hotList && hotList.map((item, index) => {
                            return <div className='btmlist1' key={index} onClick={() => this.props.router.navigate(`/info?id=${item.id}`)}>
                                <div className='itemimg'>
                                    <Lazyimg className="lazy" src={item.image} placeholder={<img src={loading} alt='加载失败' />} />
                                </div>
                                <div className='itemxinxi'>
                                    <p className='itemtitle'>{item.storeName}</p>
                                    <p className='itemotprice'>￥{item.otPrice}</p>
                                    <p className='itemprice'>￥{item.price}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }

    async componentDidMount() {
        let res = await getHot()
        let ress = await getHotList()
        if (res.data.code === 200 || ress.data.code === 200) {
            this.setState({
                hotCate: res.data.data,
                hotList: ress.data.data.list
            })
        } else {
            Toast.info(res.data.message || ress.data.message)
        }

    }

    //搜索
    async search1(value) {
        let res = await searchShop(value)
        this.setState({
            isShow: true,
            searchList: res.data.data.list
        })
    }
}

export default WithRouter(SearchInfo)
