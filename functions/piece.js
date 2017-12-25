/*
    es6之前的写法模拟块级作用域
     try  catch
*/
{
    let a = 2;
    console.log(a)
    // 做些处理
    // 。。。
}
console.log(a)
// 上例如果用var 则外部不会报错，且也能获取到2，达不到块级作用域的效果
// 改成try catch, 可以大道效果
try{
    throw undefiend
}catch(a){
    a = 2
    console.log(a)
    // 做些处理
    // 。。。
}
console.log(a)


/*
    模块模式实现原理
*/
var myModules = (function(){
    var modules = {}
    var define = function(name, needs, fn){
        // var ags = needs.map(function(v, i){ return modules[needs[i]] })    // 声明个ags数组来保存获取最终需要的[module1, module2]
        // modules[name] = fn.apply(fn, ags)

        for(var i=0;i<needs.length;i++){
            needs[i] = modules[needs[i]]   // 直接用needs数组来保存获取最终需要的[module1, module2]， 不用额外重新声明变量
        }
        modules[name] = fn.apply(fn, needs)
    }
    var get = function(name){
        return modules[name]
    }
    return {
        define: define,
        get: get
    }
}())
myModules.define('m1', [], function(){
    return {
        a: function(){
            alert(1)
        }
    }
})
myModules.define('m2', ['m1'], function(m1){
    m1.a();
})
