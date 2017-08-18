<template lang="pug">
.api
    ul.conditions
        li(v-for="(item, i) in conditionArr")
            .rows
                .name {{item.name}}:
                ul
                    li(v-for="(con, j) in item.list")
                        span(:class=" item.cur == j ? 'cur':'' " @click="item.cur=j;changeConditions(item.name, i, j)") {{con.name}}

    ul.api-list
        li
            .each-box
                .simple-box
                .hide-box
</template>
   

<script>
import Vue from 'vue'
export default {
    name: 'm-index',
    data () {
        return {
            conditionArr: [],
            chooseCondition: ['', '', ''],
            apiList: []
        }
    },
    computed: {
        
    },
    mounted(){
        this.$nextTick(()=>{

            this.conditionArr = [
                {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]},
                {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]},
                {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]}
            ]

            var _this = this;
            this.conditionArr.forEach((element, i) => {
                this.$set(element, 'cur', 0);     // 新增临时属性cur 并设置监听该属性的变化
            })

        })
    },
    methods: {
        changeConditions(value, i, j){
            this.chooseCondition.splice(i, 1, value);
        }
    },
    watch: {
        chooseCondition(){
            this._fetchData('post', '/user/api', {}, (d)=>{
                
            })
        }
    }
}
</script>

<style lang="sass" scoped>
.api
    width: 1200px;
    margin: 20px auto;
    >ul.conditions
        >li
            .rows
                overflow: hidden;
                margin-bottom: 20px;
                border-bottom: 1px solid #336666;
                &:after
                    clear: both;

                .name
                    width: 120px;
                    float: left;
                    line-height: 30px;
                    margin-top: 3px;

                ul
                    width: 1080px;
                    float: left;
                    li
                        float: left;
                        line-height: 30px;
                        
                        span
                            display: inline-block;
                            margin: 3px;
                            padding: 0 5px;
                            height: 30px;
                            color: #666;
                            cursor: pointer;
                            font-size: 12px;
                            border-radius: 5px;
                            &:hover
                                border-bottom: 1px solid #336666;
                            &.cur
                                background-color: #336666;
                                color: #FFF;


    ul.api-list
        li
            .each-box
                .simple-box
                .hide-box
                    overflow: hidden;
                    height: 0;
                    transition: all 0.3s;
</style>
    