export default class ManageTable {
    constructor() {
        this.dom = ''
    }

    init() {
        var _this = this;
        // 最终mixins里添加的对象
        var tableManage = { //
            data() {
                return {
                    tableDom: '', // table 列表结构
                    inputDom: '', // 增加编辑时的 输入区域结构
                    tablekKeys: { // 列表每行数据字段
                    },
                    tableData: [],
                    manageKeys: {
                        curItem: null,
                        isInput: false
                    }
                }
            },
            async beforeMount() {
                this.operates.forEach(function(element) {
                    this[element] = _this[element]
                }, this);

                // 获取列表数据
                var d = await this.list();
                console.log(d)
                console.log(d)
                this.tableData = d;

                // 渲染列表结构
                this.tableDom = _this.tableRender(this.keys, d, this.operates, this)
            },
            methods: {
                // list() {
                //     Promise.resolve({ data: [1, 2, 3] })
                // }
                list() {
                    return this.api.userList
                },
                del(id) {},
                edit() {
                    alert(1)
                }
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
    tableRender(obj, dataList, ops, _this) {
        var head = '<thead>';
        var body = '<tbody>';

        if (dataList.length > 0) {
            Object.keys(obj).forEach((v) => {
                head += `<th>${obj[v]}</th>`;
            })
        }
        head += '<th>操作</th>';
        head += '</thead>';

        if (dataList.length > 0) {
            for (var i = 0; i < dataList.length; i++) {
                body += '<tr>';
                Object.keys(obj).forEach((v) => {
                    body += `<td>${dataList[i][v]}</td>`;
                })
                body += '<td>'

                // 编辑删除等操作按钮
                for (var j = 0; j < ops.length; j++) {
                    var str = '';
                    switch (ops[j]) {
                        case 'edit':
                            str = `<button type="button" @click="del(${dataList[i].id})" class="el-button el-button--primary el-button--small" title="修改">
                                <i class="el-icon-edit"></i></button>`;
                            break;
                        case 'del':
                            str = `<button type="button" onclick="${this.del}" v-on:click.native="alert(1)" class="el-button el-button--primary el-button--small" title="删除">
                                <i class="el-icon-delete"></i></button>`;
                            break;

                    }
                    body += str;
                }
                body += '</td>'
                body += '</tr>';
            }
        } else {
            body += '<td colspan="' + Object.keys(obj).length + '">暂无数据</td>'
        }

        body += '</tbody>'

        return `<table>${head}${body}</table>`
    }

    add() {}
    del() { alert(2) }
    list() {}
    update() {}
}