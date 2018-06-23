import $ from 'jquery'
import config from './config'

export default function(Vue){
    Vue.prototype.config = config
    
    Vue.prototype.successCode = 200
    // ajax
    Vue.prototype._ajax = function(url, data, type){
        var data = data || {};
        var type = type || 'post';
        var headers = {}
        if(localStorage.zwManageUserToken) headers.token = localStorage.zwManageUserToken
        return new Promise(function(rs, rj){
            $.ajax({
                type,
                url: '/api'+url,
                headers,
                dataType: 'json',
                data, 
                xhrFields: {
                    withCredentials: true
                }
            }).done(function(data){
                rs(data)
            }).fail(function(e){
                rj(e);
            })
        })
    }

    Vue.prototype.ajax = async function(){
        try{
            var res = await this._ajax(...arguments);
            if(res){
                if(res.code && res.code == 700){
                    this.goUrl('/')
                    localStorage.removeItem('zwManageUserToken')
                    location.reload()
                    return
                }
                return res
            }else return this.messageTip(res.msg || '请求失败，请稍后重试~')
            
        }catch(e){
            console.log(arguments[0])
            console.log(e)
        }
    }

    Vue.prototype.file = function(id, cb, input){
        var headers = {}
        if(localStorage.zwManageUserToken) headers.token = localStorage.zwManageUserToken
        var data = new FormData()
        var input = input || document.getElementById(id)
        data.append('file', input.files[0])
        $.ajax({
            type: 'POST',
            url: '/api/mgr/upload',
            data: data,
            headers,
            contentType: false,
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                if(data && data.code == this.successCode) cb(data)
                else this.messageTip(data.msg || '上传出错，请稍后重试')

                input.value = ''
            },
            error: function(data) {
                input.value = ''
                this.messageTip("error，上传出错"+JSON.stringify(data));
            }
        });
    }

    // 提示
    Vue.prototype.messageTip = function(str, type){
        this.$message({
            type: type ? 'success' : 'error',
            message: str
        })
    }
    // 跳转
    Vue.prototype.goUrl = function(url, data){
        this.$router.push({
            path: url,
            query: data || {}
        })
    }

    /* 
     tableMange 公共方法处理
     */
    // 列表请求前的参数初始化
    Vue.prototype.tableManageInit = async function(){
        this.searchInit()
        this.editInit()
        // 如果有特殊初始化操作在组件增加 tableInit 方法处理
        if(this.tableInit && typeof this.tableInit == 'function') this.tableInit();
    }
    Vue.prototype.searchInit = async function(){
        // 处理 this.searchInfo 各个值双向绑定
        if(this.searchKeys && this.searchKeys.length > 0){
            this.searchKeys.forEach( v => {
                this.$set(this.searchInfo, v, '')
            })
        }
    }
    Vue.prototype.editInit = async function(){
        // 处理 this.editInfo 各个值双向绑定
        if(this.editKeys && this.editKeys.length > 0){
            this.editKeys.forEach( v => {
                this.$set(this.editInfo, v, '')
            })
        }
    }
    // 列表请求
    Vue.prototype.tableList = async function(v){
        var copySearchInfo = Object.assign({}, this.trimObj(this.searchInfo));

        var needChangeSearchInfo = this.changeSearchValue && typeof this.changeSearchValue == 'function';
        var options = needChangeSearchInfo ? this.changeSearchValue(copySearchInfo) : copySearchInfo;

        options.offset = v || this.page.offset || 0;
        options.limit = this.page.limit || 10

        var res = await this.ajax(this.api.list.url, options, this.api.list.type || 'get');
        if(res && res.code == this.successCode){
            var result = res.data

            var needChangeTableData = this.changeTableData && typeof this.changeTableData == 'function';
            this.tableData = needChangeTableData ? this.changeTableData(result.rows) : result.rows

            this.page.total = result.total;
            this.curChooseRow = null;   // 当前选中列置空
        }
    }
    // 搜索
    Vue.prototype.tableSearch = function(v){
        this.page.total = 0;
        this.tableList.call(this);
    }
    // 搜索重置
    Vue.prototype.tableReset = function(v){
        this.searchInit.call(this);
        this.page.total = 0;
        this.tableList.call(this);
        if(this.selfSearchReset && typeof this.selfSearchReset == 'function') this.selfSearchReset()
    }
    // 页码改变
    Vue.prototype.pageChange = function(v){
        this.page.offset = v - 1;
        this.tableList.call(this, v-1);
    }
    
    // 点击新增
    Vue.prototype.tableAdd = function(){
        this.showEditCtn = true;
        if(this.selfAdd && typeof this.selfAdd == 'function') this.selfAdd();
    }
    // 表格外部顶部点击修改
    Vue.prototype.tableEdit = function(){
        if(this.curChooseRow === null) return this.messageTip('请选择要编辑的项~');
        if(this.selfEdit && typeof this.selfEdit == 'function') this.selfEdit();
        this.editKeys.forEach( v => {
            this.editInfo[v] = this.curChooseRow[v] || '';
        })
        // this.editInfo = Object.assign({}, this.curChooseRow);
        this.showEditCtn = true;
    }
    // 表格中每一行的修改点击操作
    Vue.prototype.tableEditScope = function(){
        console.log(arguments[0])
        var row = arguments[0].row || {};
        if(this.selfEdit && typeof this.selfEdit == 'function') this.selfEdit();
        this.editKeys.forEach( v => {
            this.editInfo[v] = row[v] || '';
        })
        this.curChooseRow = row
        // this.editInfo = Object.assign({}, arguments[0].row || {});
        this.showEditCtn = true;
    }
    // 表格中每一行的删除点击操作
    Vue.prototype.tableDelScope = function(){
        console.log(arguments[0])
        this.$confirm('此操作将删除用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            var op = this.api.del;
            var neesChangeOptions = this.handleDelRow && typeof this.handleDelRow == 'function'
            var oriData = Object.assign({}, arguments[0].row || {});
            var options = neesChangeOptions ? this.handleDelRow(oriData) : { id: oriData.id }
            var res = await this.ajax(op.url, options, op.type || 'post')
            if(res.code == this.successCode){
                this.messageTip(res.message || '操作成功', 1);
                this.tableList.call(this);
            }else this.messageTip(res.message || '操作失败')
        }).catch(() => {});
    }
    // 表格外部顶部点击删除
    Vue.prototype.tableDel = function(){
        if(this.curChooseRow === null) return this.messageTip('请选择要编辑的项~');
        this.$confirm('此操作将删除用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            var op = this.api.del;
            var neesChangeOptions = this.handleDelRow && typeof this.handleDelRow == 'function'
            var oriData = Object.assign({}, this.curChooseRow);
            var options = neesChangeOptions ? this.handleDelRow(oriData) : { guid: oriData.guid }
            var res = await this.ajax(op.url, options, op.type || 'delete')
            if(res.code == this.successCode){
                this.messageTip(res.message || '操作成功', 1);
                this.tableList.call(this);
            }else this.messageTip(res.message || '操作失败')
        }).catch( e => { console.log(e) } );
    }

    Vue.prototype.trimObj = function(obj){
        Object.keys(obj).forEach(key =>{
            if(typeof obj[key] == 'string') obj[key] = obj[key].trim()
        })
        return obj
    }
    
    // 提交新增或编辑
    Vue.prototype.tableAddOrUpdate = async function(){
        // 各个组件内部处理 testInput 输入判断方法
        if(this.testInput && !this.testInput()) return
        // 处理url
        var op;
        if(this.curOperateType == 1) op = this.api.add
        else if(this.curOperateType == 2) op = this.api.edit

        // 处理参数 trim之后复制
        var copyEditInfo = Object.assign({}, this.trimObj(this.editInfo));
        // 编辑的话 增加id参数
        if(this.curOperateType == 2) copyEditInfo.id = this.curChooseRow.id

        var needChangeEditInfo = this.changeEditValue && typeof this.changeEditValue == 'function';
        var options = needChangeEditInfo ? this.changeEditValue(copyEditInfo) : copyEditInfo;
        
        // 请求
        var res = await this.ajax(op.url, options, op.type || 'post');
        console.log(res);
        if(res.code == this.successCode){
            this.messageTip(res.message, 1);
            // 重置一些数据状态
            this.showEditCtn = false;
            this.curOperateType == null;
            this.tableList.call(this);
        }else this.messageTip(res.message);
    }

    // 关闭新增编辑框
    Vue.prototype.closeEditCtn = function(){
        this.editInit()
        if(this.curOperateType = 2) this.curChooseRow = null
        this.curOperateType = null
        this.showEditCtn = false
    }

}