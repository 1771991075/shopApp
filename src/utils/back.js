import { Toast } from "react-vant";

let back = ()=>{
  document.addEventListener('plusready', function() {
    var first = null;
  //   h5+监听 手机物理键返回上一页
    plus.key.addEventListener('backbutton', function() {
        if(!first) {
            first = new Date().getTime(); //记录第一次按下回退键的时间
            var urls = window.location.hash.split('/')[1]
            //var Currenturls = location.hash.split('/')[0]
            
             if (urls=="NewD"||urls=="StartScan") {
               // alert(urls);
                //history.go(-1);
             }else{
                window.history.back(-1);
             }
            setTimeout(function() {
                //0.5s中后清除，因为1s的间隔相对于太长，这样连续按两次就退出去，效果不好
                first = null;
            }, 500);
        } else {
            if(new Date().getTime() - first < 500) {
              Toast("退出应用")
                //如果两次按下的时间小于0.5s，同上
                plus.runtime.quit(); //那么就退出app
                
            }
        }
    });
  })
}

export default back;