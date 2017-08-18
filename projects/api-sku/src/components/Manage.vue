<template lang="pug">
.manage-ctn
    ManageNav(cur="cur")
    .main
        router-view
</template>
   

<script>
import ManageNav from './manage/nav.vue'
export default {
    name: 'manage',
    data () {
        return {
        }
    },
    components: {
        ManageNav
    }
}
</script>

<style lang="sass">
$colorBorder: #339999;
.manage-ctn
    width: 100%;
    height: 100%;
    overflow: hidden;

    .nav
        width: 18%;
        height: 100%;
        border-right: 1px solid $colorBorder;
        float: left;
        ul
            overflow: hidden;
            li
                float: left;
                color: $colorBorder;
                text-align: left;
                padding-left: 10px;
                width: 100%;
                line-height: 2.5;
                border: $colorBorder;
                cursor: pointer;
                &:hover
                    background: #33cccc;
                    color: #FFF;
                
                &.cur
                    background: $colorBorder;
                    color: #FFF;
                
    .main
        width: 82%;
        float: left;
        .main-ctn
            padding: 30px;
            h3
                color: $colorBorder;
                text-align: left;

            table
                margin: 30px 0;
                border-spacing: 0;
                width: 100%;
                border-bottom: 1px solid $colorBorder;
                border-right: 1px solid $colorBorder;
                

                tr
                    td,th
                        border: 1px solid $colorBorder;
                        border-bottom: none;
                        border-right: none;
                        padding: 5px 10px;

            .btn
                display: inline-block;
                padding: 5px 10px;
                margin: 0 10px;
                border-radius: 5px;
                background: $colorBorder;
                color: #FFF;
                cursor: pointer;
                &.del
                    background: $colorBorder;
                &.edit
                    background: $colorBorder;

            .row
                height: 40px;
                margin: 10px 0;
                
                &:after
                    clear: both;

                input
                    min-width: 100px;
                    height: 40px;
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid $colorBorder;
                    float: left;

                label
                    min-width: 50px;
                    padding: 0 10px;
                    float: left;
                    line-height: 40px;
                    color: $colorBorder;

    

</style>
    