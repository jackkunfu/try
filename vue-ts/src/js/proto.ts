export default function (Vue) {
  let _fetch =  function(url, parama, otherConfig) {
    let req = await fetch({
      method: 
    })
  }
  Vue.prototype.fetch = function () {
    try {
      let options = { ...arguments }
      let res = _fetch(options)
      if(res.ok){
        let result = config && config.cType === 'html' ? res.text() : res.json()
        if (result.code === this.successCode) {
          return result
        } else {
          if (res) checkCode(result.code)
          if (options.otherConfig && options.otherConfig.errorTip) {
            res.json().msg && this.messageTip(res.json().msg || '操作失败')
          }
          return null
        }
      } else {
        return bull
      } 
    } catch (e) {
      console.log(e)
    }
  }
}