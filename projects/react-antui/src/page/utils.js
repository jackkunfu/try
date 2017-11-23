import config from '../config'
import { Component } from 'react'

import { message } from 'antd'

export default class Utils extends Component{
    // constructor(){
    //     super()
    // }

    async selfReq(type, url, options){
        var _this = this;
        return new Promise(function(r, j){
            var xhr = new XMLHttpRequest();

            xhr.withCredentials = true; //支持跨域发送cookies

            if(type.toLowerCase() == 'get'){
                // console.log(options)
                var reqUrl = config.baseUrl + url;

                if(options){
                    var s = ''
                    for(var i in options){
                        if(options.hasOwnProperty(i)){
                            s += i+'='+options[i]+'&'
                        }
                    }
                    var l = s.length;
                    reqUrl += '?'+s.substr(0, l-1);
                }
                xhr.open(type, reqUrl, true);
                xhr.send(null);
            }else{
                console.log(options)
                xhr.open(type, config.baseUrl + url, true);
                var s = '', l = 0 ;
                if(options){
                    for(var i in options){
                        if(options.hasOwnProperty(i)){
                            s += i+'='+options[i]+'&'
                        }
                    }
                    l = s.length;
                }
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(s.substr(0, l-1));
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        var data = JSON.parse(xhr.responseText)
                        // console.log(data)
                        if(data.msgCode == '-2'){
                            alert(data.msgCode)
                            message.error(data.msgCode);
                            _this.props.history.push('login');
                        }
                        r(data);
                    }else{
                        j(xhr);
                    }
                }
            }
        })
    }

    async ajax(type, url, options){
        var data = null;
        try{
            data = await this.selfReq(type, url, options)
        }catch(e){
            console.log(e)
        }
        return data;
    }
}
