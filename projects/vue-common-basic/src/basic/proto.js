import $ from 'jquery'
import config from './config'

export default function(Vue){
    Vue.prototype._ajax = function(url, data, type){
        return new Promise(function(rs, rj){
            $.ajax({
                type: type || 'post',
                url: config.basicApi + url,
                dataType: 'json',
                data: data || {},
                crossDomian: true,
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