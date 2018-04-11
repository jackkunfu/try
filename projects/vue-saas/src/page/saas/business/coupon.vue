<template lang="pug">
    div(style="height:100%;")
        .table-main
            div.table-ctn(v-if="!isInput")
                .page-title 优惠券配置

                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        //- el-form-item(label="序号")
                            el-select(placeholder="请选择" v-model="searchMsg.sortType")
                                el-option(label="从小到大" value="ASC")
                                el-option(label="从大到小" value="DESC")

                        //- el-form-item(label="展现形式")
                            el-select(placeholder="请选择" v-model="searchMsg.APP")
                                el-option(label="全部" value="0")
                                el-option(label="微信" value="1")
                                el-option(label="C端" value="2")

                        el-form-item(label="优惠券类型")
                            el-select(placeholder="请选择" v-model="searchMsg.useType")
                                el-option(label="优惠券" value="1")
                                el-option(label="优惠码" value="2")
                                el-option(label="码加券" value="3")

                        el-form-item(label="优惠券分类")
                            el-select(placeholder="请选择" v-model="searchMsg.classId")
                                el-option(v-for="(item,i) in couponCategoryList" :label="item.categoryName" :value="item.categoryId" :key="i")

                        el-form-item(label="优惠券规则")
                            el-select(placeholder="请选择" v-model="searchMsg.type")
                                el-option(v-for="(item,i) in ruleList" :label="item.name" :value="item.value" :key="i")

                        el-form-item(label="状态")
                            el-select(placeholder="请选择" v-model="searchMsg.status")
                                el-option(label="上架" value="1")
                                el-option(label="下架" value="0")
                                el-option(label="删除" value="-1")

                        el-form-item(label="是否推荐券")
                            el-radio-group(v-model="searchMsg.isRecommend")
                                el-radio(label="1") 是
                                el-radio(label="2") 否

                        el-form-item(label="是否积分券")
                            el-radio-group(v-model="searchMsg.isIntegral")
                                el-radio(label="1") 是
                                el-radio(label="2") 否

                        el-form-item( class="search-time" label="投放时间")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="开始日期" v-model="searchMsg.startMillis" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="结束日期" v-model="searchMsg.endMillis" style="width: 100%;")

                    el-button(type="primary" icon="search" @click="searchList") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add") 添加优惠券

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" class="coupon-table"
                    :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp"
                    @edit="edit" @preheat="preheat" @shelf="shelf" @viewSee="viewSee")

                .pre-view(v-show="showView")
                    i.el-icon-close(@click="showView=false;curItem={}")
                    .box
                        el-row(v-for="(key, i) in keys" :key="i")
                            el-col(:span="4")
                                .grid-content.bg-purple {{key.str}}
                            el-col(:span="20")
                                .grid-content.bg-purple-light(v-if="key.key == 'startTime' || key.key == 'endTime'") {{curItem[key.key] | timeAll}}
                                .grid-content.bg-purple-light(v-else="") {{curItem[key.key] || '--'}}

            div.edit-ctn(v-show="isInput")
                .page-title {{curOperate}}优惠券
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")
                        .title 步骤一、基础配置
                        el-form-item(label="序号")
                            el-input(type="number" v-model="editItem.serialNum" placeholder="序号")

                        el-form-item(label="icon")
                            //- el-input(type="text" v-model="editItem.url" placeholder="图片")
                            div.upfile
                                input(type="file" ref="up1")
                                button 点击上传
                            img(:src="editItem.couponUrl" style="max-width: 100px;max-height: 100px;")

                        el-form-item(label="商品详情图片")
                            //- el-input(type="text" v-model="editItem.url" placeholder="图片")
                            div.upfile
                                input(type="file" ref="upPro" )
                                button 点击上传
                            img(v-for="item in proImgs" :src="item.img" style="max-width:100px;max-height:100px;margin-right:5px;")

                        el-form-item(label="优惠类型")
                            el-select(placeholder="请选择" v-model="editItem.useType" @change="typeChange")
                                el-option(v-for="(item,i) in ['优惠券', '优惠码', '码加券']" :label="item" :value="i-0+1" :key="i")

                        div(v-if="editItem.useType > 1")
                            el-form-item(label="优惠码标题")
                                el-input(type="text" v-model="editItem.codeTitle" placeholder="优惠码标题")

                            el-form-item(label="优惠码数量")
                                el-input(type="number" v-model="editItem.codeNum" placeholder="优惠码数量")

                            el-form-item(class="search-time" label="有效时间")
                                el-col(:span="11" class="dateTime" )
                                    el-date-picker(type="datetime" placeholder="选择开始日期" v-model="editItem.codeStartTime" style="width: 100%;")
                                el-col(:span="11" class="dateTime")
                                    el-date-picker(type="datetime" placeholder="选择结束日期" v-model="editItem.codeEndTime" style="width: 100%;")

                        //- el-form-item(label="上下架状态")
                            el-select(placeholder="请选择" v-model="editItem.status")
                                el-option(v-for="(item,i) in ['上架', '下架']" :label="item" :value="i" :key="i")

                        el-form-item(label="是否预热")
                            el-radio-group(v-model="editItem.isPreHeart")
                                el-radio(label="true") 是
                                el-radio(label="false") 否

                        el-form-item(label="售价" v-if="editItem.useType!=2")
                            el-input(type="number" v-model="editItem.sellPrice" placeholder="售价")

                        el-form-item(label="展现形式")
                            el-select(placeholder="请选择" v-model="editItem.showType")
                                el-option(v-for="(item,i) in ['二维码', '订单号']" :label="item" :value="i-0+1" :key="i")

                        el-form-item(label="所需积分" v-if="editItem.useType==1")
                            el-input(type="number" v-model="editItem.integral" placeholder="所需积分")

                        el-form-item(label="是否推荐系统")
                            el-radio-group(v-model="editItem.isRecommend")
                                el-radio(label="true") 是
                                el-radio(label="false") 否

                        .title 步骤二、配置对应商品

                        el-form-item(label="商品分类")
                            el-select(placeholder="请选择" v-model="stepKey1.classId" filterable @change="getProductList")
                                el-option(v-for="(item,i) in couponProductCategoryList" :label="item.className" :value="item.id" :key="i")

                        el-form-item(label="商品")
                            el-select(placeholder="请选择" v-model="stepKey1.productId" filterable)
                                el-option(v-for="(item,i) in couponProductList" :label="item.productName" :value="item.id" :key="i")

                        .title 步骤三、配置优惠规则

                        el-form-item(label="规则")
                            el-select(placeholder="请选择" v-model="stepKey2.rule_id")
                                el-option(v-for="(item,i) in ruleList" :label="item.name" :value="item.value" :key="i")

                        el-form-item(label="规则详情" v-if="stepKey2.rule_id")
                            template(v-if="stepKey2.rule_id==1")
                                | 满
                                el-input(type="number" v-model="stepKey2.rule_content.full" placeholder="满多少")
                                | 减
                                el-input(type="number" v-model="stepKey2.rule_content.cut" placeholder="减多少")

                            template(v-if="stepKey2.rule_id==2")
                                | 直减
                                el-input(type="number" v-model="stepKey2.rule_content.cut" placeholder="直减")

                            template(v-if="stepKey2.rule_id==3")
                                | 折扣
                                el-input(type="number" v-model="stepKey2.rule_content.disc" placeholder="折扣")

                            template(v-if="stepKey2.rule_id==4")
                                | 满
                                el-input(type="number" v-model="stepKey2.rule_content.buyNum" placeholder="满")
                                | 送商品
                                el-input(type="text" v-model="stepKey2.rule_content.sendItems" placeholder="送商品")
                                el-input(type="number" v-model="stepKey2.rule_content.sendItemsNum" placeholder="送商品个数")

                            template(v-if="stepKey2.rule_id==5")
                                | 原价
                                el-input(type="number" v-model="stepKey2.rule_content.originPrice" placeholder="原价")
                                | 现价
                                el-input(type="number" v-model="stepKey2.rule_content.nowPrice" placeholder="现价")

                            template(v-if="stepKey2.rule_id==6")
                                | 满
                                el-input(type="number" v-model="stepKey2.rule_content.fullNum" placeholder="满")
                                | 打折
                                el-input(type="number" v-model="stepKey2.rule_content.fullNumOriginPriceDisc" placeholder="折扣")

                            template(v-if="stepKey2.rule_id==7")
                                | 组合
                                el-input(type="text" v-model="stepKey2.rule_content.allItems" placeholder="组合商品")
                                | 原价
                                el-input(type="number" v-model="stepKey2.rule_content.allItemsOriginPrice" placeholder="原价")
                                | 现价
                                el-input(type="number" v-model="stepKey2.rule_content.allItemsNowPrice" placeholder="现价")

                            template(v-if="stepKey2.rule_id==8")
                                | 满购
                                el-input(type="text" v-model="stepKey2.rule_content.buyItems" placeholder="商品")
                                | 几件
                                el-input(type="number" v-model="stepKey2.rule_content.buyItemsNum" placeholder="几件")
                                | 加钱
                                el-input(type="number" v-model="stepKey2.rule_content.buyItemsAddMoney" placeholder="加多少钱")
                                | 换购
                                el-input(type="text" v-model="stepKey2.rule_content.buyItemsExchangeItem" placeholder="换购商品")
                                | 多少件
                                el-input(type="number" v-model="stepKey2.rule_content.buyItemsExchangeItemNum" placeholder="换购商品数量")

                            template(v-if="stepKey2.rule_id==9")
                                | 满
                                el-input(type="number" v-model="stepKey2.rule_content.fullItemNum" placeholder="满")
                                | 第几件
                                el-input(type="number" v-model="stepKey2.rule_content.fullNum" placeholder="第几件")
                                | 打几折
                                el-input(type="number" v-model="stepKey2.rule_content.firstNumOriginPriceDisc" placeholder="打几折")

                            template(v-if="stepKey2.rule_id==10")
                                | 满
                                el-input(type="number" v-model="stepKey2.rule_content.fullPrice" placeholder="满多少")
                                | 送商品
                                el-input(type="text" v-model="stepKey2.rule_content.sendItemsName" placeholder="商品名称")
                                | 个数
                                el-input(type="number" v-model="stepKey2.rule_content.sendItemsNameNum" placeholder="个数")

                        //- el-form-item(label="规则标题")
                            el-input(type="text" v-model="stepKey2.rule_title" placeholder="规则标题")

                        //- el-form-item(label="规则详情")
                            el-input(type="text" v-model="stepKey2.rule_detail" placeholder="规则详情")

                        el-form-item(label="适用条款")
                            el-input(type="textarea" v-model="stepKey2.rule_terms" placeholder="适用条款" class="tk")

                        .title 步骤四、配置分享
                        
                        el-form-item(label="分享标题")
                            el-input(type="text" v-model="stepKey3.title" placeholder="分享标题")

                        el-form-item(label="分享详情")
                            el-input(type="text" v-model="stepKey3.detail" placeholder="分享详情")

                        el-form-item(label="分享图片")
                            div.upfile
                                input(type="file" ref="shareImg" )
                                button 点击上传
                            img(:src="stepKey3.pic" style="max-width: 100px;max-height: 100px;")

                        .title 步骤五、配置投放

                        el-form-item(label="所属分类")
                            el-select(placeholder="请选择" v-model="stepKey4.categories")
                                el-option(v-for="(item,i) in couponCategoryList" :label="item.categoryName" :value="item.id" :key="i")

                        el-form-item(label="投放渠道")
                            //- el-select(placeholder="请选择" v-model="stepKey4.channel")
                                el-option(v-for="(item,i) in channelList" :label="item.channelName" :value="item.id" :key="i")
                            //- el-checkbox-group(v-model="chooseChannel")
                            el-checkbox(v-for="(item,i) in channelList" :key="i" v-model="item.checked") {{item.channelName}}

                        el-form-item(label="投放区域")
                            el-select(placeholder="请选择" v-model="stepKey4.scope")
                                el-option(v-for="(item,i) in ['全部', '片区', '门店']" :label="item" :value="i-0+1" :key="i")

                        el-form-item(label="片区" v-show="stepKey4.scope==2" style="width:800px")
                            //- el-checkbox-group(v-model="chooseTransferArea")
                                el-checkbox(v-for="item in transferDataArea" :label="item.id" :key="item.id") {{item.areaName}}
                            el-checkbox(v-for="(item,i) in transferDataArea" :key="i" v-model="item.checked") {{item.areaName}}

                        el-form-item(label="门店" v-show="stepKey4.scope==3" style="width:800px")
                            //- el-checkbox-group(v-model="chooseTransferStore")
                                el-checkbox(v-for="item in transferDataStore" :label="item.id" :key="item.id") {{item.storeName}}
                            el-checkbox(v-for="(item,i) in transferDataStore" :key="i" v-model="item.checked") {{item.storeName}}

                        //- el-form-item(label="核销次数")
                            el-input(type="number" v-model="stepKey4.purchaseTimes" placeholder="核销次数，小于等于10")

                        el-form-item(label="核销次数")
                            el-input(type="number" v-model="stepKey4.buyTimes" placeholder="核销次数")

                        el-form-item(class="search-time" label="投放时间")
                            el-col(:span="11" class="dateTime")
                                el-date-picker(type="datetime"  placeholder="投放开始日期" v-model="stepKey4.startTime" style="width: 100%;")
                            el-col(:span="11" class="dateTime")
                                el-date-picker(type="datetime"  placeholder="投放结束日期" v-model="stepKey4.endTime" style="width: 100%;")
                            
                        el-button(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回

</template>

<script>
import mixTable1 from '@/basic/mixins/mixin1.js'
import upOss from '@/basic/mixins/upOss.js'

var venId = localStorage.saasUser ? JSON.parse(localStorage.saasUser).vendor_id : '';

export default {
    name: 'couponAndCode',
    mixins: [mixTable, upOss],
    data(){
        return {
            showView: false,    //  预览
            proImgs: [],   // 优惠券商品图片
            transferDataArea: [],
            chooseTransferArea: [],
            transferDataStore: [],
            chooseTransferStore: [],
            chooseChannel: [1,2,3,4,5],     //  已选渠道
            channelList: [],  // 渠道列表
            ruleList: [   // 规则数组
                {name: '满减', value: '1'},
                {name: '直减', value: '2'},
                {name: '折扣', value: '3'},
                {name: '买送', value: '4'},
                {name: '原价-现价', value: '5'},
                {name: '满折', value: '6'},
                {name: '组合原价-现价', value: '7'},
                {name: '满购加钱换', value: '8'},
                {name: '满商品第几件打折', value: '9'},
                {name: '满送', value: '10'}
            ],
            stepKey1: {},
            stepKey2: {
                rule_content: {}
            },
            stepKey3: {},
            stepKey4: {},
            couponCategoryList: [],    // 优惠券分类列表
            couponProductCategoryList: [],   // 商品分类列表
            couponProductList: [],    // 优惠券商品列表
            areaList: [],   // 区域列表
            // fileListGood: [],   // 商品图片数组
            // fileListGoodDetail: [],   // 商品详情图片数组
            // fileListShare: [],   // 分享图片数组
            activeTab: 0,
            searchMsg1: {
                name: '',
                startTime: '',
                endTime: ''
            },
            operates: [
                {f:'edit', str: '编辑'},
                // {f:'onShelf', str: '上架'},
                // {f:'offShelf', str: '下架'},
                {f:'shelf', str: '上下架删除'},
                {f:'preheat', str: '预热'},
                {f:'self', str: '预览', fun: 'viewSee',type:'success'}
            ],
            curItem: {},    // 当前预览对象
            keys: [
                {key: 'serialNum', str: '序号'},
                // {key: 'id', str: '编号'},
                // {key: 'imgUrl', str: '图片'},
                // {key: 'appName', str: '渠道'},
                // {key: 'useTypeStr', str: '优惠券类型'},
                {key: 'title', str: '类型标题'},
                {key: 'detail', str: '类型细则'},
                {key: 'aClass.className', str: '对应分类'},
                {key: 'product.productName', str: '对应商品'},
                {key: 'startTime', str: '开始时间'},
                {key: 'endTime', str: '过期时间'},
                {key: 'ruleStr', str: '详细规则', mayLong: true},
                {key: 'useTypeStr', str: '优惠券分类'},
                {key: 'codeTitle', str: '优惠码标题'},
                {key: 'statusKeys', str: '状态'},
                //- {key: 'startTime', str: '商品分类'},
                //- {key: 'startTime', str: '商品名称'},
                //- {key: 'startTime', str: '优惠券类型'},
                //- {key: 'startTime', str: '订单形式'},
                //- {key: 'statusKey', str: '状态'},
                //- {key: 'endTime', str: '活动有效期'}
            ],
            // 搜索的各个字段配置
            searchKeys: ['useType', 'classId', 'productId', 'isPreheat', 'isFree', 'isIntegral', 'isRecommend', 'status', 'startMillis', 'endMillis', 'type'],
            // 编辑的各个字段配置
            editKeys: [ 'serialNum', 'couponUrl', 'useType', 'codeTitle', 'codeEndTime', 'codeStartTime',
                'codeNum', 'isPreHeart', 'sellPrice', 'showType', 'integral', 'isRecommend'
            ],
            step1: ['classId', 'productId'],
            step2: ['rule_id', 'rule_terms'],
            step3: ['title', 'detail', 'pic'],
            step4: ['categories', 'channel', 'scope', 'buyTimes', 'startTime', 'endTime'],    // purchaseTimes
            editKeys1: ['name', 'vendorCode', 'address', 'logo'],
            productPage: 0,
            tipKeyStr: {    //   做非空判断时的输入字段值对应的提示内容
                serialNum: '序号',
                couponUrl: '优惠券图片',
                useType: '优惠券类型',
                codeTitle: '优惠码标题',
                codeNum: '优惠码数量',
                codeStartTime: '优惠码开始时间',
                codeEndTime: '优惠码结束时间',
                isPreHeart: '是否预热',
                showType: '展现形式',
                // integral: '积分',   //  这三个先不需要必填， 先默认传0
                // sellPrice: '售价',
                // buyTimes: '可购买次数',
                isRecommend: '是否推荐系统',
                classId: '商品分类',
                productId: '商品',
                rule_id: '规则',
                rule_terms: '适用条款',
                title: '分享标题',
                detail: '分享详情',
                pic: '分享图片',
                categories: '优惠券分类',
                scope: '所属区域',
                // purchaseTimes: '核验次数',
                startTime: '投放开始时间',
                endTime: '投放结束时间'
            }
        }
    },
    async mounted(){
        // 获取分类列表
        this.couponCategoryList = (await tryAwait('get', '', {
            _api: 'pd.coupon.category.fetch'
        }, true)).model || [];
        // console.log('couponCategoryList')
        // console.log(this.couponCategoryList)

        // 商品分类
        this.couponProductCategoryList = (await tryAwait('get', '', {
            _api: 'pd.coupon.class.search',
            vendorId: venId,
            limit: 200,
            offset: 0
        }, true)).model || [];
        // console.log('couponProductCategoryList')
        // console.log(this.couponProductCategoryList)

        // 渠道列表
        this.channelList = (await tryAwait('get', '', {
            _api: 'pd.channel.search'
        }, true)).model || [];
        // console.log('channelList')
        // console.log(this.channelList)

        // 片区列表
        var areaList = (await tryAwait('get', '', {
            _api: 'pd.area.search',
            _v: '2.0',
            vendorId: venId,
            type: 2,  // 1:大区，2:片区，-1:虚拟大区，-2:虚拟片区
            status: 1, // 0: 下架   1：上架
            limit: 200,
            offset: 0
        }, true)).model || [];
        // console.log('areaList')
        // console.log(areaList)
        this.transferDataArea = areaList;
        
        var storeList = (await tryAwait('get', '', {
            _api: 'pd.store.list',
            _v: '3.0',
            vendorId: venId,
            limit: 2000,
            offset: 0
        }, true)).model || [];
        // console.log('storeList')
        // console.log(storeList)
        this.transferDataStore = storeList.map( v =>{
            return v.store
        });
        // console.log(this.transferDataStore)

        this.$nextTick(()=>{
            // 上传图片
            this.$refs.up1.addEventListener('change', () =>{
                this.upOss(this.$refs.up1.files[0]).then( res =>{
                    this.$set(this.editItem, 'couponUrl', 'http://files.iputong.com/Saas2/' + res);
                    // this.editItem.couponUrl = 'http://files.iputong.com/Saas2/' + res;
                });
            })
            this.$refs.upPro.addEventListener('change', () =>{
                this.upOss(this.$refs.upPro.files[0]).then( res =>{
                    this.proImgs.push({img: 'http://files.iputong.com/Saas2/' + res});
                });
            })
            this.$refs.shareImg.addEventListener('change', () =>{
                this.upOss(this.$refs.shareImg.files[0]).then( res =>{
                    this.stepKey3.pic = 'http://files.iputong.com/Saas2/' + res;
                });
            })
            
        })

        this.tableList()

    },
    methods: {

        viewSee(scope){
            this.showView = true;
            console.log(scope.row)
            this.curItem = scope.row
        },

        selfInitKeys(){
            this.searchMsg.useType = '1';
        },

        async tableList(){
            var opt = {
                _api: 'pd.coupon.list',
                limit: 10,
                offset: (this.currentPage-1)*10,
                // useType: this.searchMsg && this.searchMsg.useType ? this.searchMsg.useType : 1,
                vendorId: venId
            }
            var reqData = $.extend(opt, this.searchMsg);
            this.searchMsg.useType = reqData.useType = reqData.useType || '1'
            var data = (await tryAwait('get', '', reqData, true)).model || []
            this.tableData = this.changeTableData(data);
            console.log(this.tableData)
        },

        selfEdit(item){    // 点击编辑时触发
            var data = item.row
            this.curEditing.id = data.id;
            try{
                var imgData = JSON.parse(data.url);
                this.editItem.couponUrl = imgData.icon_img.img
                this.proImgs = imgData.pro_img || []
            }catch(e){
                console.log(e);
            }
            
            this.editItem.isPreHeart = data.preheat === 1 ? 'true' : 'false';
            this.editItem.sellPrice = data.price+'' || '';
            this.editItem.isRecommend = data.isRecom+'';

            this.stepKey1.productId = data.productIds || '';
            this.stepKey1.classId = data.classId || '';

            this.stepKey2.rule_id = data.type ? data.type + '' : '';
            try{
                var content = JSON.parse(data.content || '{}');
                this.stepKey2.rule_content = content;
                this.$set(this.stepKey2, 'rule_content', content);
                var keys = Object.keys(content);
                keys.forEach( v =>{
                    this.$set(this.stepKey2.rule_content, v, content[v]);
                })
            }catch(e){
                console.log(e);
            }
            this.stepKey2.rule_title = data.title || '';
            this.stepKey2.rule_detail = data.detail || '';

            this.stepKey2.rule_terms = data.ruleStr || '';
            if(data.ruleStr){
                this.stepKey2.rule_terms = data.ruleStr.replace(/\r|\n/g, '');
            }else{
                this.stepKey2.rule_terms = '';
            }

            this.stepKey3.title = data.shareTitle || '';
            this.stepKey3.detail = data.shareDetail || '';
            this.stepKey3.pic = data.sharePic || '';

            this.stepKey4.categories = data.categoryVendorId || '';

            this.resetPutCheck();   // 重置投放所选  不处理应该也行

            var dataChannel = data.channel ? data.channel.split(',') : [];
            this.channelList.forEach( (v,i) =>{
                if(dataChannel.indexOf(v.id+'') > -1){
                    this.$set(this.channelList[i], 'checked', true)
                }else{
                    this.$set(this.channelList[i], 'checked', false)
                }
            })

            var scope = data.scope || '';
            this.stepKey4.scope = scope;

            if(scope == 2){
                var dataAreaIds = data.areaIds ? data.areaIds.split(',') : [];
                this.transferDataArea.forEach( (v,i) =>{
                    if(dataAreaIds.indexOf(v.id+'') > -1){
                        this.$set(this.transferDataArea[i], 'checked', true)
                    }else{
                        this.$set(this.transferDataArea[i], 'checked', false)
                    }
                })
            }else if(scope == 3){
                var dataStoreIds = data.storeIds ? data.storeIds.split(',') : [];
                this.transferDataStore.forEach( (v,i) =>{
                    if(dataStoreIds.indexOf(v.id+'') > -1){
                        this.$set(this.transferDataStore[i], 'checked', true)
                    }else{
                        this.$set(this.transferDataStore[i], 'checked', false)
                    }
                })
            }

            this.stepKey4.purchaseTimes = data.purchaseTimes || '';
            this.stepKey4.buyTimes = data.buyTimes || '';
            this.stepKey4.startTime = data.startTime || '';
            this.stepKey4.endTime = data.endTime || '';
        },

        async preheat(scope){    // 预热 取消预热
            // console.log(scope)
            var res = (await tryAwait('post', '', {
                _api: 'pd.coupon.bind.preheart',
                id: scope.row.id,
                preHeart: !!scope.row.preheat ? false : true   // true 预热   false 取消预热
            }, true))
            if(res.success) this.tableData.splice(scope.$index, 1, this.changeItem(res.model))
            else {
                this.$message({
                    type: 'error',
                    message: res.msgInfo
                })
            }
        },
        async shelf(scope, status){    // 上下架删除
            // console.log(scope)
            this.$confirm('是否执行此操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                // var sta = !!status ? -1 : scope.row.status==1 ? 0 : 1;
                // 优惠券状态和其他不一样  1是下架  0是上架 这里反过来下
                var sta = !!status ? -1 : scope.row.status==1 ? 1 : 0;

                var res = (await tryAwait('post', '', {
                    _api: 'pd.coupon.bind.shelf',
                    id: scope.row.id,
                    status: sta
                }, true))
                var thisData = JSON.parse(JSON.stringify(scope.row))
                if(res.success){
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.tableList();
                    // if(sta == -1){
                    //     this.tableData.splice(scope.$index, 1);
                    //     return
                    // }
                    // this.tableData.splice(scope.$index, 1, this.changeItem(thisData))
                }
            })
            
        },
        typeChange(){    // 优惠类型改变，重置部分数据
            if(this.editItem.useType == 1){
                ['codeStartTime', 'codeEndTime', 'codeTitle', 'codeNum'].forEach( v =>{
                    if(this.editItem[v]) delete this.editItem[v];
                })
            }else{
                ['codeStartTime', 'codeEndTime', 'codeTitle', 'codeNum'].forEach( v =>{
                    this.$set(this.editItem, v, '')
                })
            }
        },
        async getProductList(){    // 获取商品分类列表
            if(!this.stepKey1.classId) return;
            this.couponProductList = (await tryAwait('get', '', {
                _api: 'pd.coupon.product.search',
                classId: this.stepKey1.classId,
                limit: 10,
                offset: 0
            }, true)).model || [];
        },
        initKeys(){   // 设置输入字段动态响应
            if (this.searchKeys) {
                this.searchKeys.forEach((v) => {
                    this.$set(this.searchMsg, v, '');
                })
            }
            [this.editKeys, this.step1, this.step2, this.step3, this.step4].forEach( (el, i) => {
                var idxStr = i > 0 ? i : '';
                var keyName = i > 0 ? 'stepKey'+i : 'editItem'
                el.forEach( v => {
                    this.$set(this[keyName], v, '');
                })
            })

            if(this.selfInitKeys && typeof this.selfInitKeys == 'function') this.selfInitKeys();
        },
        resetPutCheck(){
            this.channelList.forEach( (v,i)=>{
                this.$set(this.channelList[i], 'checked', false)
            })
            this.transferDataArea.forEach( (v,i)=>{
                this.$set(this.transferDataArea[i], 'checked', false)
            })
            this.transferDataStore.forEach( (v,i)=>{
                this.$set(this.transferDataStore[i], 'checked', false)
            })
        },
        beforeEdit(item){
            if(item.row.status == 1) return true;     // 上架状态不给编辑
            else return false 
        },
        async editOk(){
            // 输入大体判断
            if(!this.testRule()){
                return
            }

            // 商品图片判断      可以不传先注释~
            // if(this.proImgs.length == 0){
            //     this.$message({
            //         type: 'error',
            //         message: '商品图片没上传~'
            //     })
            //     return
            // }

            // 规则相关判断
            var ruleTest = this.handleRuleTitleDetail();   //  判断以及处理 拼装rule_title rule_detail
            if(!ruleTest.ok) return

            // 投放渠道判断
            var clickChannelIds = [], clickAreaIds = [], clickStoreIds = [];
            clickChannelIds = this.channelList.filter( v=> v.checked );
            if(clickChannelIds.length == 0){
                this.$message({
                    type: 'error',
                    message: '投放区域未选~'
                });
                return
            }
            if(this.stepKey4.scope==2){
                clickAreaIds = this.transferDataArea.filter( v=> v.checked );
                if(clickAreaIds.length == 0){
                    this.$message({
                        type: 'error',
                        message: '投放片区未选~'
                    });
                    return
                }
            }else if(this.stepKey4.scope==3){
                clickStoreIds = this.transferDataStore.filter( v=> v.checked );
                if(clickStoreIds.length == 0){
                    this.$message({
                        type: 'error',
                        message: '投放门店未选~'
                    });
                    return
                }
            }

            // 核验次数判断
            if(this.stepKey4.purchaseTimes-0>10){
                this.$message({
                    type: 'error',
                    message: '核验次数不能大于10'
                });
                return
            }
            
            var createOrUpdate = {
                vendorId: venId
            }
            createOrUpdate._api = this.curOperate == '编辑' ? 'pd.coupon.update' : 'pd.coupon.create';
            if(this.curOperate == '编辑') createOrUpdate.id = this.curEditing.id
            var opts1 = $.extend(true, createOrUpdate, this.editItem)

            opts1.url = JSON.stringify({
                icon_img: {
                    img: opts1.couponUrl
                },
                pro_img: this.proImgs
            })

            var fomat = function(t){   // 只取年月日，其他处理成00：00：00
                return t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate()
            }

            opts1.status = 1;    // 编辑时选择上下架状态暂时隐藏，默认下架
            if(this.editItem.useType != 1) opts1.integral = 0;
            opts1.sellPrice = opts1.sellPrice*100;
            if(opts1.codeStartTime) opts1.codeStartTime = new Date(fomat(opts1.codeStartTime).replace(/\-/g, "/")).getTime()
            if(opts1.codeEndTime) opts1.codeEndTime = new Date(fomat(opts1.codeEndTime).replace(/\-/g, "/")).getTime()

            // 售价和积分不必填，默认传0
            if(!opts1.sellPrice) opts1.sellPrice = 0;
            if(!opts1.integral) opts1.integral = 0;

            var d1 = await tryAwait('get', '', opts1, true);    // 步骤一、生成优惠券
            if(d1 && d1.model && d1.model.id){
                var cid = d1.model.id;  // 优惠券id
                // this.$message({
                //     type: 'success',
                //     message: '操作成功，开始配置更新商品、分享、规则投放信息'
                // })
                console.log('创建优惠券成功,开始配置商品、分享、规则');
                var opts1 = $.extend({
                    _api: 'pd.coupon.bind.product',
                    id: cid
                }, this.stepKey1)
                // var d2 = await tryAwait('get', '', opts1, true)   // 配置商品

                var opts3 = $.extend({
                    _api: 'pd.coupon.bind.share',
                    id: cid
                }, this.stepKey3)
                // var d4 = await tryAwait('get', '', opts3, true)   // 配置分享
                
                var opts2 = $.extend({
                    _api: 'pd.coupon.bind.rule',
                    id: cid
                }, this.stepKey2)
                // console.log(opts2.rule_terms);
                opts2.rule_terms = opts2.rule_terms.replace(/\r|\n/g, '')
                opts2.rule_title = opts2.rule_detail = ruleTest.str;
                opts2.rule_content = JSON.stringify(this.stepKey2.rule_content);
                
                // var d3 = await tryAwait('get', '', opts3, true)   // 配置规则
                // if(d3 && d3.success){
                //     this.$message({
                //         type: 'success',
                //         message: '配置优惠券成功'
                //     })
                //     this.isInput = false;
                //     this.tableList();
                // }

                var opts4 = $.extend(true, {
                    _api: 'pd.coupon.bind.putin',
                    id: cid
                }, this.stepKey4)

                if(!opts4.buyTimes) opts4.buyTimes = 1;   // 购买次数不必须填，默认1
                opts4.purchaseTimes = 1;   // purchaseTimes默认传1，不必填

                if(this.stepKey4.scope==2){
                    opts4.areaIds = clickAreaIds.map( v => v.id ).join(',');
                    delete opts4.storeIds;
                }else if(this.stepKey4.scope==3){
                    opts4.storeIds = clickStoreIds.map( v => v.id ).join(',');
                    delete opts4.areaIds;
                }
                // opts4.channel = this.chooseChannel.join(',');
                opts4.channel = clickChannelIds.map( v => v.id ).join(',');

                // opts4.startTime = new Date(opts4.startTime.split(' ')[0]).getTime();
                // opts4.endTime = new Date(opts4.endTime.split(' ')[0]).getTime();
                // 不把时分秒默认为00：00：00了， 控件自己控制选择00：00：00
                var fomat = function(t){   // 只取年月日，其他处理成00：00：00
                    return t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate()
                }
                if(opts4.startTime) opts4.startTime = new Date(fomat(opts4.startTime).replace(/\-/g, "/")).getTime();
                if(opts4.endTime) opts4.endTime = new Date(fomat(opts4.endTime).replace(/\-/g, "/")).getTime();

                Promise.all([
                    await tryAwait('get', '', opts1, true),  // 商品
                    await tryAwait('get', '', opts2, true),  // 分享
                    await tryAwait('get', '', opts3, true),   // 规则
                    await tryAwait('get', '', opts4, true)   // 投放
                ]).then( res =>{
                    if(res[0] && res[0].success && res[1] && res[1].success && res[2] && res[2].success && res[3] && res[3].success){
                        this.$message({
                            type: 'success',
                            message: '创建配置优惠券成功'
                        })
                        this.isInput = false;
                        this.tableList();

                        this.resetPutCheck();
                        this.initKeys();
                    }
                })
            }
        },
        
        changeItem(v){
            // 状态
            var str = '';

            // 优惠券状态和其他不一样  1是下架  0是上架 这里反过来下
            if(v.status == 0){
                v.status = 1
            }else if(!v.status || v.status == 1){
                v.status = 0;
            }

            if(v.status == 1) str += '上架中 ';
            else if(v.status == 0) str += '下架中 ';
            else if(v.status == -1) str += '已删除 ';
            str += v.preheat == 1 ? '预热券':'非预热劵';
            v.statusKeys = str;
            // 处理图片
            try{    //  有的数据JSON.parse解析会出错  所以用try catch 处理下
                v.imgUrl = v.url ? JSON.parse(v.url).icon_img.img : '';
            }catch(e){
                console.log(e)
            }
            // 类型
            v.useTypeStr = v.useType == 1 ? '优惠券' : v.useType == 2 ? '优惠码' : '码加券'
            // 规则
            if(v.rule){
                v.ruleStr = JSON.parse(v.rule).reduce((a, b)=>{
                    a += b.text+'\n';
                    return a;
                }, '');
            }else{
                v.ruleStr = ''
            }
            // console.log(v)
            return v;
        },
        changeTableData(d){    // 直接请求到的数据不能直接使用，这里继续处理下
            return d.map( v => this.changeItem(v) );
        },

        selfEditCancel(){
            this.proImgs = [];
            this.initKeys();
            this.resetPutCheck()
        },

        testRule(){
            var message = []     //   未填或者未选择的key

            var tips = () =>{   //  提示
                if(message.length > 0){
                    this.$message({
                        type: 'error',
                        message: this.tipKeyStr[message[0]] + '没填或者没选~'
                    })
                }
            }

            var allKeys = this.editKeys.concat(this.step1, this.step2, this.step3, this.step4)

            var noTest = ['sellPrice', 'integral', 'buyTimes']
            noTest.forEach( v=>{    //  这三个不必须填
                allKeys.splice(allKeys.indexOf(v),1)
            })
            if(this.editItem.useType == 2){   // 优惠码时不用填售价
                if(this.editItem.sellPrice) delete this.editItem.sellPrice
                allKeys.splice(allKeys.indexOf('sellPrice'),1)
            }
            if(this.editItem.useType != 1){  // 优惠码 码加券时不用填积分
                if(this.editItem.integral) delete this.editItem.integral
                allKeys.splice(allKeys.indexOf('integral'),1)
            }
            allKeys.forEach( (el, i) =>{
                [this.editItem, this.stepKey1, this.stepKey2, this.stepKey3].forEach( item =>{
                    if(item.hasOwnProperty(el)){
                        if( (item[el] + '').trim() == '' ){
                            message.push(el);
                            allKeys.splice(i, 1);   // 如果判断过就删掉  以免重复判断  提升性能 
                            return
                        }
                    }
                })
            })

            if(this.editItem.useType == 1){
                if(message.indexOf('codeTitle') > -1){
                    message.splice(message.indexOf('codeTitle'), 1);
                    delete this.editItem.codeTitle
                }
                if(message.indexOf('codeNum') > -1){
                    message.splice(message.indexOf('codeNum'), 1);
                    delete this.editItem.codeNum
                }
                if(message.indexOf('codeStartTime') > -1){
                    message.splice(message.indexOf('codeStartTime'), 1);
                    delete this.editItem.codeStartTime
                }
                if(message.indexOf('codeEndTime') > -1){
                    message.splice(message.indexOf('codeEndTime'), 1);
                    delete this.editItem.codeEndTime
                }
            }
            // console.log(message);
            tips();   // 弹出提示 目前只弹第一个  可改循环全部弹出

            return message.length > 0 ? false : true
        },

        handleRuleTitleDetail(){
            var ok = true;
            var n = this.stepKey2.rule_id - 0;  //  减0转换成数字
            var str = ''
            var rule_content = this.stepKey2.rule_content;
            switch(n){
                case 1:
                    if( (rule_content.full + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '满多少未填~'
                        })
                        ok = false;
                    }else if( (rule_content.cut + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '减多少未填~'
                        })
                        ok = false;
                    }else {
                        str += '满' + rule_content.full + '减' + rule_content.cut
                    }
                    break;
                case 2:
                    if( !rule_content.cut || (rule_content.cut + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '直减多少未填~'
                        })
                        ok = false;
                    }else {
                        str += '直减' + rule_content.cut;
                    }
                    break;
                case 3:
                    if( (rule_content.disc + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '折扣未填~'
                        })
                        ok = false;
                    }else {
                        str += '打' + rule_content.disc + '折';
                    }
                    break;
                case 4:
                    if( (rule_content.buyNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '买多少未填~'
                        })
                        ok = false;
                    }else if( (rule_content.sendItems + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '送什么未填~'
                        })
                        ok = false;
                    }else if( (rule_content.sendItemsNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '送多少未填~'
                        })
                        ok = false;
                    }else {
                        str += '买' + rule_content.buyNum + '个送' + rule_content.sendItemsNum + '个' + rule_content.sendItems
                    }
                    break;
                case 5:
                    if( (rule_content.originPrice + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '原价未填~'
                        })
                        ok = false;
                    }else if( (rule_content.nowPrice + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '现价未填~'
                        })
                        ok = false;
                    }else {
                        str += '原价' + rule_content.originPrice + '元现价' + rule_content.nowPrice
                    }
                    break;
                case 6:
                    if( (rule_content.fullNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '满多少个未填~'
                        })
                        ok = false;
                    }else if( (rule_content.fullNumOriginPriceDisc + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '打折数未填~'
                        })
                        ok = false;
                    }else {
                        str += '满' + rule_content.fullNum + '打' + rule_content.fullNumOriginPriceDisc + '折'
                    }
                    break;
                case 7:
                    if( (rule_content.allItems + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '组合商品未填~'
                        })
                        ok = false;
                    }else if( (rule_content.allItemsOriginPrice + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '原价未填~'
                        })
                        ok = false;
                    }else if( (rule_content.allItemsNowPrice + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '现价未填~'
                        })
                        ok = false;
                    }else {
                        str += '组合商品' + rule_content.allItems + '原价' + rule_content.allItemsOriginPrice + '现价' + rule_content.allItemsNowPrice
                    }
                    break;
                case 8:
                    if( (rule_content.buyItemsNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '商品名称未填~'
                        })
                        ok = false;
                    }else if( (rule_content.buyItemsNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '购买数量未填~'
                        })
                        ok = false;
                    }else if( (rule_content.buyItemsAddMoney + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '加钱未填~'
                        })
                        ok = false;
                    }else if( (rule_content.buyItemsExchangeItem + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '送商品未填~'
                        })
                        ok = false;
                    }else if( (rule_content.buyItemsExchangeItemNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '送商品数量未填~'
                        })
                        ok = false;
                    }else{
                        str += '购买' + rule_content.buyItemsNum + rule_content.buyItemsNum
                            + '个加钱' + rule_content.buyItemsAddMoney + '元' + '换购' + rule_content.buyItemsExchangeItem + 
                            rule_content.buyItemsExchangeItemNum + '个'
                    }
                    break;
                case 9:
                    if( (rule_content.fullItemNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '满多少未填~'
                        })
                        ok = false;
                    }else if( (rule_content.firstNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '第几件未填~'
                        })
                        ok = false;
                    }else if( (rule_content.firstNumOriginPriceDisc + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '打几折未填~'
                        })
                        ok = false;
                    }else {
                        str += '满' + rule_content.fullItemNum + '件第' + rule_content.firstNum + '件打' + rule_content.firstNumOriginPriceDisc + '折';
                    }
                    break;
                case 10:
                    if( (rule_content.fullPrice + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '满多少未填~'
                        })
                        ok = false;
                    }else if( (rule_content.sendItemsName + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '送什么未填~'
                        })
                        ok = false;
                    }else if( (rule_content.sendItemsNameNum + '').trim() == '' ){
                        this.$message({
                            type: 'error',
                            message: '送多少未填~'
                        })
                        ok = false;
                    }else {
                        str += '满' + rule_content.fullPrice + '元送减' + rule_content.sendItemsNameNum + '个' + rule_content.sendItemsName
                    }
                    break;
            }
            return {
                ok: ok,
                str: str
            }
        }
    }
}
</script>

<style lang="sass">
.tk
    .el-textarea__inner
        height: 138px;

.coupon-table
    .el-table .cell, .el-table th>div
        padding-left: 5px;
        padding-right: 5px;

.pre-view
    i
        position: absolute;
        color: red;
        left: 10%;
        top: 50px;
        margin-left: -14px;
        margin-top: -14px;
        z-index: 101;
        cursor: pointer;
    .el-row
        min-height: 30px;
        line-height: 30px;
        margin-bottom: 2px;
        &:last-child
            margin-bottom: 0;
    .el-col
        border-radius: 4px;
        div
            padding-left: 5px;
    .bg-purple-dark
        background: #99a9bf;
    .bg-purple
        background: #d3dce6;
    .bg-purple-light
        background: #e5e9f2;
</style>

<style lang="sass" scoped>

.pre-view
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.4);
    .box
        position: absolute;
        width: 80%;
        height: 80%;
        margin-top: 50px;
        margin-left: 10%;
        background: #fff;
        overflow: auto;

        

.tabs
    background-color: #f9fafc;
    margin-bottom: 24px;
    margin-top: -20px;
    border-bottom: 1px solid #d3dce6;
    li:hover
        background-color: #f9fafc;
    .is-active
        border-bottom: 5px solid #20a0ff;

.title
    font-size: 14px;
    line-height: 1.8;
    color: #20a0ff;
    border-bottom: 1px solid #20a0ff;
    margin-bottom: 10px;

.el-radio-group.block
    .el-radio
        width: 360px;
        display: block;
        height: 36px;
        line-height: 36px;
        margin-bottom: 5px;
        .radio-input
            float: right;
            width: 200px!important;
            input
                width: 100px!important;
    .el-radio+.el-radio
        margin-left: 0;

.el-upload__tip
    margin-top: -35px;
    text-align: center;

.edit-address
    .address
        select
            width: 115px!important;
            height: 36px!important;
            border-radius: 5px!important;
            border: 1px solid #8391a5!important;

.avatar-uploader
    .el-upload
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

.avatar-uploader
    .el-upload
        &:hover
            border-color: #20a0ff;

.avatar-uploader-icon
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;

.avatar
    width: 178px;
    height: 178px;
    display: block;

</style>
