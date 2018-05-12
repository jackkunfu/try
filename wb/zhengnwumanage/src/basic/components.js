// webpack2 vue 异步引用组件
export default function(Vue){
    Vue.component('sTable', () => import('@/components/table.vue'))
    Vue.component('search', () => import('@/components/search.vue'))
}