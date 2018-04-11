export default {
    methods: {
        scrollMore(dom, list, cur, total, url, options) {
            var _this = this;
            $(dom).parents('.el-select-dropdown__wrap').scroll(async function(){
                var $this =$(this),
                viewH = $this.height(),//可见高度
                contentH = $this.get(0).scrollHeight,//内容高度
                scrollTop = $this.scrollTop();//滚动高度
                if(contentH - viewH - scrollTop <= 10) { //到达底部100px时,加载新内容
                    // 这里加载数据..
                    _this[cur]++;
                    if(_this[total] < _this[cur]) return;

                    var a = {
                      page: _this[cur]
                    }
                    if(options){
                        $.extend(true, a, options)
                    }

                    var data = await tryAwait('get', url, a);
                    var res;
                    if(data){
                        res = data.model || [];
                    }
                    if(res.length>1){
                        _this[list] = _this[list].concat(res);
                    }
                }
            });
        }
    }
}
