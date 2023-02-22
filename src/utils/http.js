import axios from 'axios';
import { Toast } from 'react-vant';
axios.defaults.baseURL = "https://apif.java.crmeb.net";
axios.defaults.timeout = 6000;

//响应拦截
axios.interceptors.response.use((res)=>{
    if(res.data.code===401){
        Toast.info(res.data.message)
        setTimeout(()=>{
            window.location.href = '#/login'
        },1000)
        return { code:401 }
    }
    return res
})

let sendHttp = (url,method,data=null)=>{
    return axios({
        url,
        method,
        params:method==='get'? data : null,
        data:method==='post'? data : null
    })
} 

export default sendHttp;