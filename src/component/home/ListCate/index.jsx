import React , { Component } from 'react'
import Lazyimg from 'react-lazyimg-component';
import loading from '../../../assets/loading.png'
export default class ListCate extends Component {
  render() {
    return (
        <div className='cate'>
        {
            this.props.listCate.map((item, index) => {
                return (
                    <div className='cateItem' key={index}>
                        <Lazyimg className="lazy" src={item.pic} placeholder={<img src={loading} alt='加载失败'/>}/>
                        <p>{item.name}</p>
                    </div>
                )
            })
        }
    </div>
    )
  }
}
