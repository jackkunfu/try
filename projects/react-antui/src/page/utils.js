import config from '../config'
import { Component } from 'react'

import { message } from 'antd'

import axios from 'axios'
import qs from 'qs'

export default class Utils extends Component{
    // constructor(){
    //     super()
    // }

    async selfReq(type, url, options){

        // 用axios处理ajax请求
        axios.defaults.baseURL = config.baseUrl;
        axios.defaults.withCredentials = true;
        var f = function(type, url, options){
            if(type.toLowerCase() === 'get'){
                return axios.get(url, {
                    params: options
                })
            }else{
                // 由于axios默认发送数据时，数据格式是Request Payload，
                // 而并非我们常用的Form Data格式，所以在发送之前，需要使用qs模块对其进行处理
                return axios[type](url, qs.stringify(options))   // post
            }
        }
        var res = await f(type, url, options)
        // console.log(res)
        if(res && res.data.msgCode === '-2'){
            message.error(res.data.msgInfo);
            this.props.history.push('login');
        }else{
            return res.data;
        }
        
        // 用xhr处理ajax请求
        // var _this = this;
        // return new Promise(function(r, j){

        //     var xhr = new XMLHttpRequest();

        //     xhr.withCredentials = true; //支持跨域发送cookies

        //     var s = '';
        //     var l = 0;
        //     if(type.toLowerCase() === 'get'){
        //         // console.log(options)
        //         var reqUrl = config.baseUrl + url;

        //         if(options){
                    
        //             for(var i in options){
        //                 if(options.hasOwnProperty(i)){
        //                     s += i+'='+options[i]+'&'
        //                 }
        //             }
        //             l = s.length;
        //             reqUrl += '?'+s.substr(0, l-1);
        //         }
        //         xhr.open(type, reqUrl, true);
        //         xhr.send(null);
        //     }else{
        //         // console.log(options)
        //         xhr.open(type, config.baseUrl + url, true);
        //         if(options){
        //             for(i in options){
        //                 if(options.hasOwnProperty(i)){
        //                     s += i+'='+options[i]+'&'
        //                 }
        //             }
        //             l = s.length;
        //         }
        //         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //         xhr.send(s.substr(0, l-1));
        //     }

        //     xhr.onreadystatechange = function(){
        //         if(xhr.readyState === 4){
        //             if(xhr.status === 200){
        //                 var data = JSON.parse(xhr.responseText)
        //                 // console.log(data)
        //                 if(data.msgCode === '-2'){
        //                     alert(data.msgCode)
        //                     message.error(data.msgCode);
        //                     _this.props.history.push('login');
        //                 }
        //                 r(data);
        //             }else{
        //                 j(xhr);
        //             }
        //         }
        //     }
        // })
    }

    async ajax(type, url, options){
        var data = null;
        try{
            data = await this.selfReq(type, url, options)
        }catch(e){
            console.error(e)
        }
        return data;
    }
}
