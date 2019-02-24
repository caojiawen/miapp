<template>
  <div class="login-container" :style="{height:Height}">
    <!-- 小米图标&&小米账号登录 -->
    <div class="title">
      <p class="mui-icon iconfont icon-xiaomi title-icon"></p>
      <p class="title-text">小米账号登录</p>
    </div>
    <!-- 输入框 -->
    <form class="mui-input-group">
      <div class="mui-input-row">
        <input ref="name" type="text" class="mui-input-clear" placeholder="请输入用户名">
      </div>
      <div class="mui-input-row">
        <input ref="password" type="password" class="mui-input-password" placeholder="请输入密码">
      </div>
      <!-- 登录按钮 -->
      <div class="buttons">
        <button class="button-login w100" @click="login">登录</button>
        <button class="button-phone w100">手机短信登录/注册</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
@import "../../../assets/css/login.css";
</style>
<script>
import { Toast } from "mint-ui";
import qs from "qs";
export default {
  data() {
    return {
      Height: window.innerHeight + "px"
    };
  },
  mounted() {
    console.log(window.innerHeight);
  },
  methods: {
    login: function() {
      let name = this.$refs.name.value;
      let password = this.$refs.password.value;
      this.$axios
        .post("user/login", qs.stringify({ name: name, password: password }))
        .then(res => {
          let Status = res.data.msg.length;
          let user = res.data.msg[0];
          if (Status > 0) {
            Toast("登录成功！");
            // 用户信息保存到sessionStorage
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("uid", JSON.stringify(user.uid));
            // this.$store.dispatch('login')
            // console.log(this.$store.state.user.LoginedUser.ChinaName)
            // // 跳转到我的页面
            if (sessionStorage.getItem("jump")) {
              this.$router.push(sessionStorage.getItem("jump"));
              this.$nextTick(() => {
                sessionStorage.removeItem("jump");
              });
            }else{
              this.$router.push('/')
            }
          } else {
            Toast("账号或密码错误！");
          }
        });
    }
  }
};
</script>
