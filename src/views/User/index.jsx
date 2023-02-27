import React, { Component, createRef } from 'react'
import WithRouter from '../../router/withRouter'
import { NavBar, Cell, Button, Field, Toast } from 'react-vant';
import { getUser, sendImg ,saveUser} from '../../api/mine'
import './index.css'

class User extends Component {

    upFile = createRef()

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
                            <div>
                                <img src={userInfo.avatar} alt="" onClick={()=>this.upLoad()}/>
                            </div>
                        </div>
                        <Field label="昵称" placeholder={nickname} onFocus={()=>this.setState({nickname})} value={nickname} onChange={(value) => this.setState({ nickname: value })} align="right" />
                        <Cell title='手机号' value={userInfo.phone} />
                        <Cell title='ID号' value={2983} />
                    </Cell.Group>
                }
                <div className='user_mid'>
                    <Button type='primary' block round color='#e93323' onClick={()=>this.save()}>
                        保存修改
                    </Button>
                    <Button type='primary' block round className='getOut' onClick={()=>this.exit()}>
                        退出登录
                    </Button>
                </div>
                <input type="file" name="" id="" className='upload' ref={this.upFile} onChange={(e)=>this.getImg(e)}/>
            </div>
        )
    }

    async componentDidMount() {
        let res = await getUser()
        this.setState({
            userInfo: res.data.data,
            nickname: res.data.data.nickname
        })
    }

    //保存头像
    upLoad(){
        this.upFile.current.click()
    }
    
    async getImg(e){
        //获取文件对象
        let file = e.target.files[0]
        //创建formdata实例
        let data = new FormData()
        //向formdata对象中追加属性 属性名为 上传文件的属性名 属性值为要上传的文件对象
        data.append('multipart',file)
        let res = await sendImg(data)
        if(res.data.code === 200){
            Toast.success('上传成功')
            let {userInfo} = this.state
            userInfo.avatar = res.data.data.url
            this.setState({
                userInfo
            })
        }else{
            Toast.fail(res.data.message)
        }
    }

    async save(){
        let {userInfo,nickname} = this.state
        let avatar = userInfo.avatar
        let phone = userInfo.phone
        let data = {
            avatar,
            nickname,
            phone
        }
        let res = await saveUser(data)
        if(res.data.code === 200){
            Toast.success('保存成功')
        }else{
            Toast.fail(res.data.message)
        }
    }

    //退出登录
    exit(){
        localStorage.removeItem('USER_LOGIN')
        this.props.router.navigate('/login')
    }
}

export default WithRouter(User)
