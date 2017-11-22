import config from '../config'
import { Component } from 'react';
export default class Utils extends Component{
    // constructor(){
    //     super()
    // }

    selfReq(type, url, options){
        return new Promise(function(r, j){
            var xhr = new XMLHttpRequest();
            
            xhr.withCredentials = true; //支持跨域发送cookies
            
            if(type.toLowerCase() == 'get'){
                console.log(options)
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
                xhr.open(type, config.baseUrl + url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(options || null);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        var data = JSON.parse(xhr.responseText)
                        console.log(data)
                        if(data.msgCode == '-2'){
                            // window.location.href = "/login"
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
            throw new Error(e);
        }
        return data;
    }
}
