// 地图选择处理
export default {
    data(){
        return {
            map: null,
            isShowMap: false,
            clickMapInfo: { point:{} },    // 点选的地址信息对象
            localSearch: null,       // 检索
            searchStr: ''
        }
    },

    mounted(){

        this.$nextTick(()=>{
            this.map = new BMap.Map("map");          // 创建地图实例
            var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
            this.map.centerAndZoom(point, 15);
            this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            // 单击获取点击的经纬度
            this.map.addEventListener("click", e =>{
                this.clickMapInfo = e;
                this.chooseMapOk();
                // alert(e.point.lng + "," + e.point.lat);
            });
        })
        
    },

    methods: {
        searchMap(){
            var str = this.searchStr.trim();
            if(str == '') return
            if(!this.localSearch) this.localSearch = new BMap.LocalSearch(this.map, {
                renderOptions: { map: this.map }
            });
            this.localSearch.search(str);
        },
        chooseMapOk(){   //  选择经纬度，确认时，如果编辑状态信息绑定到editInfo.mapInfo,不然绑定到searchInfo.mapInfo
            var key = this.showEditCtn ? 'editInfo' : 'searchInfo';
            this[key].mapInfo = this.clickMapInfo
            var point = this.clickMapInfo.point;
            this[key].lon = point.lng
            this[key].lat = point.lat
            this.isShowMap = false;
        }
    }
}