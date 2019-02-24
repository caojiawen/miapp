<template>
  <div class="app-container">
    <!-- 2: 多个组件切换 router-view -->
    <router-view></router-view>
    <!-- 3: tabbar 固定在底部导航条 -->
    <nav class="mui-bar mui-bar-tab overHide" v-if="$route.meta.tabbar">
      <!-- home -->
      <a class="mui-tab-item mui-active">
        <span class="mui-icon iconfont icon-shouye" @click="jumpTabbar($event)" data-name="Index"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <!-- member -->
      <a class="mui-tab-item">
        <span class="mui-icon iconfont icon-fenlei" @click="jumpTabbar($event)" data-name="ClassIfy"></span>
        <span class="mui-tab-label">分类</span>
      </a>
      <!-- cart -->
      <a class="mui-tab-item">
        <span class="mui-icon iconfont icon-gouwuche" @click="jumpTabbar($event)" data-name="Cart">
        </span>
        <span class="mui-tab-label">购物车</span>
      </a>
      <!-- search -->
      <a class="mui-tab-item">
        <span class="mui-icon iconfont icon-My" @click="jumpTabbar($event)" data-name="My"></span>
        <span class="mui-tab-label">我的</span>
      </a>
    </nav>
    <!-- 作业：学子商城底部导航栏 -->
  </div>
</template>
<style>
/* mt-header 固定布局显示组件 */
* {
  touch-action: none;
}
body {
  background-color: #f2f2f2;
  font-size: 14px;
}
</style>
<script>
import Vue from "vue";
export default {
  data() {
    return {};
  },
  mounted(){
    sessionStorage.setItem('Height',window.innerHeight)
  },
  methods:{
    jumpTabbar(e){
      console.log(e.target.dataset.name)
      this.$router.push({
        name:e.target.dataset.name
      })
    }
  }
};
</script>

