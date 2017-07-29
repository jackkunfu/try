//  多维数组扁平化  --------------  原理递归空数组push,有个暴力的方法，直接去掉数组的[ ]两个中括号
var arr = [1,2,[3,4,5],[[{a:1},7],[8],9],10]
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
deepFor(arr)
console.log(newA)