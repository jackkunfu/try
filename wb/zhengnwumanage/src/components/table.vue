<template lang="pug">
    el-col
        //- 操作
        el-row.operates(v-if="operates && operates.length>0")
            el-button(v-for="(op, i) in operates" size="small" :key="op.str" type="info" 
                @click="$emit(op.fun)") {{op.str}}

        //- 表格
        el-table(:data="tableData" @current-change="(curItem, oldItem)=>{$emit('chooseRow', curItem, oldItem)}" highlight-current-row)
            //- 暂时序号
            //- el-table-column(type="index" width="50")

            template(v-for="(item, i) in keys")
                //- 图片处理
                el-table-column(:prop="item.key" :label="item.str" v-if="item.type == 'img'")
                    template(slot-scope="scope")
                        img(:src="scope.row[item.key]" alt="" style="max-width:40px;max-height:40px;")

                //- 时间戳处理
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.type == 'time'")
                    template(slot-scope="scope")
                        span {{scope.row[item.key] | time}}

                //- 字符太长，部分省略处理
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.type == 'els'")
                    template(slot-scope="scope")
                        span {{scope.row[item.key] | els}}

                //- 无需处理内容展示
                el-table-column(:prop="item.key" :label="item.str" v-else="")

            //- 操作
            el-table-column(label="操作" v-if="scopeOperates && scopeOperates.length>0" ref="operate")
                template(slot-scope="scope")
                    el-button(v-for="(op, i) in scopeOperates" type="success" size="small" :key="op.str"
                        @click="$emit(op.fun, scope)") {{op.str}}

        el-pagination(layout="total, prev, pager, next, jumper" :total="total" :page-size="10" 
            :current-page="currentPage" @current-change="(v)=>{$emit('changePage', v)}" ref="page")

</template>

<script>
export default {
    name: 'sTable',
    props: ['keys', 'operates', 'scopeOperates', 'selfApi', 'tableData', 'total', 'currentPage'],
    data(){
        return{}
    },
    mounted(){},
    methods: {
        operate(fun, scope){    // 操作
            this.$emit.apply(this, arguments)
        },
        handleCurrentChange(v){ // 页码更改
            this.$emit('changePage', v)
        },
        chooseRow(curItem, oldItem){
            this.$emit('chooseRow', curItem, oldItem)
        }
    }

}
</script>

<style lang="sass" scoped>
.operates
    text-align: right;

.el-button
    margin-right: 10px;
    margin-bottom: 10px;
</style>