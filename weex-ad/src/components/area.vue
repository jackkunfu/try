<template lang="pug">
div
    .top
        wxc-searchbar(
            :disabled="true"
            placeholder="搜索目的地"
            mod="hasDep"
            dep-name="杭州"
            @wxcSearchbarDepChooseClicked="wxcSearchbarDepChooseClicked"
            @wxcSearchbarInputDisabledClicked="wxcSearchbarInputDisabledClicked"
        )
    .fix
        wxc-indexlist(
            v-if="isShowCitys"
            :normal-list="normalList"
            :hot-list-config="hotListConfig"
            :city-location-config="cityLocationConfig"
            @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
            :show-index="true"
        )
</template>

<script>
import { WxcSearchbar, WxcIndexlist } from 'weex-ui'
import { dataList } from '../js/city.js'
export default {
    components: { WxcSearchbar, WxcIndexlist },
    data() {
        return {
            isShowCitys: false,
            normalList: dataList.normalList,
            hotListConfig: {
                type: 'group',
                title: '热门',
                list: dataList.hotList
            },
            cityLocationConfig: {
                type: 'group',
                title: '定位',
                list: [{ name: '杭州', isLocation: true }]
            }
        }
    },
    methods: {
        wxcSearchbarDepChooseClicked(){
            alert(1)
            this.isShowCitys = true
        },
        wxcSearchbarInputDisabledClicked(){
            alert(2)
        },
        wxcIndexlistItemClicked(data){
            console.log(data)
        }
    }
}
</script>

