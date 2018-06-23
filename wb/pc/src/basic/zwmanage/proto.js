export default function(Vue){
    Vue.prototype.storeAll = async function(opt){
        if(this[opt.name] && this[opt.name].length > 0) return this[opt.name]
        var req = await this.ajax(opt.url, opt.data || { limit: 100, offset: 0 }, opt.type || 'get')
        if(req && req.code == this.successCode){
            let data = req.data.rows || []
            Vue.prototype[opt.name] = data
            return data
        }
        return []
    }

    Vue.prototype.getAllCity = async function(){
        // return await this.storeAll({
        //     name: 'CITYS',
        //     url: '/course/list',
        // })
        return [{
            city: '杭州'
        }, {
            city: '宁波'
        }, {
            city: '温州'
        }, {
            city: '嘉兴'
        }, {
            city: '湖州'
        }, {
            city: '绍兴'
        }, {
            city: '金华'
        }, {
            city: '衢州'
        }, {
            city: '舟山'
        }, {
            city: '台州'
        }, {
            city: '丽水'
        }]
    }

    Vue.prototype.getAllExistCity = async function(city){
        var req = await this.ajax('/training/listCity', {}, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
            return data
        }
        else return []
    }

    Vue.prototype.getAllTrain = async function(city){
        var req = await this.ajax('/training/listAll', { city: city || '' }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
            return data
        }
        else return []
    }

    Vue.prototype.getAllCard = async function(id){
        var req = await this.ajax('/card/listAll', { id: id || '' }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
            return data
        }
        else return []
    }

    Vue.prototype.getAllTimes = async function(city){
        return ['一周一次', '一周两次', '一周三次', '一周四次', '一周五次', '一周六次']
    }
}