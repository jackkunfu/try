import $ from 'jquery'

class ElmentUiTableManage {
    constructor(tableData, api, editCtn, vm) {
        this.tableData = tableData;
        this.api = api; // 各个增删改查接口对象
        this.curEditing = null; // 临时标记id和当前编辑的行的index的对象
        this.curData = null; // 当前点击编辑需要更改的数据
        this.editCtn = editCtn;
        this.vm = vm;
    }

    async del(i, row, id) { // 删除操作
        var d = await this.api.del();
        d.success && this.tableData.splice(i, 1)
    }

    edit(i, row, id) { // 点击编辑处理一些当前的历史数据
        this.curEditing = { index: i, id: id }
        this.curData = $.extend(true, {}, row)
            // this.editCtn()
            // console.log(document.getElementsByClassName(this.editCtn))
    }

    async editOk() { // 提交编辑的数据
        var d = await this.api.edit();
        d.success && this.tableData.splice(this.curEditing.index, 1, this.curData);
        d.success && this.cb();
    }

    editCancel() {
        $(this.editCtn).hide();
        this.curEditing = null;
        this.curData = null;
    }

    init() {
        var _this = this;
        return {
            data() {
                return {
                    // labelPosition: 'left',
                    // curEditing: _this.curEditing,
                    curData: _this.curData,
                    tableData: _this.tableData,
                    totalPage: null,
                    currentPage: 1
                }
            },
            methods: {
                del: this.del,
                edit: this.edit.bind(this.vm),
                editOk: this.editOk,
                editCancel: this.editCancel
            }
        }
    }
}

class ManageTable {
    constructor() {
        this.dom = ''
    }

    init() {
        var _this = this;
        // 最终mixins里添加的对象
        var tableManage = { //
            data: {
                tableDom: '',
                inputDom: '',
                tablekKeys: { // 列表每行数据字段
                    isShow: false
                },
                tableData: [],
                manageKeys: {
                    curItem: null,
                    isInput: false
                },
                operates: ['edit', 'del']
            },
            mounted() {
                this.$nextTick(async() => {

                    this.operates.forEach(function(element) {
                        // this.$options.methods[element] = _this[element];
                        this[element] = _this[element]
                    }, this);

                    // 获取列表数据
                    var d = await this.list();
                    this.tableData = d.model.list;

                    // 渲染列表结构
                    this.tableDom = _this.render(this.data.keys, d.model.list, this.operates)
                })
            },
            methods: {

            }
        }
        return tableManage
    }


    /*
     * 渲染列表table结构方法
     * obj 表头文字以及文字对应的字段key
     * dataList 列表table数据数组
     * ops 每行的操作
     */
    render(obj, dataList, ops) {
        var head = '<thead>';
        // for (var key in obj) {
        //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //         head += `<th>${obj[key]}</th>`;
        //     }
        // }
        // Object.keys 只列举本身的，不处理原型链上的
        Object.keys(obj).forEach((v) => {
            head += `<th>${obj[v]}</th>`;
        })
        head += '<th>操作</th>';
        head += '</thead>';

        var body = `<tbody>`;
        if (dataList.length > 0) {
            for (var i = 0; i < dataList; i++) {
                body += '<tr>';
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        body += `<td>${dataList[i][key]}</td>`;
                    }
                }
                body += '</tr>';
            }
        }
        body += '</tbody>'

        return `<el-col>${head}${body}</el-col>`
    }

    add() {}
    del() {}
    list() {}
    update() {}
}


export default {
    objIndexOfArr(obj, arr, key, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == value) {
                return i
            }
        }
        return -1
    },
    ElmentUiTableManage,
    ManageTable
}