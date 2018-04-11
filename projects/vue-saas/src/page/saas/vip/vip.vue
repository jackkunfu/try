<template lang="pug">
    div(style="height:100%;")
        //- div.nav2-ctn
        //-     nav-center
        .table-main.no-nav

            div.table-ctn(v-if="!isInput")
                .page-title 会员配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="会员姓名")
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.name")
                        el-form-item(label="会员手机" )
                            el-input(placeholder="输入会员手机号" v-model="searchMsg.mobile_ex")
                        el-form-item(label="会员卡号")
                            el-input(placeholder="输入会员卡号" v-model="searchMsg.card")
                        br
                        //- el-form-item(label="会员固话")
                            el-input(placeholder="带区号输入11或12位数字" v-model="searchMsg.phone")
                        el-form-item(label="开卡店员" )
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.employeeName")
                        el-form-item(label="店员手机")
                            el-input(placeholder="输入员开卡店员手机号码" v-model="searchMsg.employeeMobile ")
                        br
                        //- el-form-item( class="search-time" label="开卡时间")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")
                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 分配会员

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" :tabOp="tabOp"
                    @pageChange="pageChange" @editVip="editVip" @del='del')


            div.edit-ctn(v-show="isInput")
                .page-title {{vipEdit}}会员
                .form-ctn
                    div(v-if="vipEdit=='编辑'")
                        el-form(:model="editItem" label-width="80px")
                            el-form-item(label="会员姓名")
                                el-input(type="text" v-model="editItem.realName" placeholder="20字以内")
                            el-form-item(label="会员卡号")
                                el-input(type="number" v-model="editItem.memberShipCard")

                    div(v-if="vipEdit=='分配'")
                        el-form(label-width="80px")
                            el-form-item(label="预设手机")
                                el-input(class="search-mobile" type="number" placeholder="输入预设手机号进行查询" v-model="searchMobile")
                                el-button.right(type="primary" @click="searchMobile1" style="width: 100px;position: absolute;left:260px") 搜索
                            div(v-if="!isNew")
                                el-form-item(label="用户姓名")
                                    el-input(type="text" v-model="editItem.realname" placeholder="20字以内" disabled)
                                el-form-item(label="用户手机")
                                    el-input(type="number" v-model="editItem.mobile" disabled)
                            div(v-if="isNew")
                                el-form-item(label="雇员姓名" )
                                    el-input(type="text" placeholder="最多8个汉字" v-model="editItem.name")
                                el-form-item(label="身份证号" )
                                    el-input(type="text" placeholder="请输入正确的身份证号" v-model="editItem.idCard")
                                el-form-item(label="手机号码" )
                                    el-input(type="text" placeholder="11位中国大陆手机号码" v-model="editItem.mobile_ex")
                                el-form-item(label="登录密码" )
                                    el-input(type="text" placeholder="默认为手机后六位" v-model="editItem.pwd")
                            el-form-item(label="会员卡号")
                                el-input(placeholder="请输入会员卡号~" type="number" v-model="editItem.memberShipCard")
                        
                    el-button.left(type="primary" @click="editOk") 完成
                    .goBack(@click="goBack") 返回

</template>

<script>
var venId = JSON.parse(localStorage.saasUser || '{}').vendor_id;
export default {
    name: 'vip',
    mixins: [mixTable],
    data(){
        return {
            vipEdit:'',
            isInput: false,
            isNew: true,
            keys: [
                {key: 'realname', str: '会员姓名'},
                {key: 'idCard', str: '身份证号'},
                {key: 'mobile', str: '手机号'},
                // {key:'consumeNumber', str: '消费次数'},
                // {key:'amountMoney', str: '消费总金额'},
                {key:'vendorMemberId', str: '会员卡号'},
                {key:'employeeName', str: '店员姓名'},
                {key:'employeeMobile', str: '店员手机'},
                // {key:'credit', str: '积分'},
                {key:'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'self', str: '编辑', fun: 'editVip', type:'primary'},
                {f: 'self', str: '删除', fun: 'del', type: 'danger'},
            ],
            searchMsg: {
                name: '',
                mobile_ex: '',
                card: '',
                vendorMemberId: '',
                phone: '',
                creater: '',
                clerkmobile: '',
                startTime: '',
                endTime: ''
            },
            // 搜索的各个字段配置
            searchKeys: ['name', 'mobile_ex', 'card', 'phone', 'employeeName', 'employeeMobile'],   //, 'startTime', 'endTime'
            // 编辑的各个字段配置
            editKeys: ['realname',  'mobile', ],
            searchMobile: '',
        }
    },
    mounted(){
        // this.tableList();
    },
    methods: {
        async tableList(){
            var opts1 = $.extend(true, {
                _api: 'pd.member.list',
                vendorId: venId,
                limit: 10,
                offset: (this.currentPage - 1)*10
            }, this.searchMsg)
            var user = await tryAwait('get', '', opts1, true)
            var userData = user.model || [];
            this.tableData = this.changeTableData(userData);
            this.totalPage = 1000;
        },
        changeTableData(data){ return data.map( el => this.changeItem(el) )},
        changeItem(item){
            // var ex = item.userVendor.extraColumn;
            // var extraColumnArr = ex.split(',');   employeeName   employeeMobile
            var v = Object.assign({}, item.userInfo, item.user, item.userVendor);
            var employ = item.userVendor.extraColumn.split(',');
            v.employeeName = employ[0];
            v.employeeMobile = employ[1];
            return v
        },

        async searchList(){
            var opts1 = $.extend(true, {
                _api: 'pd.member.list',
                vendorId: venId,
                limit: 10,
                offset: 0
            }, this.searchMsg)
            var user = await tryAwait('get', '', opts1, true)
            var userData = user.model || [];
            this.tableData = this.changeTableData(userData);
        },

        async del(scope){
            console.log('scope');
            console.log(scope);
            this.$confirm('是否确定注销该会员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                var res = await tryAwait('get','',{
                     _api: 'pd.member.unbundled',
                    vendorId: venId,
                    memberId: scope.row.id,
                },true);
                if (res && res.success) {
                    this.$message({
                        type: 'success',
                        message: '注销成功~'
                    });
                    this.tableData.splice(scope.$index, 1);
                    this.tableList();

                } else {
                    this.$message({
                        type: 'error',
                        message: res.msgInfo
                    });
                }
            })
            
        },
        
        async editVip(scope){
            this.vipEdit = '编辑';
            this.editItem.realName = scope.row.realname;
            this.editItem.id = scope.row.id,
            this.editItem.memberShipCard = scope.row.vendorMemberId;

            this.isInput = true;
        },
        async editOk(){
            if(this.vipEdit == '编辑'){
                var opts1 = {
                    _api: 'pd.member.update.card',
                    vendorId: venId,
                    memberId: this.editItem.id,
                    memberShipCard: this.editItem.memberShipCard,
                    realName: this.editItem.realName
                };
                var vip = await tryAwait('get','',opts1,true);
                if(vip && vip.success){
                    this.$message({
                        type: 'success',
                        message: '会员信息修改成功~'
                    });
                    this.isInput = false,
                    this.tableList();
                }else{
                    this.$message({
                        type: 'error',
                        message: vip.msgInfo
                    });
                }
            }else if(this.vipEdit == '分配'){
                if(this.isNew){
                    var clerk = await tryAwait('get','',{
                        _api: 'pd.user.create',
                        _v: '2.0',
                        name: this.editItem.name,
                        mobile_ex: this.editItem.mobile_ex,
                        pwd: this.editItem.pwd,
                        idCard: this.editItem.idCard
                    },true);
                    if(clerk && clerk.success){
                        console.log(clerk)
                        var res = await tryAwait('get','',{
                            _api: 'pd.member.assign',
                            userId: clerk.model.uid,
                            memberShipCard: this.editItem.memberShipCard
                        },true);
                        if(res && res.success){
                            this.$message({
                                type: 'success',
                                message: '会员分配成功~'
                            });
                            this.isInput = false;
                            this.tableList();
                        }
                    }
                }else{
                    var res = await tryAwait('get','',{
                        _api: 'pd.member.assign',
                        userId: this.editItem.userId,
                        memberShipCard: this.editItem.memberShipCard
                    },true);
                    if(res && res.success){
                        this.$message({
                            type: 'success',
                            message: '会员分配成功~'
                        });
                        this.isInput = false;
                        this.tableList();
                    }
                }
                
            }
        },
        async searchMobile1(){
            if((this.searchMobile+'').trim()=='' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.searchMobile))){
                this.$message({
                    type: 'warning',
                    message: '请输入正确的预设手机号码~'
                })
                return 
            }

            var role = await tryAwait('get','', {
                _api: 'pd.employee.search.single',
                vendorId: venId,
                value: this.searchMobile,
                tag: 'mobile',
            }, true);

            if(role && role.success){
                this.editItem.realname = '';
                this.editItem.mobile = '';
                this.editItem.userId = '';
                if(!role.model || !role.model.user || !role.model.user.uid){
                    this.$confirm('查无此人或者雇员名称不完整，是否去添加或更新雇员?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async() => {
                        this.editItem.mobile_ex = this.searchMobile;
                        this.isNew = true;
                    })
                    return;
                }else{
                    this.isNew = false;
                    this.editItem.realname = role.model.user.realname;
                    this.editItem.mobile = role.model.user.mobile;
                    this.editItem.userId = role.model.user.uid;
                    console.log(this.editItem.mobile);
                    console.log(this.editItem.userId);
                }
            }else{
                this.$message({
                    type: 'error',
                    message: role.msgInfo,
                    offset: 100
                })
            }
            
        },
        async add(){
            this.vipEdit = '分配';
            this.isInput = true;
            this.isNew = true;
            this.searchMobile = '';
            this.editItem.realname = '';
            this.editItem.mobile = '';
            this.editItem.memberShipCard = '';
        },

    }
}
</script>

<style lang="sass" scoped>

</style>
