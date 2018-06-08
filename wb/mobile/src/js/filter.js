function fill(v, key){
    return v.length > 1 ? v : key+''+v
}
export default function(Vue){
    Vue.filter('els', function(v, len){    // 截取省略
        if(!v) return '';
        return len && len > 0 ? v.substring(0, len)+'..' : v.substring(0, 15)+'..'
    })

    Vue.filter('time', function(v, fillKey, isAll){    // 截取省略
        if(!v) return '';
        var t = new Date(v);
        var part1 = fill(t.getFullYear(), fillKey) + fill(t.getMonth()+1, fillKey) + fill(t.getDate(), fillKey)
        var part2 = fill(t.getHours(), fillKey) + fill(t.getMinutes, fillKey) + fill(t.getSeconds(), fillKey)
        return isAll ? (part1 + ' ' + part2) : part1
    })

}