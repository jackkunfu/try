// 菜单导航数据重组

var data = [
    { name: 'aa', id: 1, parentId: 0 },
    { name: 'bb', id: 3, parentId: 1 },
    { name: 'vv', id: 5, parentId: 3 },
    { name: 'ss', id: 2, parentId: 0 },
    { name: 'dd', id: 12, parentId: 2 },
    { name: 'qq', id: 11, parentId: 5 },
    { name: 'cd', id: 10, parentId: 3 },
    { name: 'se', id: 9, parentId: 2 },
    { name: 'gg', id: 8, parentId: 5 },
    { name: 'hh', id: 7, parentId: 1 },
    { name: 'nn', id: 6, parentId: 3 },
    { name: 'we', id: 13, parentId: 2 },
    { name: '34', id: 14, parentId: 5 }
]

function smake(arr){
    var array = [];
    arr.forEach( v => {

        var obj = Object.assign({}, v);
        eaArr(array, obj)

        console.log('array')
        console.log(array)
        
    })
    return array
}

function eaArr(array, obj){
    array.forEach( el => {
        el.child = el.child || [];
        if(el.id == obj.parentId){
            el.child.push(obj);
            obj = false;
            return;
        }else{
            if(el.child.length>0){
                eaArr(el.child, obj);
            }
        }

        console.log('el')
        console.log(el)
    })
    if(obj){
        array.push(obj)
    }
}