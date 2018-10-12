export default function(Vue) {

    Vue.prototype.go = function (path, data) {
        this.$router.push({
            path: path,
            query: data
        })
    }
}