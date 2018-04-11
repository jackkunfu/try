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
    Vue.filter('idCard', function (v) {
        if(!v) return '';
        if(v=='无') return '无';
        v += '';
        return v.substr(0, 3) + '******' + v.substr(-3, 3)
    })
    Vue.filter('short', function (v) {
        return v.length > 20 ? v.substr(0, 20) + '......' : v
    })
}