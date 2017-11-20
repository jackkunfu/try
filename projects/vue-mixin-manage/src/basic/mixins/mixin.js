const mixTable = {
    data() {
        return {
            labelPosition: 'left',
            curEditing: {}, //  当前正在编辑的对象
            editItem: {}, //  新增\编辑区域对象
            tableData: [],
            totalPage: null,
            currentPage: 1,
            isInput: false, //  是不是编辑或者新增的状态，用于控制展示列表还是新增编辑区域
            curOperate: '新增', //  当前的操作状态-新增 编辑  或其他
            searchMsg: {}, // 搜索区域对象

            // allPermissionOpt: [],
            // 当前页面 操作权限，默认全是 0
            // curPermission: new Array(12).fill(0),
            // 1-搜索 2-添加 3-保存  4-修改 5-删除 6-冻结 7-解绑 8-上下架  9-配置店长(门店配置)  10-导入  11-导出
            permissionOpt: ['search', 'add', 'save', 'edit', 'del', 'freeze', 'unbund', 'shelf', 'shop', 'import', 'export'],
            tabOp: []
        }
    },
    async mounted() {
        // 设置页面搜索的字段动态响应 searchKeys 具体组件页面中配置，数组
        if (this.searchKeys) {
            this.searchKeys.forEach((v) => {
                // alert(v)
                this.$set(this.searchMsg, v, '');
            })
        }
        // 设置页面编辑的字段动态响应 editKeys 具体组件页面中配置，数组
        if (this.editKeys) {
            this.editKeys.forEach((v) => {
                this.$set(this.editItem, v, '');
            })
        }
        // 获取当前页面操作权限
        var pmsReq = await tryAwait('post', '/permission/itemList', { parentId: this.$route.query.id })
        if (pmsReq) {
            var data = pmsReq.model || [];
            console.log('当前页面权限');
            console.log(data);
            var typeArr = []
            data.forEach((v) => { // 返回的是有权限的操作，这里保存每一项的type值，对应的是allPermissionOpt上面的各个权限
                typeArr.push(this.permissionOpt[v.type-1])
            })
            var noShowArr = this.permissionOpt.filter((v)=>{
                return (typeArr.indexOf(v) < 0)
            })
            console.log('noShowArr');
            console.log(noShowArr);
            // 顶部的可能按钮 搜索 批量导入 导出报表 添加
            ['search', 'import', 'add', 'export'].forEach((v)=>{
                if(this.$refs[v] && noShowArr.indexOf(v) > -1) this.$refs[v].$el.style.display = 'none';
            })
            // 表格里的权限
            // 暂时data中增加tabOp字段再table.vue组件里去判断各个按钮的展示隐藏
            // 遍历获取当前table里配置的操作来便利，更高效
            if(this.operates && this.operates.length>0){
                var thisTableOp = this.operates.map((p)=>{
                    var d = p.f;
                    if(d == 'self') d = p.ref ? p.ref : ''
                    return d;
                })
                console.log('thisTableOp')
                console.log(thisTableOp)
                thisTableOp.forEach((v)=>{
                    if(noShowArr.indexOf(v) > -1){
                        this.tabOp.push(v);
                        // 暂时this.$refs.table.$refs[v]  找不到各个元素，无法找到将其隐藏
                        // this.$refs.table.$refs[v].$el.style.display = 'none';
                    }
                })
            }

        }

        this.tableList(1);
    },
    methods: {
        del(scope, str) { // 删除操作
            if(str){
                this.$message({
                    type: 'error',
                    message: str
                })
                return
            }
            // alert(scope.row.id)
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                var res = await this.request('del', { id: scope.row.id }, true);
                if (res && res.success) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    if (res.model.length == 0 && this.currentPage > 1) this.currentPage--;
                    this.tableList(this.currentPage);
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msgInfo
                    });
                }
            })
        },

        // 冻结操作,
        // idKey 是为了适配后台列表返回的id字段不统一而加, 在 selfApi 配置freeze里添加，如果是id，不用传
        // 如果列表中代表id的字段是另外个字段，在 selfApi 配置freeze里添加idKey: 对应的字段 例如 uid
        freeze(scope, idKey) {
            // alert('idKey')
            // alert(idKey)
            console.log(scope.row)
            this.$confirm('确定冻结?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                var id = idKey ? scope.row[idKey] : scope.row.id
                var res = await this.request('freeze', { id: id });
                if (res && res.success) {
                    this.tableList(this.currentPage);
                    this.$message({
                        type: 'success',
                        message: '冻结成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res && res.msgInfo ? res.msgInfo : '操作失败，请重试'
                    });
                }
            })
        },

        add(e) { // 点击新增处理一些状态
            // if (this.curPermission[0] == 0) {
            //     this.$message({
            //         type: 'error',
            //         message: '无此权限，请联系管理员处理'
            //     })
            //     e.currentTarget.style.display = 'none'
            //     return
            // }
            this.isInput = true;
            if (this.isAdd != undefined) this.isAdd = false;
            if (this.isLot != undefined) this.isLot = false;

            this.curEditing = {};
            this.curOperate = '添加';

            // 清空之前编辑的数据
            this.editCancel();

            // 不同页面其他处理，有需要selfAdd方法写在具体每个页面里
            if (this.selfAdd) this.selfAdd();
        },

        edit(item) { // 点击编辑处理一些当前的历史数据
            console.log('cur item')
            console.log(item)
            this.curEditing = { index: item.$index, id: item.row.id }
            this.editItem = $.extend(true, {}, item.row);
            this.curOperate = '编辑';

            this.isInput = true;
            if (this.isAdd != undefined) this.isAdd = false;
            if (this.isLot != undefined) this.isLot = false;

            //  自定义事件， 如果共用edit方法满足不了需求， 在组件内，定义selfEdit方法继续处理
            if (this.selfEdit) this.selfEdit(item);
        },

        // 提交编辑的数据
        // 参数cb是控制是否有完成之后的回调函数，例如完成，完成去编辑管理员账号等，默认不填
        async editOk(cb) {
            // alert('验证')
            if (!this.testRule()) return;
            // alert('请求')
            var curSubmit = this.curEditing.id ? 'edit' : 'add';
            if (this.editItem.time && this.editItem.time != '') {
                this.editItem.openTime = this.editItem.time[0];
                this.editItem.closeTime = this.editItem.time[1];
            }
            var d = await this.request(curSubmit, this.editItem, true);
            if (d.success) {
                if (Object.prototype.toString.call(cb) !== '[object MouseEvent]') { // 不能直接判断cb存不存在默认是$event对象
                    cb(d);
                    return
                }
                this.isInput = false;
                this.isEdit = false;
                var page = curSubmit == 'add' ? 1 : this.currentPage;
                this.tableList(page);

                this.editCancel();
            } else {
                this.$message({ type: 'error', message: d.msgInfo });
            }
        },

        editCancel() { // 清除各个状态值
            Object.keys(this.editItem).map((v) => {
                    this.editItem[v] = '';
                })
                //如果特殊结构取消不完全，在selfEditCancel方法里继续处理
            if (this.selfEditCancel) this.selfEditCancel();
            this.curEditing = {};
        },

        async tableList(page) {
            // 请求数据
            this.searchMsg.page = page;
            var res = await this.request('list', this.searchMsg, true);
            // 如果数组数据是在别的复杂的字段里，这里处理得到复杂字段结构的数据
            // 这里主要是处理报表的特殊结构的处理
            if (this.selfApi.list.listkey) {
                var result = res;
                var arr = this.selfApi.list.listkey.split('.');
                var i = 0;
                // console.log('result')
                // console.log(result)
                while (i < arr.length) {
                    // console.log(arr[i])
                    result = result[arr[i]];
                    i++;
                }
                this.tableData = result.model;
                this.totalPage = result.count || 0;
                this.currentPage = res.currentPage || 0;
            } else {
                // this.tableData = result.model || [];  // 直接返回的数据的某些状态不能直接使用时，添加changeTableData方法再次处理数据 return新数据出来
                this.tableData = res.model ? (this.changeTableData ? this.changeTableData(res.model) : res.model) : [];
                this.totalPage = res.count || 0;
                this.currentPage = res.currentPage || 0;
            }
        },

        async searchList() {
            if (this.changeSearchOption) this.changeSearchOption();
            if (this.searchMsg.startTime) {
                var t = this.searchMsg.startTime;
                var d = new Date(t);
                this.searchMsg.startTime = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
            }
            if (this.searchMsg.endTime) {
                var t = this.searchMsg.endTime;
                var d = new Date(t);
                this.searchMsg.endTime = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
            }
            this.currentPage = 1;
            this.tableList(1);
        },

        clearSearch() {
            // this.searchMsg = {}   // 直接清空会导致数据不能响应
            Object.keys(this.searchMsg).map((v) => {
                this.searchMsg[v] = ''
            });

            // 地区插件的另外单独清除
            if (this.$refs.distpicker) {
                this.$refs.distpicker.currentProvince = '省'
                this.$refs.distpicker.currentCity = '市'
            }

            // 清空后是否要自动请求刷新列表
            // this.tableList(1);
        },

        pageChange(v) { // 翻页改变
            this.tableList(v);
        },

        // 返回
        goBack() {
            this.isInput = false;
            if (this.isAdd != undefined) this.isAdd = false;
            if (this.isEdit != undefined) this.isEdit = false;
            if (this.isLot != undefined) this.isLot = false;

            this.editCancel();
        },

        time(t) {
            var datetime = new Date(t);
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1;
            var date = datetime.getDate();
            var hour = datetime.getHours();
            var minutes = datetime.getMinutes();
            var second = datetime.getSeconds();
            if (date < 10) { date = '0' + date };
            if (month < 10) { month = '0' + month };
            return year + '-' + month + '-' + date;
        },

        // 下载报表
        async downForm(url) {
            var getFile = await tryAwait('get', url);
            if (getFile && getFile.success) {
                if (getFile.model) location.href = getFile.model;
                else alert('暂无数据')
            }
        },

        async request(api, options, isExtend) {
            var parmas
            if (api == 'list') {
                var listOptions = this.selfApi[api].options
                    // 这里不用$.extend会影响之前的options数据
                parmas = listOptions ? $.extend(true, {}, listOptions) : {};
                if (isExtend && options) {
                    // console.log(parmas)
                    // console.log(options)
                    $.extend(parmas, options);
                } else {
                    if (options) parmas = options;
                }
            } else {
                parmas = options;
            }
            // console.log(parmas)
            return await tryAwait(this.selfApi[api].type, this.selfApi[api].url, parmas);
        }
    }
}

export default mixTable
