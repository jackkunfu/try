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
    Vue.prototype.getAllCard = async function(id){
        var req = await this.ajax('/card/listAll', { trainId: id || '' }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data || []
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

    // 查询销售顾问列表
    Vue.prototype.getAllSeller = async function(id){
        var req = await this.ajax('/sales/list', { limit: 100, offset: 0 }, 'get')
        if(req && req.code == this.successCode){
            let data = req.data.rows || []
            return data
        }
        else return []
    }

    Vue.prototype.weekTimes = ['一周一次', '一周两次', '一周三次', '一周四次', '一周五次', '一周六次']
    Vue.prototype.allFrequency = ['一周一次', '一周两次', '一周三次', '一周四次', '一周五次', '一周六次']

    Vue.prototype.getAllTimes = async function(city){
        return ['一周一次', '一周两次', '一周三次', '一周四次', '一周五次', '一周六次']
    }
}