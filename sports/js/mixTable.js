var mixtable = {
    data: {
        changeStatus: '新增',
        tableData: [],
        curEditItem: null
    },
    methods: {
        addOrUpdate: function(item) {
            var _this = this;
            var url = item.id ? this.api.edit : this.api.add
            this._ajaxData(url, 'post', this.curEditItem, function(d) {
                alert(d.msg)
                d.success && _this.list();
            })
        },
        edit: function(item) {
            this.curEditItem = item;
            this.changeStatus = '编辑'
        },
        cancel: function() {
            this.curEditItem = null;
            this.changeStatus = '新增'
        },
        del: function(id) {
            var _this = this;
            this._ajaxData(this.api.del, 'post', { id: id }, function(d) {
                alert(d.msg)
                d.success && _this.list();
            })
        },
        list: function() {
            var _this = this;
            this._ajaxData(this.api.list, 'post', { id: id }, function(d) {
                alert(d.msg)
                d.success && _this.list();
            })
        }
    }
}