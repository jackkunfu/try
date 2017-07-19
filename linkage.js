(function($){
    function Linkage(ele, target, type){
        this.ele = $(ele) || $('');
        this.target = $(target) || $('');
        this.options = null;
        this.type = type || null;
    }

    Linkage.prototype.init = function(options){
        if(!options || Object.prototype.toString.call(options) !== '[object Array]') return;
        this.link();
    }

    Linkage.prototype.link = function(){
      if(this.ele.length == 0 || this.target.legth == 0) return;
        var _this = this;
        this.ele.each(function(i, ele){
            $(ele).click(function(){
                _this.target.each(function(j, el){
                    if(_this.type && _this.type == 'attr'){
                        if(_this.options[i].indexOf(j) < 0){
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
        // for(var i=0;i<this.ele.length;i++){
        //     (function(i){
        //         this.ele.eq(i).click(function(){

        //         })
        //     })(i)
        // }
    }
    window.Linkage = Linkage;
})(jQuery);