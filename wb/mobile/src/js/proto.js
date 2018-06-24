import $ from 'jquery'

export default function(Vue){
    Vue.prototype.successCode = 200
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

    Vue.prototype.ajax = async function(){
        try{
            var res = await this._ajax(...arguments);
            if(res && res.code === this.successCode){
                return res
            }else{
                return this.messageTip(res.message || '请求失败，请稍后重试~')
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
        var req = await this.ajax('/card/listAll', { id: id || '' }, 'get')
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

    // 查询卡种列表  具体每个训练营卡种的话 传入 训练营id
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

}