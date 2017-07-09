

(function($){
	var EleDelayTrigger = function(options) {
	    if (!options || $.type(options) !== 'object' || !options.el) {
	        console.error('DelayTrigger传参有误');
	        return false;
	    }
	    this.el = options.el;
	    if(!options.t || isNaN(options.t) || parseInt(options.t) < 0){
	        this.t = 300;
	    }else{
	        this.t = parseInt(options.t);
	    }
	    this.cb = options.cb && $.type(options.cb) == 'function' ? options.cb : function() {};
	    this.delay = null;
	}
	EleDelayTrigger.prototype.constructor = EleDelayTrigger;
	EleDelayTrigger.prototype.init = function() {
	    if (!this.el) return false; // 防止传参无el字段时报错
	    if ($(this.el).attr('data-running') == '1') return true;
	    $(this.el).attr('data-running', '1')
	    var _this = this
	    this.delay = setTimeout(function() {
	        $(_this.el).removeAttr('data-running');
	        _this.cb();
	        clearTimeout(_this.delay);
	    }, _this.t);
	    return false;
	}
	EleDelayTrigger.prototype.set = function(time){
	    if (time && !isNaN(time) && parseInt(time) > 0) this.t = time;
	}
	EleDelayTrigger.prototype.cancel = function() {
	    this.t = 0;
	    this.delay !== null && clearTimeout(this.delay)
	}
	window.EleDelayTrigger = EleDelayTrigger;
})($)

var delay = new DelayTrigger({el: '.a', t: 500})
delay.init();  // 触发限制操作
delay.set(1000);  // 重置延迟时间为1000ms
delay.cancel();  // 取消延迟限制







$.fn._clickControl = function(options, cb) {
    console.log(options)
    var options = $.type(options) == 'object' ? options : {}
    console.log(options)
    var t = options.t ? options.t : 300;
    console.log(t)
    var cb = typeof cb == 'function' ? cb : function() {}
    if (t <= 0) {
        cb()
        return false
    }
    if (this.attr('data-running') == '1') {
        return true;
    }
    this.attr('data-running', '1')
    var _this = this
    var s = setTimeout(function() {
        _this.removeAttr('data-running');
        cb()
        clearTimeout(s)
    }, t)
    return false
}