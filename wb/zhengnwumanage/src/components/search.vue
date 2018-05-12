<template lang="pug">
.ss-search
    slot
    el-button(type="success" @click="$emit('search')") 查询
    el-button(type="success" @click="$emit('reset')") 重置
</template>
<script>
export default {
    name: 'search'
}
</script>