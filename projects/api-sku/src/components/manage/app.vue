<template lang="pug">
    .main-ctn
        h3 app 管理
        .row
            label app名称
            input(placeholder="app名称" v-model="newName")
            .btn(@click="addNew") 新增

        ul
            li(v-for="(item, i) in showLists" class="remove-box" :style="{ backgroundColor:item.color }") 
                span {{item.name}}
                .remove(@click="del(item.id, i)") x
</template>
   

<script>
export default {
    name: 'm-index',
    data () {
        return {
            colors: ['red', 'yellow', 'blue', 'purple', '#336666', '#339999', '#669999', '#33cccc', '#66cccc', '#99cccc'],
            lists: [],
            showLists: [],
            newName: ''
        }
    },
    mounted() {
        this.$nextTick(function(){
            this.lists = [
                {name:'app1',id: 0},
                {name:'app添加'},
                {name:'domain白名单管理'},
                {name:'其他'}
            ]
        })
    },
    methods: {
        addNew(){
            var name = this.newName.replace(/(^\s+|\s+$)/g, '');
            if(name == '') return ;
            if(this.isExist(name)) return;

            // 请求增加
            this._fetchData('put', '/addApp', {
                name: name
            }, function(res){
                if(!res.success){
                    alert(res.msgInfo)
                    return
                }
                this.lists.push({
                    name: name,
                    id: res.id
                })
            })
        },
        del(id, i){
            // 请求删除         
            this._fetchData('delete', '/deleteApp', {
                id: id
            }, function(res){
                if(!res.success){
                    alert(res.msgInfo)
                    return
                }
                this.lists.splice(i, 1);
            })
        },
        isExist(str){
            var count = this.lists.reduce( function(res, next){
                var b = 0;
                if(next.name == str) b = 1;
                return res + b; 
            },0)
            return count > 0 ? true : false
        }
    },
    watch: {
        lists(){
            var _this = this;
            this.showLists = this.lists.reduce( function(res, next){
                var i = parseInt( Math.random() * _this.colors.length );
                next.color = _this.colors[i];
                res.push(next)
                return res
            },[])
        }
    }
}
</script>

<style lang="sass" scoped>
ul
    margin-top: 30px;
    li.remove-box
        float: left;
        display: inline-block;
        position: relative;
        margin: 10px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;

        color: #FFF;

        &:hover
            .remove
                display: block;
        .remove
            position: absolute;
            cursor: pointer;
            display: none;
            right: -5px;
            top: -5px;
            background: red;
            color: #FFF;
            width: 10px;
            height: 10px;
            text-align: center;
            line-height: 10px;
            border-radius: 5px;
</style>
    