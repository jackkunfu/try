<template lang="pug">
.ctn
    ul
        li(v-for="(item,i) in lists")
            router-link(:to="{ name: item.name, path: item.url }")
                .front(:style="{ backgroundColor:item.color }")
                    img(:src="item.icon")
                    h1 {{item.title}}

                .end
                    img(:src="item.icon")
                    div(v-for="(description, i) in item.desc.split(',')")
                        | {{description}}
</template>
   

<script>
export default {
    name: 'm-index',
    data () {
        return {
            lists: [
                {title:'系统管理', color: '#336666', icon:'https://juheimg.oss-cn-hangzhou.aliyuncs.com/www/api/a103.png', desc:'1.用户管理,2.白名单管理,3.动态app注册', name: 'manage', url: '/manage'},
                {title:'Api', color: '#336666', icon:'https://www.juhe.cn/themes/v5/public/images/imgnew/taste.png', desc:'1.api查询,2.api调试,3.api-sku,4.提供注解方式导出文档', name: 'api', url: '/api'},
                {title:'系统管理', color: '#336666', icon:'https://juheimg.oss-cn-hangzhou.aliyuncs.com/www/api/a103.png', desc:'1.用户管理,2.白名单管理,3.动态app注册', name: 'manage', url: '/manage'}
            ]
        }
    }
}
</script>

<style lang="sass" scoped>
    $themeColor: #339999;
    
    ul
        margin: 20px -30px;
        overflow: hidden;
        padding: 30px 0;

        li
            margin: 20px 30px;
            float: left;
            width: 360px;
            height: 400px;
            color: #FFF;
            perspective: 800px;
            position: relative;
            cursor: pointer;
            
            &:hover
                .front
                    transform: rotateY(180deg);
                    img
                        margin-top: 30px;

                .end
                    transform: rotateY(0deg);
                    img
                        margin-top: 10px;
                
            .front,.end
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                backface-visibility: hidden;
                transition: all .7s;
                img
                    transition: all .7s;
                    width: 40%;
                    margin-top: 100px;

            .front
                z-index: 2;

            .end
                background-color: #FFF;
                border: 1px solid $themeColor;
                transform: rotateY(180deg);
                color: $themeColor;
                text-align: center;
                padding: 20px 0;
                line-height: 50px;
                font-size: 18px;
                    



</style>
    