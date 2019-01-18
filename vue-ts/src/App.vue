<template>
  <div id="app">
    <router-view class="login" name="login" v-if="isLogin"/>
    <div class="app-html" v-else>
      <router-view name="appLeft"/>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  name: ''
  get isLogin(): boolean {
    let data = this.$route.path === '/login'
    return data
  }
  
  private created() {
    console.log(this)
    // if (!this.$route.query.nickname) return;
    // this.nickname = this.$route.query.nickname
  }
  mounted() {
    console.log(2)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
