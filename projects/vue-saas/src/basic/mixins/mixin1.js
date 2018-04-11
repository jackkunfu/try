// 这个主要用于一个页面有第二套增删改查的情况
const mixTable1 = {
    data() {
        return {
            curEditing1: {}, //  当前正在编辑的对象
            editItem1: {}, //  新增\编辑区域对象
            tableData1: [],
            totalPage1: null,
            currentPage1: 1,
            isInput1: false, //  是不是编辑或者新增的状态，用于控制展示列表还是新增编辑区域
            curOperate1: '新增', //  当前的操作状态-新增 编辑  或其他
            searchMsg1: {} // 搜索区域对象
        }
    },
    mounted() {
        // 设置页面搜索的字段动态响应 searchKeys 具体组件页面中配置，数组
        if (this.searchKeys1) {
            this.searchKeys1.map((v) => {
                this.$set(this.searchMsg1, v, '');
            })
        }
        // 设置页面编辑的字段动态响应 editKeys 具体组件页面中配置，数组
        if (this.editKeys1) {
            this.editKeys1.map((v) => {
                this.$set(this.editItem1, v, '');
            })
        }
        this.tableList1(1);
    },
    methods: {
        del1(scope) { // 删除操作
            alert(scope.row.id)
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async()=> {
                var res = await this.request1('del', { id: scope.row.id }, true);
                res.success && this.tableList1(this.currentPage);
                res.success && this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            })
        },

        // 冻结操作,
        // idKey 是为了适配后台列表返回的id字段不统一而加, 在 selfApi 配置freeze里添加，如果是id，不用传
        // 如果列表中代表id的字段是另外个字段，在 selfApi 配置freeze里添加idKey: 对应的字段 例如 uid
        freeze1(scope, idKey) {
            alert('idKey')
            alert(idKey)
            console.log(scope.row)
            this.$confirm('确定冻结?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                var id = idKey ? scope.row[idKey]: scope.row.id
                var res = await this.request1('freeze', { id:id  });
                res.success && this.tableList1(this.currentPage);
                res.success && this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            })
        },

        add1(){   // 点击新增处理一些状态
            this.isInput1 = true;
            if(this.isAdd1 != undefined) this.isAdd1 = false;
            if(this.isLot1 != undefined) this.isLot1 = false;

            this.curEditing1 = {};
            this.curOperate1 = '添加';

            // 清空之前编辑的数据
            this.editCancel1();

            // 不同页面其他处理，有需要selfAdd方法写在具体每个页面里
            if(this.selfAdd1) this.selfAdd1();
        },

        edit1(item) { // 点击编辑处理一些当前的历史数据
            console.log('cur item')
            console.log(item)
            this.curEditing1 = { index: item.$index, id: item.row.id }
            this.editItem1 = $.extend(true, {}, item.row);
            this.curOperate1 = '编辑';

            this.isInput1 = true;
            if(this.isAdd1 != undefined) this.isAdd1 = false;
            if(this.isLot1 != undefined) this.isLot1 = false;

            //  自定义事件， 如果共用edit方法满足不了需求， 在组件内，定义selfEdit方法继续处理
            if(this.selfEdit1) this.selfEdit1(item);
        },

        // 提交编辑的数据
        // 参数cb是控制是否有完成之后的回调函数，例如完成，完成去编辑管理员账号等，默认不填
        async editOk1(cb) {
            alert('验证')
            if(!this.testRule1()) return;
            alert('请求')
            var curSubmit = this.curEditing1.id ? 'edit' : 'add';
            var d = await this.request1(curSubmit, this.editItem, true);
            if(d.success){
                if(Object.prototype.toString.call(cb) !== '[object MouseEvent]'){   // 不能直接判断cb存不存在默认是$event对象
                    cb(d);
                    return
                }
                this.isInput1 = false;
                this.isEdit1 = false;
                var page = curSubmit == 'add' ? 1 : this.currentPage;
                this.tableList1(page);

                this.editCancel1();
            }else{
                this.$message({type: 'error', message: d.msgInfo});
            }
        },

        editCancel1() {   // 清除各个状态值
            Object.keys(this.editItem).map((v) => {
                this.editItem1[v] = '';
            })
            this.curEditing1 = {};
        },

        async tableList1(page) {
            // 请求数据
            this.searchMsg1.page = page;
            var res = await this.request1('list', this.searchMsg, true);

            // 如果数组数据是在别的复杂的字段里，这里处理得到复杂字段结构的数据
            // 这里主要是处理报表的特殊结构的处理
            if(this.selfApi1.list.listkey){
                var result = res;
                var arr = this.selfApi1.list.listkey.split('.');
                var i = 0;
                console.log('result')
                console.log(result)
                while(i<arr.length){
                    console.log(arr[i])
                    result = result[arr[i]];
                    i++;
                }
                console.log('result')
                console.log(result)

                // this.tableData = result.model || [];
                this.tableData1 = result.model ? (this.changeTableData ? this.changeTableData(result.model) : result.model) : [];
                this.totalPage1 = result.count || 0;
                this.currentPage1 = res.page || 0;
            }else{
                this.tableData1 = res.model || [];
                this.totalPage1 = res.count || 0;
                this.currentPage1 = res.currentPage || 0;
            }
        },

        async searchList1() {
            if(this.changeSearchOption1) this.changeSearchOption1();
            if(this.searchMsg1.startTime){
                var t = this.searchMsg1.startTime;
                var d = new Date(t);
                this.searchMsg1.startTime = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
            }
            if(this.searchMsg1.endTime){
                var t = this.searchMsg1.endTime;
                var d = new Date(t);
                this.searchMsg1.endTime = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
            }
            this.currentPage1 = 1;
            this.tableList1(1);
        },

        clearSearch1() {
            // this.searchMsg = {}   // 直接清空会导致数据不能响应
            Object.keys(this.searchMsg1).map((v) => {
                this.searchMsg1[v] = ''
            })
            // 清空后是否要自动请求刷新列表
            // this.tableList1(1);
        },

        pageChange1(v){    // 翻页改变
            this.currentPage1 = v;
            this.tableList1(v);
        },

        async request1(api, options, isExtend) {
            var parmas
            if(api == 'list'){
                parmas = this.selfApi1[api].options || {};
                if (isExtend && options) {
                    $.extend(parmas, options);
                } else {
                    if (options) parmas = options;
                }
            }else{
                parmas = options;
            }
            return await tryAwait(this.selfApi1[api].type, this.selfApi1[api].url, parmas);
        }
    }
}

export default mixTable1
