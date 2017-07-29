//------------------时间戳  事件字符串  处理--------------------
//求时间戳差值之间的具体多少天多少秒
var oDate1 = new Date(2015,8,1,0,0,0);
var oDate2 = new Date(2015,10,1,0,0,0);
var nTime = oDate2.getTime() - oDate1.getTime();  // 时间戳之差
var day = Math.floor(nTime/86400);
var hour = Math.floor(nTime%86400/3600);
var minute = Math.floor(nTime%86400%3600/60);

//时间字符串转换成时间戳
var stringTime = "2014-07-10 10:21:12";
var timestamp2 = Date.parse(new Date(stringTime));    // 1404958872000
timestamp2 = timestamp2 / 1000;

// 获取当前时间戳(以s为单位)
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;
//当前时间戳为：1403149534
console.log("当前时间戳为：" + timestamp);

// 获取某个时间格式的时间戳
var stringTime = "2014-07-10 10:21:12";
var timestamp2 = Date.parse(new Date(stringTime));
timestamp2 = timestamp2 / 1000;
//2014-07-10 10:21:12的时间戳为：1404958872 
console.log(stringTime + "的时间戳为：" + timestamp2);

// 将当前时间换成时间格式字符串
var timestamp3 = 1403058804;
var newDate = new Date();
newDate.setTime(timestamp3 * 1000);
// Wed Jun 18 2014 
console.log(newDate.toDateString());
// Wed, 18 Jun 2014 02:33:24 GMT 
console.log(newDate.toGMTString());
// 2014-06-18T02:33:24.000Z
console.log(newDate.toISOString());
// 2014-06-18T02:33:24.000Z 
console.log(newDate.toJSON());
// 2014年6月18日 
console.log(newDate.toLocaleDateString());
// 2014年6月18日 上午10:33:24 
console.log(newDate.toLocaleString());
// 上午10:33:24 
console.log(newDate.toLocaleTimeString());
// Wed Jun 18 2014 10:33:24 GMT+0800 (中国标准时间)
console.log(newDate.toString());
// 10:33:24 GMT+0800 (中国标准时间) 
console.log(newDate.toTimeString());
// Wed, 18 Jun 2014 02:33:24 GMT
console.log(newDate.toUTCString());


//当前时间转换成字符串
Date.prototype.format = function(format) {
    var date = {
           "M+": this.getMonth() + 1,
           "d+": this.getDate(),
           "h+": this.getHours(),
           "m+": this.getMinutes(),
           "s+": this.getSeconds(),
           "q+": Math.floor((this.getMonth() + 3) / 3),
           "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
}
new Date().format('yyyy-MM-dd h:m:s');   // 2016-01-01 00:00:00


//--------------------倒计时封装------------------------
//倒计时
var Countdown = function(stime){
	this.stime = stime;
	this.conti = true;
}
Countdown.prototype = {	
	getValue:function(){
		var newDate = new Date();
		//当前时间时间戳
		var newDateTos = newDate.getTime();
		//传入时间的时间戳
		var sTimeTos = Date.parse(new Date(this.stime));
		
		if(sTimeTos <= newDateTos){
			this.finish = true;
			return
		}
		
		var restTime = (sTimeTos - newDateTos)/1000;   //两个时间戳的差
		var rd = Math.floor(restTime/86400);    
		var rh = Math.floor(restTime%86400/3600);    
		var rm = Math.floor(restTime%86400%3600/60);
		var rs = Math.floor(restTime%86400%3600%60);
		
		if(rd == 0 && rh == 0 && rm == 0 && rs <= 0){
			return {rd:0,rh:0,rm:0,rs:0}
		}else{
			return {rd:rd,rh:rh,rm:rm,rs:rs}
		}
	},
	showRest:function(){
		var res = this.getValue();
		console.log(res);
		
		var htm = '<span class="num">'+ res.rd +'</span>天 ' + 
			'<span class="num">'+ res.rh +'</span>小时 ' + 
			'<span class="num">'+ res.rm +'</span>分钟 ' + 
			'<span class="num">'+ res.rs +'</span>秒 ';
		$('.Countdown').html(htm);
		
		if(res.rd == 0 && res.rh == 0 && res.rm == 0 && res.rs == 0){
			this.conti = false;
		}
	},
	init:function(){
		var _this = this;
		var a = setInterval(function(){
			_this.showRest.call(_this);
			if(!_this.conti){
				clearInterval(a);
				$('.rest-time').hide();
				$('.ready-start').show();	
			}
		}, 1000);
	}
}
var a = new Countdown('2016-10-14 19:00:00');
a.init();


//----------------------------封装ajax请求----------------------
//封装ajax请求
function DataAjax(url,type,options,callback){
	$.ajax({
		url: url,
		type: type,
		data: options,
		dataType: 'json'
	}).done(function(data){
		callback(data);
	}).fail(function(e){
		console.log(e);
	})
}


//-------------------------滑动插件------------------
//点击滑动显示
var MoveList = function(objs){
	this.objs = objs;
}
MoveList.prototype = {
	init:function(){
		$(this.objs).each(function(i, ele){
			var i = 0;
			var num = $(ele).find('li').length;
			var ulLength = num*355 - 95
			
			$(ele).find('ul').css('width', ulLength);
			if(num > 3){
				$(ele).find('.move-right img').attr('src', PATH+'/resources/images/right2.png');
				var moveMax = ulLength - 970;
			}else{
				$(ele).find('.move-right img').attr('src', PATH+'/resources/images/right1.png');
				$(ele).find('.move-right').addClass('not-move');
			}
			
			$(ele).find('.move-left').click(function(){
				if(!$(this).hasClass('not-move')){
					i--
					var curUlLeft = parseInt($(ele).find('ul').css('left'));
					$(ele).find('ul').css('left', -i*355);
					$(ele).find('.move-right').removeClass('not-move');
					$(ele).find('.move-right img').attr('src', PATH+'/resources/images/right2.png');
					if(i==0){
						$(this).addClass('not-move');
						$(ele).find('.move-left img').attr('src', PATH+'/resources/images/left1.png');
					}
				}
			})
			
			$(ele).find('.move-right').click(function(){
				if(!$(this).hasClass('not-move')){
					i++;
					var curUlLeft = parseInt($(ele).find('ul').css('left'));
					$(ele).find('ul').css('left', -i*355);
					$(ele).find('.move-left').removeClass('not-move');
					$(ele).find('.move-left img').attr('src', PATH+'/resources/images/left2.png');
					if(i==num-3){
						$(this).addClass('not-move');
						$(ele).find('.move-right img').attr('src', PATH+'/resources/images/right1.png');
					}
				}
			})					
		})
	}
}
var moveList = new MoveList('.move-area');
moveList.init();


//-------------------------模拟下拉框---------------------

//模拟下拉框插件
var MimicSelect = function(obj,options,callback){
	this.obj = obj;
	this.options = options;
	this.callback = callback;
}
MimicSelect.prototype = {
	init: function(){
		var _this = this;
		$(this.obj).addClass('select mimic-select MimicSelect');
		var optionsHtml = '';
		
		if(this.options instanceof Array){
			for(var i=0;i<_this.options.length;i++){
				optionsHtml += '<li>'+_this.options[i]+'</li>';
			}
			$(this.obj).html('<span>'+_this.options[0]+'</span><ul class="unstyled center">'+optionsHtml+'</ul>');
		}else if(this.options instanceof Object){
			for(var i=0;i<_this.options.key.length;i++){
				optionsHtml += '<li data-key="'+_this.options.key[i]+'">'+_this.options.val[i]+'</li>';
			}
			$(this.obj).html('<span>'+_this.options.val[0]+'</span><ul class="unstyled center">'+optionsHtml+'</ul>');
		}
		
		this.domClick();
	},
	domClick: function(){
		var _this = this;
		$(_this.obj).find('ul li').on('click',function(e){
			$(_this.obj).find('span').html($(this).html().trim());
			_this.callback.call(this);
			$(_this.obj).find('ul').hide();
			e.stopPropagation();
		})
		$(_this.obj).click(function(e){
			if($(_this.obj).find('ul').css('display') == 'none'){
				$('.MimicSelect ul').hide();
				$(_this.obj).find('ul').show();
			}else{
				$(_this.obj).find('ul').hide();
			}
			e.stopPropagation();
		})
		$(document).on('click',function(){
			$('.select ul').hide();
		})
	}
}
//调用下拉框插件
var select1 = new mimicSelect('.select1',['邮件','短信','平台'],function(){console.log($(this).html())})
select1.init();

//--------------------监控键盘输入字数-------------------
//监控键盘输入字数
$('.push-duanxin').keyup(function(){
	var num = $(this).val().trim().length;
	$('.font-num').remove();
	$(this).parent().append('<span class="font-num" style="position:absolute;left:550px;top:50px;">'+ num +'/60</span>');
	
	if($(this).val().trim().length>60){
		$(this).val($(this).val().trim().substr(0,60));
		$('.font-num').remove();
		$(this).parent().append('<span class="font-num" style="position:absolute;left:550px;top:50px;">60/60</span>');
		alert('最多60字');
	}
})


//-------------------------改变函数执行对象----------------------------
//改变  执行自定义的方法的执行对象
function a(x, y){               //直接声明的方法属于浏览器window对象的方法，如果某个对象用到此方法而且需要传递当前对象this过去  可以用call实现
	var _this = this;

	//XXXXXXXXX
}
$('.xxxx').click(function(){
	var x = x, y = y;
	a.call(this, x, y);      //当前xxxx元素执行a方法，传递当前xxxx元素
})

//扩展数组判断是否有相同的元素
Array.prototype.hasSameString = function(){
	var a = false, len=this.length;
	for(var i=0; i<len; i++){
		for(var j=i+1; j<len; j++){
			if(this[i] == this[j]){
				return a = true;
			}
		}
	}
	return a;
}


//---------------------------打印-----------------------
//新打开空白页面   打印当前页面局部内容
var newstr = document.getElementById('print_content').innerHTML;
var printWindow = window.open('');
printWindow.document.write(newstr);
printWindow.print();
return false;

//当前页面打印
var newstr = document.getElementById('print_content').innerHTML;
document.write(newstr);
window.print();
location.reload();

//----------------------年季度倒序----------------------
for(var i = 0; i<curYear-2013; i++){    //循环填充当前季度时间段  从2014年开始
	var curQ = curMonth/3
	var year = curYear - i;
	yArr.push(year);
	for(var j=4;j>0;j--){
		var num = j;
		if(j>curQ && curYear == year){

		}else{
			quarterArr.push(year + '年 - ' + num);
		}
		
	}	
}
quarterArr.shift();


// IE6兼容
//.trim() 不兼容替代 .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' )
var a = $('input').val();
a.trim()  
a.replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' )

// 改变浏览器的后退的页面
$('.tab-con').on('click', '.m-news-list a', function(){   //a链接本身有跳转的地址   点击a链接的时候window.history里pushState()一个自定义回退的地址
	var state = {
		title: 'title',  //自定义的标题
		url: '/about/3'  //自定义回退的地址
		//otherkey: 'othervalue'
	};
	window.history.pushState(state, document.title, state.url);
})

/*
**foreach
*/
// 对于古董浏览器，如IE6-IE8  
//实现foreach方法
if (typeof Array.prototype.forEach != "function") {
  Array.prototype.forEach = function (fn, context) {
    for (var k = 0, length = this.length; k < length; k++) {
      if (typeof fn === "function" && Object.prototype.hasOwnProperty.call(this, k)) {
        fn.call(context, this[k], k, this);
      }
    }
  };
}
//简写方式
[1, 2 ,3, 4].forEach(alert);
[1, 2 ,3, 4].forEach(console.log);

[].forEach(function(value, index, array){}, thisObj);//thisObj为可选参数，改变function方法的this对象时使用
//例子
var database = {
  users: ["张含韵", "江一燕", "李小璐"],
  sendEmail: function (user) {
    if (this.isValidUser(user)) {
      console.log("你好，" + user);
    } else {
      console.log("抱歉，"+ user +"，你不是本家人");	
    }
  },
  isValidUser: function (user) {
    return /^张/.test(user);
  }
};
// 给每个人法邮件
database.users.forEach(  // 遍历database.users
  database.sendEmail,    // 传参发送邮件方法
  database               // 使用database代替database对象中sendEmail方法中的this
);

//IE6-8实现数组的map方法   映射成一个新的数组
if (typeof Array.prototype.map != "function") {
  Array.prototype.map = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {      
         arr.push(fn.call(context, this[k], k, this));
      }
    }
    return arr;
  };
}
//IE6-8实现数组的filter方法   筛选过滤数组保存为新的数组
if (typeof Array.prototype.filter != "function") {
  Array.prototype.filter = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
       for (var k = 0, length = this.length; k < length; k++) {
          fn.call(context, this[k], k, this) && arr.push(this[k]);
       }
    }
    return arr;
  };
}

var eventUtil = {
	addHandle: function(parent, element, type, cb){
		if(parent.addEventListner){
			parent.addEventListner(type, element, function(){
				cb();
			})
		}
	}
}