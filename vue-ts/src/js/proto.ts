import { Component } from 'vue';
import { Constructor } from 'vue/types/options';

interface FetchParams {
  url: string;
  parama: any;
  otherConfig: any;
}

async function ajax(...argus: any) {
  // url: string, parama: object , type?: string, otherConfig?: any
  let opts = {
    method: argus[2] || 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'token': ''
    },
    body: ''
  }
  if (argus.otherConfig) {
    opts = Object.assign(opts, {...argus.otherConfig})
  }
  if (process.env.NODE_ENV === 'development') {
    opts.headers.token = '123456789'
  }
  if (argus[1]) {
    opts.body = JSON.stringify(argus[1])
  }
  return fetch(argus[0], opts)
}

export default function(Vue: Constructor) {
  Vue.prototype.fetch = async function(url: string, parama: object|string, type: string, config?: any) {
    try {
      let res = await ajax(url, parama, type, config);
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
        return null
      } 
    } catch (e) {
      console.log(e)
    }
  }
}