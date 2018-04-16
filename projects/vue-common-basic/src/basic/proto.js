import $ from 'jquery'
export default function(Vue){
    Vue.prototype._ajax = function(url, data, type){
        return new Promise(function(rs, rj){
            $.ajax({
                type: type || 'post',
                url: url,
                dataType: 'json',
                data: data || {},
                xhrFields: {
                    withCredentials: true
                }
            }).done(function(data){
                rs(data)
            }).fail(function(e){
                rj(e);
            })
        })
    }
}