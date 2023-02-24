import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Cell, Button, Field, Uploader } from 'react-vant';
import { getUser, changeUser} from '../../api/mine'
import './index.css'

class User extends Component {
    state = {
        userInfo: null,
        nickname: ''
    }
    render() {
        let { userInfo, nickname } = this.state
        return (
            <div className='user'>
                <div className='user_header'>
                    <NavBar
                        title="用户信息"
                        onClickLeft={() => this.props.router.navigate(-1)}
                    />
                </div>
                {
                    userInfo && <Cell.Group>
                        <div className='img'>
                            <div className='touxiang'>头像</div>
                            <Uploader
                                accept='image'
                                // defaultValue
                                onChange={v => this.getImg(v)}
                            />
                            {/* <Image round width='15%' height='13vw' src={userInfo.avatar} /> */}
                        </div>
                        <Field label="昵称" placeholder={nickname} onChange={(value) => this.setState({ nickname: value })} align="right" />
                        <Cell title='手机号' value={userInfo.phone} />
                        <Cell title='ID号' value={2983} />
                    </Cell.Group>
                }
                <div className='user_mid'>
                    <Button type='primary' block round color='#e93323'>
                        保存修改
                    </Button>
                    <Button type='primary' block round className='getOut'>
                        退出登录
                    </Button>
                </div>
            </div>
        )
    }

    async componentDidMount() {
        let res = await getUser()
        console.log(res);
        this.setState({
            userInfo: res.data.data,
            nickname: res.data.data.nickname
        })
    }

    //修改用户信息
    async changeUserInfo() {
        let { userInfo, nickname } = this.state

        let data = {
            avatar: '',
            nickname: nickname,
            phone: userInfo.phone
        }
        let res = await changeUser(data)
        console.log(res);
    }
    //保存头像
    async getImg(v){
        // console.log(v[0].url);
        // let res = sendImg(v[0])
        // console.log(res);
    }
}

export default WithRouter(User)
