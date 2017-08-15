// 限下拉框的赌赢联动
(function($){
    function Linkage(ele, target, type){
        this.ele = $(ele) || $('');
        this.target = $(target) || $('');
        this.options = null;
        this.type = type || null;
    }

    Linkage.prototype.init = function(options){
        if(!options || Object.prototype.toString.call(options) !== '[object Array]') return;
        this.options = options;
        this.link();
    }

    Linkage.prototype.link = function(){
        if(this.ele.length == 0 || this.target.legth == 0) return;
        var _this = this;
        console.log(_this.target.val())
        this.ele.each(function(i, ele){
            $(ele).click(function(){
                _this.target.each(function(j, el){
                    if(_this.type && _this.type == 'attr'){
                        if(_this.options[i].indexOf(j) < 0){
                            console.log(j)
                            $(el).attr('disabled','disabled');
                            // 改变选中的值
                            if($(_this.target).val() == j+1){
                                $(_this.target).val(null)
                            }
                        }else{
                            $(el).removeAttr('disabled');
                        }
                    }else{
                        if(_this.options[i].indexOf(j) < 0){
                            $(el).css('display','none');
                        }else{
                            $(el).css('display','block');
                        }
                    } 
                })
            })
        })
    }
    window.Linkage = Linkage;
})(jQuery);

(function($){ // 模拟下拉框
    var toString = Object.prototype.toString;
   
    function divSelect(el, options, cb){
        this.options = toString.call(options) == '[object Array]' ? options : []
        this.el = el;
        this.cb = cb;
        this.init();
    }

    divSelect.prototype.init = function(){
        var i = 0
        $(this.el).html('')
        while(i<this.options.length){
            $(this.el).append("<div>"+options[i]+"</div>")
        }

        $(document).on('click', this.el.find('>div'), function(){
            this.cb($(this.index(), $(this).html());  // 是否要bind(this)，用的时候再确定
        })
    }
})(jQuery);
