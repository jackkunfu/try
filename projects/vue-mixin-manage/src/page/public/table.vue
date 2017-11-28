<template lang="pug">
    el-col(style="margin-bottom: 30px;")
        el-table(:data="tableData" stripe style="width:100%" ref="tbody")
            template(v-for="(item, i) in keys")
                el-table-column(:prop="item.key" :label="item.str" v-if="item.key == 'imgUrl'")
                    template(scope="scope")
                        img(:src="scope.row.imgUrl" alt="" style="max-width:40px;max-height:40px;")

                //- 创建时间
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.key == 'createdTime'")
                    template(scope="scope")
                        span {{scope.row.createdTime | time}}

                //- 更新时间
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.key == 'updatedTime'")
                    template(scope="scope")
                        span {{scope.row.updatedTime | time}}

                //- 结束时间
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.key == 'endTime'")
                    template(scope="scope")
                        span {{scope.row.endTime | time}}

                //- 检测时间
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.key == 'takeTime'")
                    template(scope="scope")
                        span {{scope.row.takeTime | time}}

                //- 开卡时间
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.key == 'kaikaTime'")
                    template(scope="scope")
                        span {{scope.row.kaikaTime | time}}

                //- 领取时间
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.key == 'getTime'")
                    template(scope="scope")
                        span {{scope.row.getTime | time}}

                el-table-column(:prop="item.key" :label="item.str" v-else="")

            //- 操作
            el-table-column(label="操作" v-if="ops && ops.length>0" ref="operate")
                template(scope="scope")
                    template(v-for="(op, j) in ops")
                        //- 编辑
                        template(v-if="tabOp.indexOf('edit')<0")
                            el-button(type="info" @click="edit(scope)" size="small" v-if="op.f=='edit' && !condition(scope.row)" ref="edit") {{op.str}}
                            //- 编辑(冻结时的不可点击的冻结)
                            el-button(type="info" @click="edit(scope)" size="small" v-if="op.f=='edit' && condition(scope.row)" ref="edit" disabled) {{op.str}}
                        //- 删除
                        template(v-if="tabOp.indexOf('del')<0")
                            el-button(type="danger" @click="del(scope)" size="small" v-if="op.f=='del'" ref="del" id="del") {{op.str}}
                        //- 解绑
                        template(v-if="tabOp.indexOf('unbund')<0")
                            el-button(type="warning" @click="unbund(scope)" size="small" v-if="op.f=='unbund'" ref="unbund") {{op.str}}
                        //- 冻结
                        template(v-if="tabOp.indexOf('freeze')<0")
                            el-button(type="warning" @click="freeze(scope, op.idKey)" size="small" v-if="op.f=='freeze' && !condition(scope.row)" ref="freeze") {{op.str}}
                            //- el-button(type="warning" @click="freeze(scope, op.idKey)" size="small" v-if="op.f=='freeze'") {{op.str}}
                            //- 已冻结  这里如果不加op.f=='freeze' 会出现配几个操作会出现几个已冻结的灰色按钮
                            el-button(@click="" size="small" v-if="condition(scope.row) && op.f=='freeze'" disabled) 已冻结

                        template(v-if="tabOp.indexOf('shelf')<0")
                            //- 上架
                            el-button(type="warning" @click="onShelf(scope)" size="small" v-if="op.f=='onShelf' && scope.row.statusKey==0" ref="shelf") {{op.str}}
                            //- 下架
                            el-button(type="danger" @click="offShelf(scope)" size="small" v-if="op.f=='offShelf' && scope.row.statusKey==1" ref="shelf") {{op.str}}

                        //- 预热
                        //- template(v-if="tabOp.indexOf('shelf')<0")
                        el-button(type="warning" class="pre-btn" @click="preheat(scope)" size="small" v-if="op.f=='preheat'" ref="preheat") {{op.str}}
                        //- 页面独特的按钮事件
                        template(v-if="tabOp.indexOf(op.ref)<0")
                            el-button(@click="self(scope, op.fun)" size="small" v-if="op.f=='self'" style="background-color:#50bfff;color:#fff;"
                            :ref="op.ref ? op.ref : ''") {{op.str}}

        el-pagination(layout="total, prev, pager, next, jumper" :total="totalPage" :page-size="20" :current-page="currentPage"
            @current-change="handleCurrentChange" ref="page")

</template>

<script>
var addZero = function(v) {
    return (v+'').length == 1 ? '0'+v : v;
}
export default {
    name: 'com-table',
    filters: {
        time(t){
            return t ? (new Date(t).getFullYear() + '-' + ((new Date(t).getMonth())+1) + '-' + addZero(new Date(t).getDate())) : '';
        },
        timeAll(t){
            return new Date(t).getFullYear() + '-' + (new Date(t).getMonth()+1) + '-' + addZero(new Date(t).getDate()) + ' ' +
                addZero(new Date(t).getHours()) + ':' + addZero(new Date(t).getMinutes()) + ':' + addZero(new Date(t).getSeconds());
        },
        trimAll(d) {
            return d.replace(/\s+/g, '');
        },
        trim(d) {
            return d.trim();
        }
    },
    props: ['keys', 'ops', 'selfApi', 'tableData', 'totalPage', 'currentPage', 'tabOp'],
    methods: {
        freeze(scope, idKey){   // 冻结
            this.$emit('freeze', scope, idKey);
        },
        del(scope){   // 删除
            var str = '';
            if(this.$route.path == '/sa-role' && scope.row.associatedAccount){
                str = '此角色有关联账户，请先解绑账户再删除此角色';
            }
            if(this.$route.path == '/sa-region' && scope.row.associatedAccount){
                str = '此区域有关联账户，请先解绑账户再删除此角色';
            }
            this.$emit('del', scope, str);
        },
        edit(scope){    // 编辑
            this.$emit('edit', scope);
        },
        onShelf(scope){ // 上架
            this.$emit('onShelf', scope);
        },
        offShelf(scope){ // 下架
            this.$emit('offShelf', scope);
        },
        self(scope, fun){ // 页面独特的按钮事件
            this.$emit(fun, scope)
        },
        handleCurrentChange(v){ // 页码更改
            this.$emit('pageChange', v)
        },
        unbund(scope){  // 解绑
            this.$emit('unbund', scope)
        },
        condition(item){
            if(item.accountStatus == -1 || item.status == 2){
                return true;
            }
            return false;
        }
    },
    watch: {
        tabOp(v){
        consoel.log('tabsfjkdk')
        consoel.log(v)
        //- console.log(this.$refs.del)
            //- v.forEach((el)=>{
            //-     this.$refs[el].$el.style.display = 'none';
            //- })
        }
    }

}
</script>

<style lang="sass" scoped>
.pre-btn
    color: #fff;
    background-color: #ff894a;
    border-color: #ff894a;
    &:hover
        options: 0.3;
.el-button
    margin-right: 9px;
</style>
