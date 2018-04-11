export default function(Vue){
    Vue.prototype.splitData = function(data){
        // var n = Math.ceil(data.length/10), arr = []
        var { n, arr } = { n: Math.ceil(data.length/10), arr: [] }
            
        var i = 0;
        while(i<n){
            arr.push(data.splice(0,10));
            i++;
        }
        return arr

        // var arr = new Array(n).fill([])
        // arr.forEach( (v, i)=>{
        //     v.push(data[10*i])
        // })
        // return arr
    }
}