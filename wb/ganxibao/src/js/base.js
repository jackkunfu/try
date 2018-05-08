// export const apiServer = 'http://198.44.243.39:8088';
export default function(Vue){
    Vue.prototype._ajax = function(url, data, type){
        // $('#messageTip').remove();
        if($('#tip').length < 1){
            $('body').append('<div id="tip">加载中...</div>');
        }
        return new Promise(function(rs, rj){
            $.ajax({
                url: '/api/GXB'+url,
                // url: 'http://47.52.152.120:8080/GXB'+url,
                type: type || 'post',
                dataType: 'json',
                data: data || {},
                xhrFields: {
                    withCredentials: true
                }
            }).done(function(data){
                $('#tip').remove()
                rs(data);
            }).fail(e => {
                // console.log(e);
                $('#tip').remove()
                rj(e);
            })
        })
    }

    Vue.prototype.ajax = async function(){
        try {
            var res = await this._ajax(...arguments);
            if(res && res.code != 1){
                this.messageTip(res.msg || '请求出错，请稍后重试~')
                // if(res.code == 201) this.goUrl('/')
                // else this.messageTip(res.msg || '请求出错，请稍后重试~')
            }
            return res;
        }catch(e){
            $('#tip').remove()
            this.messageTip('请求出错，请稍后重试~')
            console.log(arguments[0] + '请求出错');
            console.log(e);
        }
    }
    
    Vue.prototype.goUrl = function(url, data){      // 路由跳转
        if(!url) return
        $('#tip').remove();
        $('#messageTip').remove();
        this.$router.push({
          path: url,
          query: data || {}
        })
    }

    Vue.prototype.messageTip = function(str, type){      // 提示  str  内容   type  控制展示对图片
        $('#tip').remove();
        $('#messageTip').remove();
        var img = type ? require('../img/ok.png') : require('../img/nok.png');
        $('body').append(`<div id="messageTip"><img src="${img}" />${str}</div>`);
        setTimeout( ()=> { $('#messageTip').remove(); }, 2000)
    }

    Vue.prototype.timeAll = function(t){     // 时间格式：2018-04-27 20:49:29
        var datetime = new Date(t);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minutes = datetime.getMinutes();
        var second = datetime.getSeconds();
        if (date < 10) { date = '0' + date };
        if (month < 10) { month = '0' + month };
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + second;
    }

}
