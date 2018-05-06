var addZero = function(v) {
    return (v+'').length == 1 ? '0'+v : v;
}

export default function(Vue){
    Vue.filter('time', function (t) {
        var nt = new Date(t)
        return t ? (nt.getFullYear() + '-' + ((nt.getMonth())+1) + '-' + addZero(nt.getDate())) : '';
    })
    Vue.filter('timeAll', function (t) {
        var nt = new Date(t)
        return nt.getFullYear() + '-' + (nt.getMonth()+1) + '-' + addZero(nt.getDate()) + ' ' +
            addZero(nt.getHours()) + ':' + addZero(nt.getMinutes()) + ':' + addZero(nt.getSeconds());
    })
    Vue.filter('trimAll', function (d) {
        return d.replace(/\s+/g, '');
    })
    Vue.filter('trim', function (d) {
        return d.trim();
    })
    Vue.filter('short', function (v) {
        return v.length > 20 ? v.substr(0, 20) + '......' : v
    })
    Vue.filter('pay', function (v) {
        return v ? '已支付' : '未支付'
    })
}