(function(Vue, $) {

    Vue.prototype._ajaxData = function(url, type, options, cb) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: options
        }).done(function(res) {
            cb(res);
        }).fail(function(e) {
            console.error(e);
            alert(e.msg)
        })
    }

    document.documentElement.style.fontSize = document.documentElement.clientWidth / 64 + 'px';

})(Vue, $)