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
        let result
        if (cType === 'html') {
          result = res.text()
        } else {
          result = res.json()
          result.then(ret => {
              if(ret.code != this.successCode) {
                  checkCode(ret.code, this)
                  ret.msg && !noTip && this.messageTip(ret.msg)
              }
          });
        }
        return result
    }else {
      // this.messageTip(res.statusText)
    }
      return res
    } catch (e) {
      console.log(e)
    }
  }
}