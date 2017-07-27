function imgView(img) {
    this.img = img || null;
    this.init();
}
imgView.prototype.init = function(){
    this.eventClick();
}
imgView.prototype.eventClick = function(){
    var _this = this;
    if(this.img == null) return;

    $(this.img).click(function(){
        var html = '<div id="imageViewId" style="position:fixed;width:100%;height:100%;top:0;left:0;text-align:center;background:rgba(0,0,0,.5);">'+
                    '<img src="'+ $(this).attr('src') +'" style="max-width:100%;max-height:100%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"/>'
                    '</div>';
        $('body').append(html)
    })
    $(document).on('click', '#imageViewId', function(){
        $('#imageViewId').remove();
    })
}