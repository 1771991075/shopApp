let plusExtend = (callback) => {
    if (window.plus) {
        callback()
    } else {
        document.addEventListener('plusready', callback, false)
    }
}

export default plusExtend;