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
                        img(:src="config.imgPath + scope.row[item.key]" alt="" style="max-width:40px;max-height:40px;")

                //- 时间戳处理
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.type == 'time'")
                    template(slot-scope="scope")
                        span {{scope.row[item.key] | time}}

                //- 字符太长，部分省略处理
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.type == 'els'")
                    template(slot-scope="scope")
                        span {{scope.row[item.key] | els}}

                //- 功能
                el-table-column(:prop="item.key || ''" :label="item.str"  v-else-if="item.type == 'fun'")
                    template(slot-scope="scope")
                        span(@click="$emit(item.fun, scope)" style="cursor:pointer;" :class="item.class ? item.class : ''") {{scope.row[item.key] || item.text}}

                //- 无需处理内容展示
                el-table-column(:prop="item.key" :label="item.str" v-else="")

            //- 操作
            el-table-column(label="操作" v-if="scopeOperates && scopeOperates.length>0" ref="operate" width="150")
                template(slot-scope="scope")
                    el-button(v-for="(op, i) in scopeOperates" :type="op.type || 'success'" size="mini" :key="op.str"
                        @click="$emit(op.fun, scope)" plain) {{op.str}}

        el-pagination(layout="total, prev, pager, next, jumper" :total="total" :page-size="limit" 
            @current-change="(v)=>{$emit('changePage', v)}" ref="page")

</template>

<script>
export default {
    name: 'sTable',
    props: ['keys', 'operates', 'scopeOperates', 'tableData', 'page'],
    data(){
        return{}
    },
    computed: {
        total(){
            return this.page.total - 0
        },
        limit(){
            return this.page.limit - 0
        }
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
    },
    watch: {
        // page(v){
        //     console.log('页码改变')
        //     this.page.total = v.total
        // }
    }

}
</script>

<style lang="sass" scoped>
.operates
    text-align: right;

.el-button
    margin-right: 0;
    margin-bottom: 10px;
</style>