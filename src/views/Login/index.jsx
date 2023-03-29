import React, { Component } from 'react'
import './index.css'
import { Cell, Input, Button, Toast, } from 'react-vant'
import { Cross } from '@react-vant/icons'
import WithRouter from '../../router/withRouter'
import { sedUserCode, userLogin } from '../../api/login'

class Login extends Component {

  state = {
    s: null,
    timer: null,
    phone: '',
    code: '',
    title: '发送验证码',
    //服务商
    authors: null
  }
  componentDidMount() {
    let authors = {}
    this.$plus(() => {
      // 改变导航栏字体颜色
      plus.navigator.setStatusBarBackground("#ffffff");
      plus.navigator.setStatusBarStyle("dark");
      // 获取授权服务商
      let servers = plus.oauth.getServices((obj) => {
        console.log(obj)
        obj.forEach(item => {
          authors[item.id] = item;
        })
        this.setState({
          authors
        })
      })
    })
  }

  render() {
    let { phone, code, title } = this.state
    return (
      <div className='loginbox'>
        <div className='close' onClick={() => this.close()}>
          <Button className='closebtn' icon={<Cross />} type='primary' />
        </div>
        <div className='login'>
          <p>短信登录</p>
          <Cell>
            <Input
              value={phone}
              type='tel'
              onChange={(value) => this.setState({ phone: value })}
              placeholder='请输入手机号'
            />
          </Cell>
          <Cell>
            <Input
              value={code}
              type='tel'
              onChange={(value) => this.setState({ code: value })}
              suffix={<Button className='getNum' type='primary' size='small' onClick={() => this.sendCode()}>{title}</Button>}
              placeholder="请输入短信验证码"
            />
          </Cell>
          <Button type='primary' size='large' className='loginbtn' onClick={() => this.login()}>
            登录
          </Button>
          <Button type='primary' size='large' className='loginbtn' onClick={() => this.authorLogin("weixin")}>
            微信登录
          </Button>
          <Button type='primary' size='large' className='loginbtn' onClick={() => this.authorLogin("qq")}>
            QQ登录
          </Button>
        </div>
      </div>
    )
  }
  // 第三方登录
  authorLogin(type) {
    this.$plus(() => {
      this.state.authors[type].login(() => {
        Toast("授权成功")
      })
    })
  }
  async sendCode() {
    let { s, timer, phone } = this.state
    var re = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
    if (!phone) {
      Toast.info('请输入手机号')
      return
    }
    if (!re.test(phone)) {
      Toast.info('请输入正确的手机号')
      return
    }
    if (timer) {
      return
    }
    s = 59;
    this.setState({
      s: s,
      title: s + '秒后再次发送'
    })
    timer = setInterval(() => {
      s--
      if (s === 0) {
        clearInterval(timer)
        this.setState({
          title: '再次发送',
          timer: null,
          s: null
        })
        return
      }
      this.setState({
        s: s,
        timer: timer,
        title: s + '秒后再次发送'
      })
    }, 1000)
    let res = await sedUserCode({ phone })
    if (res.data.code === 200) {
      Toast.info('发送成功')
    }
  }

  async login() {
    let { phone, code } = this.state
    if (!phone || !code) {
      Toast.info('请您补充完整信息!')
      return
    }
    let res = await userLogin({ phone: phone, captcha: code })
    if (res.data.code === 200) {
      Toast.success('登录成功')
      //将登录成功的token存储到本地
      localStorage.setItem("USER_LOGIN", res.data.data.token)
      this.props.router.navigate(-1)
    } else {
      Toast.fail(res.data.message)
    }
  }

  close() {
    this.props.router.navigate('/index/home')
  }

}

export default WithRouter(Login)
