<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 开卡业绩报表
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item( class="search-time" label="数据时间段")
                            //- el-col(:span="11")
                                el-date-picker(type="year" placeholder="选择年份" v-model="searchMsg.year" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="month" placeholder="选择年月" v-model="searchMsg.time" format="yyyy-MM"
                                    style="width: 100%;" @change="timeChange")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    //- a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="info" ref="export" @click="downFile('开卡业绩报表')") 导出报表

                mtable(:keys="keys" :tableData="tableData" :tabOp="tabOp" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange")

</template>

<script>
function time(t){
    var nt = new Date(t)
    return t ? (nt.getFullYear() + '-' + ((nt.getMonth())+1) + '-' + (nt.getDate())) : '';
}

export default {
    name: 'role',
    mixins: [mixTable],
    data(){
        return {
            keys: [
                {key: 'vendorName', str: '供应商'},
                {key: 'area', str: '片区名称'},
                {key: 'storeName', str: '门店名称'},
                {key: 'clerkName', str: '店员姓名'},
                {key: 'pyear', str: 'pos年份'},
                {key: 'pmonth', str: 'pos月份'},
                {key: 'performance', str: '检测数'},
            ],
            searchKeys: ['time']
        }
    },
    methods: {
        selfInitKeys(){    // 初始化当前数据时间段为当前年月
            var nt = new Date(), y = nt.getFullYear(), m = nt.getMonth() + 1;
            this.searchMsg.year = y;
            this.searchMsg.month = m;
        },
        timeChange(){
            var t = this.searchMsg.time
            console.log(t)
            var nt = new Date(t)
            this.searchMsg.year = nt.getFullYear();
            this.searchMsg.month = nt.getMonth() - 0 + 1;
        },
        async tableList(){
            var opt = {
                _api: 'pd.report.listReportReword',
                limit: 1000,
                offset: (this.currentPage-1)*10,
            }
            if(!this.searchMsg.year) this.selfInitKeys();
            opt.year = this.searchMsg.year
            opt.month = this.searchMsg.month
            // var reqData = $.extend(opt, this.searchMsg);
            // reqData.time = null;

            this.tableData = [];
            let loadingInstance = this.$loading({ fullscreen: false, target: document.querySelector('table') });
            var data = (await tryAwait('get', '', opt, true)).model || [];
            this.totalPage = data.length;
            loadingInstance.close();
            this.allData = this.splitData(data);
            this.tableData = this.allData[this.currentPage-1 || 0];
            // console.log(this.tableData)
        },
        async downForm(url) {
            var options = this.options;
            options.startTime = time(options.startTime)
            options.endTime = time(options.endTime)
            options.posStartTime = time(options.posStartTime)
            options.posEndTime = time(options.posEndTime)
            var getFile = await tryAwait('get', url, options);
            if (getFile.success) {
                console.log(getFile);
            }
        },
    }
}
</script>

<style lang="sass" scoped>

</style>
