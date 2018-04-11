// import $ from 'jquery'
import md5 from 'md5'

// var basicUrl = 'http://172.16.8.186:8080';
var basicUrl = 'http://172.16.8.197:8081';
// var basicUrl = 'http://120.26.41.233:8089';

var mapiUrl;
var currentDomain = window.location.host;
if (currentDomain == "172.16.8.191:82") {
    mapiUrl = "http://172.16.8.194/mapi";
} else if (currentDomain == "h5.stg.iputong.com") {
    mapiUrl = "http://120.26.91.195:8080/mapi";
} else if (currentDomain == "h5.iputong.com") {
    mapiUrl = "http://api.iputong.com/mapi";
} else {
    mapiUrl = "http://172.16.8.194/mapi";
}

var config = {
    // api 接口地址
    apiBasicUrl: basicUrl,
    upImgUrl: basicUrl + '/upload/index',
    // 必传参数 _sy 组合逻辑
    _sy: (function() {
        var area = screen.width + '*' + screen.height
        var url = location.href.split('//')[1].split('/')[0]
        return 'P||1||' + area + '||pc||4||' + url;
    })(),

    // 接口必须参数
    handleOptions: function(options) {
        var _sy = this._sy
        var buildInput = function(input) {

            // // 去掉空值传输
            // Object.keys(input).forEach( v => {
            //     var value = input[v]
            //     if(value === '' || value == null || value == 'undefined' || value == 'null'){
            //         delete input[v];
            //     }
            // })
            
            var inputs = $.extend(true, {}, input)
            inputs._appId = 14;
            inputs._sy = inputs._sy || _sy;
            inputs._t = inputs._t || new Date().getTime();
            inputs._v = inputs._v || '1.0';
            inputs._se = localStorage.saas_se || '';

            // 去掉空值传输
            Object.keys(inputs).forEach( v => {
                var value = inputs[v]
                if(value === '' || value == null || value == 'undefined' || value == 'null'){
                    delete inputs[v];
                }
            })
            
            return $.extend(true, {}, inputs);
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
            return md5(md5(at) + 'pudong*saas');
        }

        // return $.param(buildInput(options)) + "&_at=" + buildAt(options);
        var op = buildInput(options);
        op._at = buildAt(op);
        return op
    },

    makeAjax(vm) {
        var config = this;
        return function(type, url, options, fromMapi) {
            // 处理请求参数
            // var req = config.handleOptions(options || {})
            // req._sy = config._sy
            var req = fromMapi ? config.handleOptions(options || {}) : options;
            if(fromMapi) req._sy = config._sy;

            return new Promise((resolve, reject) => {
                $.ajax({
                    type: type,
                    url: fromMapi ? mapiUrl : (config.apiBasicUrl + url),
                    dataType: fromMapi ? 'jsonp' : 'json',
                    crossDomain: true,
                    data: req,
                    xhrFields: {
                        withCredentials: true
                    }
                }).done( res => {
                    resolve(res);
                    if(!res.success){
                        if(res.msgInfo){
                            if(res.msgInfo.indexOf('未查找到') > -1){
                            }else{
                                vm.$message({
                                    type: 'error',
                                    message: res.msgInfo
                                });
                            }
                        }
                    }

                    if(res.msgInfo && res.msgInfo.indexOf('验证失败')>-1){
                        localStorage.removeItem('saasUser')
                        localStorage.removeItem('saas_loginId')
                        localStorage.removeItem('saas_mobile')
                        localStorage.removeItem('saas_se')
                        vm.$router.push({path:'/login'});
                    }

                    if(res.msgCode && res.msgCode == 3){
                        vm.$message({
                            type: 'error',
                            message: res.msgInfo || '请重新登录'
                        });
                        localStorage.removeItem('saasUser')
                        localStorage.removeItem('saas_loginId')
                        localStorage.removeItem('saas_mobile')
                        localStorage.removeItem('saas_se')
                        vm.$router.push({path:'/login'});
                    }
                    // msgCode: '-2' 表示请求过期
                    // if (!res.success && res.msgCode == '-2') {
                    //     vm.$message({
                    //         type: 'error',
                    //         message: '请求已过期，请重新登录~'
                    //     });
                    //     vm.$router.push('/login');
                    // }
                }).fail((e, a, b) => {
                    // vm.$message({
                    //     type: 'error',
                    //     message: `ajax fail: ${url}`
                    // })
                    throw new Error(`ajax fail: ${url}`)
                        // vm.$message({
                        //     type: 'error',
                        //     message: e
                        // })
                    reject(e);
                })
            })
        }
    },


    // 上传文件
    upfile(d, cb) {
        $.ajax({
            type: 'POST',
            url: basicUrl + '/upload/index',
            data: d,
            crossDomain: true,
            contentType: false,
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                alert(data.msgInfo);
                cb(data);
            },
            error: function(data) {
                alert("上传出错");
            }
        });
    }

}

export default config