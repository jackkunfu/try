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
        li(v-for="(item,i) in apiList")
            .each-box
                .simple-box(@click="item.isexpand = !item.isexpand;fetchDetail(item.name, item)")
                    .name {{item.name}}
                    .desc {{item.desc}}
                .hide-box(:class="item.isexpand ? 'expand' : ''")
                    .req-ctn
                        h4 请求参数
                        .req-params(v-for="param in item.detailData.params")
                            label {{param.key}}
                            input(v-model="param.value" value="param.value")

                    .res-ctn
                        h4 响应结果
                        code {{item.detailData.res}}

                    .try(@alcik="tryFetch()") test

</template>
   

<script>
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

            // 模拟顶部条件列表
            this.conditionArr = [
                {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]},
                {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]},
                {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]}
            ]
            var _this = this;
            this.conditionArr.forEach((element, i) => {
                this.$set(element, 'cur', 0);     // 新增临时属性cur 并设置监听该属性的变化
            })

            // 请求顶部条件列表
            // this._fetchData('post', '/user/api/conditions', {}, (d)=>{
            //     this.conditionArr = d.model.list;
            //     this.conditionArr = [
            //         {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'},{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]},
            //         {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]},
            //         {name: '周期', list: [{name: '今天'}, {name: '最近3天'}, {name: '最近7天'}, {name: '最近15天'}, {name: '最近1月'}, {name: '最近3月'}]}
            //     ]

            //     var _this = this;
            //     this.conditionArr.forEach((element, i) => {
            //         this.$set(element, 'cur', 0);     // 新增临时属性cur 并设置监听该属性的变化
            //     })
            // })


            // 模拟api列表数据
            this.apiList = [{
                name: '/user',
                desc: '请求用户列表',
                detailData: {
                    params: [
                        {key: 'phone',value: ''},
                        {key: 'password',value: ''}
                    ],
                    res: ''
                }
            }]

            this.apiList.forEach((el, i)=>{
                this.$set(el, 'isexpand', false)
            })

            // 请求api列表
            // this._fetchData('post', '/user/api', {}, (d)=>{
            //     this.apiList = d.model.list;
            // })


        })
    },
    methods: {
        changeConditions(value, i, j){
            this.chooseCondition.splice(i, 1, value);
        },
        fetchDetail(id, item){ // 请求具体某一个api的详细信息
            console.log(id);
            this._fetchData('post', '/api', {
                id: id
            }, (d)=>{
                this.$set(item, 'detailData', d.model)
            })
        },
        tryFetch(){   // 尝试测试某个api

        }
    },
    watch: {
        chooseCondition(){
            this._fetchData('post', '/user/api', {}, (d)=>{
                this.apiList = d.model.list;
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
                color: #dff;
                text-align: left;
                
                .simple-box
                    background: #33cccc;
                    line-height: 1.5;
                    padding: 15px;
                    .name, .desc
                        display: inline-block;
                        line-height: 30px;
                        margin: 0 10px;
                        
                    .name   
                        color: yellow;
                        font-size: 20px;
                    .desc
                .hide-box
                    overflow: hidden;
                    height: 0;
                    transition: all 0.3s;
                    background: #99cccc;
                    text-align: center;
                    position: relative;
                    
                    &.expand
                        height: auto;

                    h4
                        color: lightyellow;
                        line-height: 3;

                    .req-ctn, .res-ctn
                        padding: 15px;
                        width: 50%;
                        float: left;
                        height: 100%;


                    .req-ctn
                        // border-right: 1px solid #eee;
                        .req-params
                            padding: 0 30px;

                            label,input

                            
                            label
                                width: 100px;
                                display: inline-block;
                                line-height: 40px;
                            input
                                height: 40px;
                                padding: 5px 10px;

                    .res-ctn
                        code
                            width: 80%;
                            background: #FFF;
                            min-height: 300px;
                            display: block;
                            margin: 0 auto;


                    .try
                        position: absolute;
                        left: 50%;
                        top: 20px;
                        width: 50px;
                        margin-left: -25px;
                        background: green;
                        color: #FFF;
                        line-height: 40px;
                        cursor: pointer;

                    
</style>
    