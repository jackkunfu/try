<template lang="pug">
    #app
        //- img(src="./assets/logo.png")
        router-view
</template>

<script>
    export default {
        name: 'app'
    }
</script>
    
<style lang="less">
    @import './assets/reset.less';
    body{
        
        #app {
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            color: #2c3e50;
            height: 100%;
        }
    }
</style>
    
    
