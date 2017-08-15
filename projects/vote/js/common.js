(function(Vue, $) {

    Vue.prototype._ajaxData = function(url, type, options) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: options
        }).done(function(res) {
            return res;
        }).fail(function(e) {
            console.error(e);
            return e
        })
    }

    $(function() {

        document.documentElement.style.fontSize = document.documentElement.clientWidth / 64 + 'px';

        function Poster(el, imgs, t1, t2) {
            this.imgs = imgs
            this.el = el
            this.t1 = t1
            this.t2 = t2
            this.init()
        }
        Poster.prototype.init = function() {
            var w = $(this.el).width()

            var html = '<ul>';
            for (var i = 0; i < this.imgs.length; i++) {
                var img = this.imgs[i];
                html += '<li style="float:left;" data-id="' + img.id + '">' +
                    '<img src="' + img.url + '"/>' +
                    '</li>'
            }

            $(this.el).html(html + '</ul>')

            this.setWidth()

            this.setIntv()


        }

        Poster.prototype.setWidth = function() {
            var w = $(this.el).width()
            $(this.el).css('overflow', 'hidden')
            $(this.el).find('>ul').css('width', this.imgs.length * w)
            $(this.el).find('>ul >li').width(w)
        }

        Poster.prototype.setIntv = function() {
            var w = $(this.el).width()
            var ul = $(this.el).find('>ul')

            var time = setInterval(function() {
                ul.animate({ 'margin-left': -w }, this.t2, 'linear', function() {
                    var clone = ul.find('>li').eq(0).clone()
                    ul.find('>li').eq(0).remove()
                    ul.append(clone)
                    ul.css('margin-left', 0)
                })


            }, this.t1)
        }

        window.Poster = Poster;
    })


})(Vue, $)