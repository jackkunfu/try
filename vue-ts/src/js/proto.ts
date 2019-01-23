import { Component } from 'vue';
import { Constructor } from 'vue/types/options';

interface FetchParams {
  url: string;
  parama: any;
  otherConfig: any;
}

async function ajax(...argus: any) {
  // url: string, parama: object , type?: string, otherConfig?: any
  let {url, parama, type, otherConfig} = argus
  let opts = {
    method: type || 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'token': ''
    },
    body: ''
  }
  if (otherConfig) {
    opts = Object.assign(opts, {otherConfig})
  }
  if (process.env.NODE_ENV === 'development') {
    opts.headers.token = '123456789'
  }
  if (parama) {
    opts.body = JSON.stringify(parama)
  }
  return fetch(url, opts)
}

export default function(Vue: any) {
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