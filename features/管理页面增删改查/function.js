var _sy = (function() {
    var area = screen.width + '*' + screen.height
    var url = location.href.split('//')[1].split('/')[0]
    return 'P||1||' + area + '||pc||4||' + url;
})()

function handleOptions(options) {
    var buildInput = function(inputs) {
        inputs._appId = 16;
        inputs._sy = inputs._sy || _sy;
        inputs._t = inputs._t || new Date().getTime();
        inputs._v = inputs._v || '1.0';
        inputs._se = localStorage._se || '';
        return inputs;
    }
    var buildAt = function(inputs) {
        var params = {};
        var array = [];
        var i = 0;
        var at = "";
        $.each(inputs, function(name, value) {
            params[name] = value;
            array[i] = name;
            i++;
        });
        array.sort();
        for (var ele in array) {
            at += array[ele];
            at += params[array[ele]];
        }
        return md5(md5(at) + 'pudong*b');
    }

    // return $.param(buildInput(options)) + "&_at=" + buildAt(options);

    var op = buildInput(options);
    op._at = buildAt(options);
    return op
}

function ajax(opts,cb){
    var url;
    var currentDomain = window.location.host;
    if(currentDomain == "h5.stg.iputong.com") {
        url = "http://120.26.91.195:8080/mapi";
    } else if (currentDomain == "h5.iputong.com") {
        url = "http://api.iputong.com/mapi";
    } else {
        url = "http://172.16.8.194/mapi";
    }
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: handleOptions(opts)
    }).done(function(data){
        if(!data.success) alert(data.msgInfo)
        data.success && cb(data);
    }).fail(function(e){
        alert(e)
    })
}



