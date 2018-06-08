<template lang="pug">
.ss-search
    slot
    el-button(type="success" @click="$emit('search')" size="small") 查询
    el-button(type="success" @click="$emit('reset')" size="small") 重置
</template>
<script>
export default {
    name: 'search'
}
</script>