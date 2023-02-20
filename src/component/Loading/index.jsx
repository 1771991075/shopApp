import React from 'react'
import { Loading } from 'react-vant';
import './index.css'

export default function MyLoading() {
  return (
    <div className='loading'>
      <Loading type="ball" />
    </div>
  )
}
