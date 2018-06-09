import $ from 'jquery'
import config from './config'

export default function(Vue){
    // ajax
    Vue.prototype._ajax = function(url, data, type){
        var data = data || {};
        var type = type || 'post';
        var headers = {}
        if(localStorage.zwAuthorization) headers.Authorization = localStorage.zwAuthorization
        if($('#tip').length < 1){
            if(!notShowLoding){
                $('body').append('<div id="tip">加载中...</div>');
            }
        }
        return new Promise(function(rs, rj){
            $.ajax({
                type,
                url,
                headers,
                dataType: 'json',
                data, 
                xhrFields: {
                    withCredentials: true
                }
            }).done(function(data){
                $('#tip').remove()
                rs(data)
            }).fail(function(e){
                $('#tip').remove()
                rj(e);
            })
        })
    }

    Vue.prototype.ajax = async function(){
        try{
            var res = await this._ajax(...arguments);
            if(res && res.code === 0){
                return res
            }else{
                return this.messageTip(res.msg || '请求失败，请稍后重试~')
            }
        }catch(e){
            console.log(arguments[0])
            console.log(e)
        }
    }


    Vue.prototype.messageTip = function(str, type){      // 提示  str  内容   type  控制展示对图片
        $('#tip').remove();
        $('#messageTip').remove();
        // var img = type ? require('../img/ok.png') : require('../img/nok.png');
        // $('body').append(`<div id="messageTip"><img src="${img}" />${str}</div>`);
        $('body').append(`<div id="messageTip">${str}</div>`);
        setTimeout( ()=> { $('#messageTip').remove(); }, 2000)
    }

    Vue.prototype.goUrl = function(url, data){      // 路由跳转
        if(!url) return location.reload()
        $('#tip').remove();
        $('#messageTip').remove();
        this.$router.push({
          path: url,
          query: data || {}
        })
    }

}