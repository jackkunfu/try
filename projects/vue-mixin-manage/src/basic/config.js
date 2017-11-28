// import $ from 'jquery'
import md5 from 'md5'

// var basicUrl = 'http://172.16.8.186:8080';
// var basicUrl = 'http://172.16.8.186:8080';
var basicUrl = 'http://172.16.8.197:8081';

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
    },

    makeAjax(vm) {
        var config = this;
        return function(type, url, options) {
            // 处理请求参数
            // var req = config.handleOptions(options || {})
            // req._sy = config._sy
            var req = options;

            return new Promise((resolve, reject) => {
                $.ajax({
                    type: type,
                    url: config.apiBasicUrl + url,
                    dataType: 'json',
                    crossDomain: true,
                    data: req,
                    xhrFields: {
                        withCredentials: true
                    }
                }).done((res) => {
                    resolve(res);
                    // msgCode: '-2' 表示请求过期
                    if (!res.success && res.msgCode == '-2') {
                        vm.$message({
                            type: 'error',
                            message: '请求已过期，请重新登录~'
                        });
                        vm.$router.push('/login');
                    }
                }).fail((e, a, b) => {
                    // alert(`ajax fail: ${url}`)
                    vm.$message({
                        type: 'error',
                        message: e
                    })
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
