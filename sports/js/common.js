(function(Vue, $){

	Vue.prototype._ajaxData = function(url, type, options){
		$.ajax({
			url: url,
			dataType: 'jsonp',
			data: options
		}).done(function(res){
			return res;
		}).fail(function(e){
			console.error(e);
			return e
		})
	}

})(Vue, $)

$(function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 64 + 'px';
})