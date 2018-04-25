import $ from 'jquery'
import config from './config'

export default function(Vue){
    // ajax
    Vue.prototype.ajax = function(url, data, type, isFullPath){
        var data = data || {};
        var type = type || 'post';
        return new Promise(function(rs, rj){
            $.ajax({
                type: type,
                url: isFullPath ? url : config.api + url,
                headers: {
                    'appCode': 'TLW',
                    'verifyCode': '06b97038-e6e0-4bd0-a875-fd0fb25560e8',
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
                // 如果是post请求，需要JSON.stringify处理下参数，因为设置'Content-Type': 'application/json'
                data: type != 'get' ? JSON.stringify(data) : data, 
                // crossDomian: true,
                // xhrFields: {
                //     withCredentials: true
                // }
            }).done(function(data){
                rs(data)
            }).fail(function(e){
                rj(e);
            })
        })
    }

    /* 
     tableMange 公共方法处理
     */
    // 列表请求前的参数初始化
    Vue.prototype.tableManageInit = async function(){
        // 处理 this.searchInfo 各个值双向绑定
        if(this.searchKeys && this.searchKeys.length > 0){
            this.searchKeys.forEach( v => {
                this.$set(this.searchInfo, v, '')
            })
        }
        // 处理 this.editInfo 各个值双向绑定
        if(this.editKeys && this.editKeys.length > 0){
            this.editKeys.forEach( v => {
                this.$set(this.editInfo, v, '')
            })
        }
        // 如果有特殊初始化操作在组件增加 tableInit 方法处理
        if(this.tableInit && typeof this.tableInit == 'function') this.tableInit();
    }
    // 列表请求
    Vue.prototype.tableList = async function(){
        var copySearchInfo = Object.assign({}, this.searchInfo);
        var needChangeSearchInfo = this.changeSearchValue && typeof this.changeSearchValue == 'function';
        var options = needChangeSearchInfo ? this.changeSearchValue(copySearchInfo) : copySearchInfo;
        options.pageNum = this.curPage;
        options.pageSize = 10
        var res = await this.ajax(this.api.list.url, options, this.api.list.type || 'get');
        if(res && res.code == 0){
            var result = res.data
            this.tableData = result.list
            this.total = result.total;
            this.curPage = result.pageNum;

            this.curChooseRow = null;   // 当前选中列置空
        }
    }
    // 搜索
    Vue.prototype.tableSearch = function(v){
        this.curPage = 1;
        this.tableList.call(this);
    }
    // 搜索重置
    Vue.prototype.tableSearchReset = function(v){
        this.tableManageInit.call(this);
        this.curPage = 1;
        this.tableList.call(this);
    }
    // 页码改变
    Vue.prototype.pageChange = function(v){
        this.curPage = v;
        this.tableList.call(this);
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
            query: data
        })
    }
    // 点击新增
    Vue.prototype.tableAdd = function(){
        this.showEditCtn = true;
        if(this.selfAdd && typeof this.selfAdd == 'function') this.selfAdd();
    }
    // 点击修改
    Vue.prototype.tableEdit = function(){
        if(this.curChooseRow === null) return this.messageTip('请选择要编辑的项~');
        if(this.selfEdit && typeof this.selfEdit == 'function') this.selfEdit();
        this.editInfo = Object.assign({}, this.curChooseRow);
        this.showEditCtn = true;
    }
    // 点击删除
    Vue.prototype.tableDel = function(){
        if(this.curChooseRow === null) return this.messageTip('请选择要编辑的项~');
        this.$confirm('此操作将删除用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            var op = this.api.del;
            var neesChangeOptions = this.handleDelRow && typeof this.handleDelRow == 'function'
            var oriData = Object.assign(this.curChooseRow);
            var options = neesChangeOptions ? this.handleDelRow(oriData) : { guid: oriData.guid }
            var res = await this.ajax(op.url, options, op.type || 'delete')
            if(res.code == 0){
                this.messageTip(res.message || '操作成功', 1);
                this.tableList.call(this);
            }else this.messageTip(res.message || '操作失败')
        }).catch(() => {});
    }
    
    // 提交新增或编辑
    Vue.prototype.tableAddOrUpdate = async function(){
        // 各个组件内部处理 testInput 输入判断方法
        if(!this.testInput()) return
        // 处理url
        var op;
        if(this.curOperateType == 1) op = this.api.add
        else if(this.curOperateType == 2) op = this.api.edit
        // 处理参数
        var copyEditInfo = Object.assign({}, this.editInfo);
        var needChangeEditInfo = this.changeEditValue && typeof this.changeEditValue == 'function';
        var options = needChangeEditInfo ? this.changeEditValue(copyEditInfo) : copyEditInfo;
        // 请求
        var res = await this.ajax(op.url, options, op.type || 'post');
        console.log(res);
        if(res.code == 0){
            this.messageTip(res.message, 1);

            // 重置一些数据状态
            this.showEditCtn = false;
            this.curOperateType == null
            
            this.tableList.call(this);
        }else{
            this.messageTip(res.message);
        }
    }

    // 获取地区树
    Vue.prototype.getAllDist = async function(){
        var res = await this.ajax('/dist/queryDistAuthedTree', { operatorUserId: localStorage.zlOpUid || 43, level: 4 }, 'get');
        if(res.code == 0 && res.data && res.data.length > 0) return res.data;
        else return [];
    }


    // // 点击地区树节点获取数据(暂无用)
    // Vue.prototype.treeNodeClickProto = function(data){
    //     this.distInfo = data;
    // }
    // // 点击地区树节点获取数据
    // Vue.prototype.setChooseDist = function(key){
    //     Object.assign(this[key], this.distInfo || null);
    // }
    // // 地区树点击取消
    // Vue.prototype.cancelChooseDist = function(key){
    //     Object.assign(this[key], this.distInfo || null);
    // }
    
}