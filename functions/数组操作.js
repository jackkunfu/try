//  多维数组扁平化
var arr = [1,2,[3,4,5],[[{a:1},7],[8],9],10]

// 直接正则去掉数组的[ ]中括号
JSON.parse('['+JSON.stringify(arr).replace(/(\[|\])/g,'')+']')

// 递归1
var newA = []
function deepFor(aa){   
	for(var i=0; i<aa.length; i++){
		// console.log(aa[i])
		if(aa[i] instanceof Array){
			deepFor(aa[i])
			// console.log(aa[i])
		}else{
			newA.push(aa[i])
		}
		
	}
}
// 递归2
function flatten(arr) {
	return arr.reduce(function(prev, next){
		return prev.concat(Array.isArray(next) ? flatten(next) : next)
	}, [])
}


// 数组合并
// 把 array2 中的每一项合并的到 array1
// 1 利用apply传参数组或类数组的原理
Array.prototype.push.apply(array1, array2)
// 2原生方法concat
array1.concat(array2)


// 数组去掉某一个 splice能改变原数组
arr.splice(i,num)    // 从第i个开始去掉num个项

// 只保留数组的前n项
// 1 splice
arr.splice(n, arr.length);
// 2 直接设置数组的长度为n，也能达到删掉n之后的所有的项
arr.length = n;



//将字符串<tr><td>{id}</td><td>{name}</td></tr>”中的{id}替换成10，{name}替换成Tony
"<tr><td>{id}</td><td>{id}</td><td>{id}_{$name}</td></tr>".replace(/{\$id}/g, '10').replace(/{\$name}/g, 'Tony');


// 实现克隆方法  深拷贝
Object.prototype.clone = function() {
    var o = this.constructor === Array ? [] : {};
    for (var e in this) {
        o[e] = (this[e] != null && typeof this[e] === "object") ? this[e].clone() : this[e];
    }
    delete o.clone;   // 生成的新对象会带有clone的直属方法，清除掉~
    return o;
}