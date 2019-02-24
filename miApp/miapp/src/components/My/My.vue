<template>
  <div>
    <!-- 用户信息 -->
    <div class="user w100">
      <img class="userBg w100 h100" src="../../assets/images/user/userBackground.png" alt>
      <div class="userInfo display alignItem">
        <div class="userInfoImg display">
          <img v-if="!userInfo" class="w100 h100" src="../../assets/images/user/user.png" alt>
          <img v-else :src="userInfo.avatar" class="w100 h100" alt="">
        </div>
        <div v-if="!userInfo" @click="jumpLogin">登录/注册</div>
        <div v-else>
          <span>用户名：{{userInfo.ChinaName}}</span>
          <span style="margin-left:40px;" @click="loginOut">退出</span>
        </div>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="myOrder w100 alignItem display between border-b">我的订单
      <div class="arrow-right"></div>
    </div>
    <!-- 待付款 || 待收货 || 退换修 -->
    <ul class="display alignItem between allState">
      <li class="display column alignItem">
        <img src="../../assets/images/user/obligations.png" alt>
        <span>待付款</span>
      </li>
      <li class="display column alignItem">
        <img src="../../assets/images/user/send.png" alt>
        <span>待付款</span>
      </li>
      <li class="display column alignItem">
        <img src="../../assets/images/user/repairing.png" alt>
        <span>待付款</span>
      </li>
    </ul>
    <div class="hd"></div>
    <!-- 会员中心||我的优惠 -->
    <ul class="public">
      <li class="public-item display">
        <img src="../../assets/images/user/member.png" alt>
        <div class="border-b w100 display alignItem">会员中心
          <div class="arrow-right"></div>
        </div>
      </li>
      <li class="public-item display">
        <img src="../../assets/images/user/coupon.png" alt>
        <div class="w100 display alignItem">我的优惠
          <div class="arrow-right"></div>
        </div>
      </li>
    </ul>
    <div class="hd"></div>
    <!-- 服务中心||小米之家 -->
    <ul class="public">
      <li class="public-item display">
        <img src="../../assets/images/user/service.png" alt>
        <div class="border-b w100 display alignItem">服务中心
          <div class="arrow-right"></div>
        </div>
      </li>
      <li class="public-item display">
        <img src="../../assets/images/user/miFamily.png" alt>
        <div class="w100 display alignItem">小米之家
          <div class="arrow-right"></div>
        </div>
      </li>
    </ul>
    <div class="hd"></div>
    <!-- F码通道 -->
    <ul class="public">
      <li class="public-item display">
        <img src="../../assets/images/user/Fma.png" alt>
        <div class="w100 display alignItem">F码通道
          <div class="arrow-right"></div>
        </div>
      </li>
    </ul>
    <!-- 设置 -->
    <div class="hd"></div>
    <!-- F码通道 -->
    <ul class="public">
      <li class="public-item display">
        <img src="../../assets/images/user/setting.png" alt>
        <div class="w100 display alignItem">设置
          <div class="arrow-right"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
@import "../../assets/css/my.css";
</style>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('user'))
    };
  },
  mounted() {
  },
  methods: {
    jumpLogin: function() {
      sessionStorage.setItem('jump','/my')
      this.$router.push({
        name: "login",
        path: "/login"
      });
    },
    loginOut:function(){
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('uid');
      this.$router.go(0);
    }
  }
};
</script>