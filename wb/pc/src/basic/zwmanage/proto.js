export default function(Vue){
    Vue.prototype.getAllCity = async function(){
        var req = await this.ajax('/course/list', {
            limit: 100,
            offset: 0
        }, 'get')
        if(req && req.code == this.successCode) return req.data.rows || []
        return []
    }

    Vue.prototype.getAllTrain = async function(){
        var req = await this.ajax('/training/list', {
            limit: 100,
            offset: 0
        }, 'get')
        if(req && req.code == this.successCode) return req.data.rows || []
        return []
    }
}