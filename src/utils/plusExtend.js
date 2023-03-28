let plusExtend = (callback)=>{
    // 监听plus全局对象准备完成
    document.addEventListener("plusready",()=>{
        // 执行 plus api
        callback();
    })
}

export default plusExtend;