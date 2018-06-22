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
        return await this.storeAll({
            name: 'CITYS',
            url: '/course/list',
        })
    }

    Vue.prototype.getAllTrain = async function(){
        return await this.storeAll({
            name: 'TRAINS',
            url: '/training/list',
        })
    }
}