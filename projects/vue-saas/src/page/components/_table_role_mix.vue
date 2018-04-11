<template>
    
    <el-col>

        <el-table :data="tableData" stripe style="width:100%">

            <el-table-column prop="id" label="角色ID"></el-table-column>
             <el-table-column prop="name" label="角色名称"></el-table-column>
            <el-table-column prop="createTime" label="添加时间"></el-table-column>

            <el-table-column label="管理">
                <template scope="scope">
                    <el-button type="primary" icon="edit" @click="edit(scope.$index, scope.row, scope.row.id)" size="small" title="配置权限"></el-button>

                    <el-button type="primary" icon="delete" @click="del(scope.$index, scope.row, scope.row.id)" size="small" title="删除"></el-button>
                </template>
            </el-table-column>

            <el-pagination layout="prev, pager, next" :total="totalPage" :page-size="10" :current-page="currentPage"></el-pagination>
        </el-table>

        <div class="edit-ctn" style="display:none;margin-top:20px;">
            <div style="color:#20a0ff">{{curData.name ? '编辑'+curData.nameCopy:''}}</div>

            <el-form label-width="80px" :model="curData" style="width:50%;padding:20px;">

                <el-form-item label="角色名称">
                    <el-input v-model="curData.name"></el-input>
                </el-form-item>

                <el-form-item label="添加时间">
                    <el-input v-model="curData.createTime" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="操作">
                    <div v-for="(item,i) in curData.powers" :key="item.id">
                        <span style="display:inline-block;width:120px;">{{item.name}}</span>
                        <span v-for="(cur,j) in item.operate" :key="cur.id" style="margin-right:10px;">
                            <el-checkbox v-model="cur.status"></el-checkbox>
                            {{cur.name}}
                        </span>  
                    </div>
                </el-form-item>

                <el-button style="margin:0 50px 30px 80px;" @click="editOk">确定</el-button>
                <el-button style="margin:0 50px 30px 80px;" @click="editCancel">取消</el-button>

            </el-form>
        </div>
    </el-col>
    
</template>

<script>

    import $ from 'jquery'

    var roleData = [
        {
            id: 0,
            name: '角色1',
            createTime: '2017-1-1',
            powers: [             //该角色权限列表数组
                {
                    id: 0,
                    name: '权限一',
                    operate: [
                        {id: 11, name: '增加',status: false},
                        {id: 11, name: '删除',status: true},
                        {id: 11, name: '编辑',status: true}
                    ]
                },
                {
                    id: 0,
                    name: '权限22',
                    operate: [
                        {id: 11, name: '增加',status: false},
                        {id: 11, name: '删除',status: true},
                        {id: 11, name: '编辑',status: false}
                    ]
                }
            ]
        },
        {
            id: 1,
            name: '角色2',
            createTime: '2017-11-11',
            powers: [             //该角色权限列表数组
                {
                    id: 10,  
                    name: '权限222',
                    operate: [ 
                        {id: 111, name: '增加',status: true},
                        {id: 111, name: '删除',status: false},
                        {id: 111, name: '编辑',status: true}
                    ]
                } 
            ] 
        }
    ]

    roleData = roleData.concat(roleData)
    roleData = roleData.concat(roleData)

    // 构造函数 mixins 有问题 没实现
    // import selfUtil from '../../basic/function.js'
    var mixTable = new selfUtil.ElmentUiTableManage(roleData, {}, '.eidt-ctn');
    var mixDataMethods = mixTable.init();
    // console.log(mixDataMethods.data());

    // 固定的mixins对象
    // import { mixTable } from '../../basic/mixin.js'

    export default {

        mixins: [mixDataMethods],

        data(){
            return {}
        },

        mounted () {
            this.$store.state.topTip = '角色管理';
            this.tableData = roleData;

            this.$nextTick(async () => {
                this.tableData = await this.tableList();
            })
        },

        methods: {}
    }
</script>