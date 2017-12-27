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

function ajax(type,url,opts,cb){
    $.ajax({
        url: url,
        type: type,
        dataType: 'jsonp',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: handleOptions(opts)
    }).done(function(data){
        cb(data);
    }).fail(function(e){
        alert(e)
    })
}



