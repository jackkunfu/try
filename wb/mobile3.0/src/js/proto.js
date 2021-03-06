import $ from 'jquery'
import config from './config'

export default function(Vue){
    Vue.prototype.successCode = 200
    Vue.prototype.config = config
    // ajax
    Vue.prototype._ajax = function(url, data, type, notShowLoding){
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
                url: '/api'+url,
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

    Vue.prototype.trimObj = function(obj){
        var data = JSON.parse(JSON.stringify(obj))
        Object.keys(data).forEach(key =>{
            if(typeof data[key] == 'string') data[key] = data[key].trim()
        })
        return data
    }

    Vue.prototype.ajax = async function(){
        try{
            var res = await this._ajax(...arguments);
            if(res && res.code === this.successCode){}
            else this.messageTip(res.message || '请求失败，请稍后重试~')
            
            return res
            
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
        // this.$router.push({
        //   path: url,
        //   query: data || {}
        // })
        
        var ss = Object.keys(data).map(el => el + '=' + encodeURIComponent(data[el])).join('&')
        // alert(location.host + url + '?'+ss)
        window.location.href = url + '?'+ss
        // push 直接在ios不能改变地址栏地址   这里重新刷新下 改变下当前地址
        // setTimeout(()=>{ location.reload() }, 300)
    }

    Vue.prototype.file = function(id, cb, input){
        var headers = {}
        if(localStorage.zwManageUserToken) headers.token = localStorage.zwManageUserToken
        var data = new FormData()
        var input = input || document.getElementById(id)
        data.append('file', input.files[0])
        $.ajax({
            type: 'POST',
            url: '/api/mgr/upload',
            data: data,
            headers,
            contentType: false,
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                if(data && data.code == this.successCode) cb(data)
                else this.messageTip(data.msg || '上传出错，请稍后重试')

                input.value = ''
            },
            error: function(data) {
                input.value = ''
                this.messageTip("error，上传出错"+JSON.stringify(data));
            }
        });
    }


    Vue.prototype.getAllArea = async function (){
        var req = await this.ajax('/course/list', {
            limit: 100,
            offset: 0
        }, 'get')
        if(req && req.code == this.successCode){
            return req.data.rows || []
        }else{
            return []
        }
    }

    // 查询所有的已存在的城市列表
    Vue.prototype.getAllExistCity = async function(){
        var req = await this.ajax('/training/listCity', {}, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
            return data
        }
        else return []
    }

    // 查询训练营列表  具体每个城市的话 传入 城市名称字符串
    Vue.prototype.getAllTrain = async function(city){
        var req = await this.ajax('/training/listAll', { city: city || '' }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
            return data
        }
        else return []
    }

    // 查询卡种列表  具体每个训练营卡种的话 传入 训练营id
    Vue.prototype.getAllCard = async function(id){
        var req = await this.ajax('/card/listAll', { trainId: id || '' }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
            return data
        }
        else return []
    }

    // 查询上课时间列表  具体每个训练营的话 传入 训练营id
    Vue.prototype.getAllTrainTimes = async function(id){
        var req = await this.ajax('/training/listTrainingTime', { trainId: id || '' }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
            return data
        }
        else return []
    }

    // 查询销售顾问
    Vue.prototype.getAllSeller = async function(id){
        var req = await this.ajax('/sales/list', { limit: 100, offset: 0 }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data.rows || []
            return data
        }
        else return []
    }

    // 查询训练频次以及价格列表  具体每个训练营卡种的话 传入 卡种id
    Vue.prototype.getAllCardTimes = async function(cardId){
        var req = await this.ajax('/card/listFrequency', { cardId }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
            return data
        }
        else return []
    }

    Vue.prototype.getAllTimes = async function(city){
        return ['一周一次', '一周两次', '一周三次', '一周四次', '一周五次', '一周六次']
    }

    Vue.prototype.weekTimes = ['一周一次', '一周两次', '一周三次', '一周四次', '一周五次', '一周六次']
    Vue.prototype.allFrequency = ['一周一次', '一周两次', '一周三次', '一周四次', '一周五次', '一周六次']

}