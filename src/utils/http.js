import axios from 'axios';
axios.defaults.baseURL = "https://apif.java.crmeb.net";
axios.defaults.timeout = 6000;

let sendHttp = (url,method,data=null)=>{
    return axios({
        url,
        method,
        params:method==='get'? data : null,
        data:method==='post'? data : null
    })
} 

export default sendHttp;