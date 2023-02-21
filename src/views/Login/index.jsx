import React from 'react'
import './index.css'
import { Cell, Input, hooks ,Button,} from 'react-vant'
import { Cross } from '@react-vant/icons'
import {useNavigate,useSearchParams} from 'react-router-dom'

export default function Login() {

  let navigate = useNavigate()
  let [search] = useSearchParams()
  let redircturl = search.get('redircturl')
  const [state, updateState] = hooks.useSetState({
    tel: '',
    password: '',
  })
  function close(){
    navigate('/index/home')
  }

  function login(){
    localStorage.setItem('token','123456')
    navigate(redircturl)
  }

  return (
    <div className='loginbox'>
      <div className='close' onClick={close}>
        <Button className='closebtn' icon={<Cross />} type='primary' />
      </div>
      <div className='login'>
        <p>短信登录</p>
        <Cell>
          <Input
            value={state.tel}
            type='tel'
            onChange={tel => updateState({ tel })}
            placeholder='请输入手机号'
          />
        </Cell>
        <Cell>
          <Input
            value={state.password}
            type='password'
            onChange={password => updateState({ password })}
            suffix={<Button className='getNum' type='primary' size='small'>发送验证码</Button>}
            placeholder="请输入短信验证码"
          />
        </Cell>
        <Button type='primary' size='large' className='loginbtn' onClick={login}>
            登录
        </Button>
      </div>
    </div>
  )
}
