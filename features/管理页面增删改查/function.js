function ajax(type,url,opts,cb){
    $.ajax({
        url: url,
        type: type,
        data: opts
    }).done(function(data){
        cb(data);
    }).fail(function(e){
        alert(e)
    })
}