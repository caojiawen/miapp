<template>
  <div :style="{height:Height}" class="overHide">
    <!-- header标题 -->
    <div class="cart_header">购物车</div>
    <!-- 购物车商品列表 -->
    <div class="cart h80" ref="cart_shop">
      <ul>
        <li
          class="mui-input-row mui-checkbox mui-left cart-item display alignItem"
          v-for="(item,index) in carts"
          :key="item.index"
        >
          <input
            name="checkbox1"
            value="Item 1"
            type="checkbox"
            :checked="item.seleted"
            @click="selectList($event,index)"
          >
          <div class="cart-content display alignItem">
            <img class="cart-content-avatar" :src="item.cart_pic" alt>
            <div>
              <p>{{item.cart_title}}</p>
              <p>售价：{{item.cart_price}}元</p>
              <div class="mui-numbox" data-numbox-min="0" data-numbox-max="100">
                <button
                  class="mui-btn mui-numbox-btn-minus"
                  @click="btn_minute(index)"
                  type="button"
                >-</button>
                <input
                  class="mui-numbox-input"
                  type="number"
                  ref="count_num"
                  @blur="valueBlur(index)"
                  v-model="item.cart_count"
                >
                <button class="mui-btn mui-numbox-btn-plus" type="button" @click="btn_add(index)">+</button>
              </div>
              <div class="delete" @click="remove_cart(index)" ref="remove_cart" :data-id="item.id">
                <img src="../../assets/images/cart/delete.png" alt>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部总价及结算 -->
    <footer class="display alignItem between w100">
      <div class="mui-input-row mui-checkbox mui-left display w70">
        <input
          style="top:3px"
          name="checkbox1"
          value="Item 1"
          type="checkbox"
          @click="selectAll"
          :checked="selectAllStatus"
        >
        <label style="padding-left:30px">全选</label>
        <p class="w100 display alignItem">
          总价：
          <span style="color:red;font-size:16px">{{totalPrice}}</span>元
        </p>
      </div>
      <!-- <div class="w70 h100 display alignItem total" style="background:white;">总价：
        <span>0</span>元
      </div>-->
      <div
        class="w30 h100 display alignItem center"
        style="background-color: #FF6B00;color:white;"
      >结算</div>
    </footer>
  </div>
</template>
<style scoped>
@import "../../assets/css/cart.css";
</style>
<script>
import qs from "qs";
import BScroll from "better-scroll";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      Height: sessionStorage.getItem("Height")-80 + "px",
      carts: [],
      //控制全选
      selectAllStatus: true,
      // 商品总价
      totalPrice: 0
    };
  },
  updated() {},
  mounted() {
    var uid = sessionStorage.getItem("uid");
    this.$axios.get("cart?uid=" + uid).then(res => {
      console.log(res);
      this.carts = res.data;
      this.computeTotalPrice();
    });
    this._initBScroll();
  },
  methods: {
    _initBScroll() {
      this.cartBscroll = new BScroll(this.$refs.cart_shop, {
        click: true,
        scrollY: true
      });
    },
    // 数量减 按钮
    btn_minute: function(index) {
      var list = this.carts;
      var num = list[index].cart_count;
      if (num > 1) {
        num = num - 1;
        this.carts[index].cart_count = num;
      } else {
        this.carts[index].cart_count = 1;
        Toast("数量最小为1");
      }
      this.computeTotalPrice();
      console.log(num);
    },
    // 数量+ 按钮
    btn_add: function(index) {
      var list = this.carts;
      var num = list[index].cart_count;
      if (num < 99) {
        num = num + 1;
        this.carts[index].cart_count = num;
      } else {
        this.carts[index].cart_count = 99;
        Toast("数量最大为99");
      }
      this.computeTotalPrice();
    },
    // 失去焦点
    valueBlur: function(index) {
      var values = this.$refs.count_num[index].value;
      if (values < 1) {
        this.carts[index].cart_count = 1;
        Toast("数量最小为1");
      } else if (values > 99) {
        this.carts[index].cart_count = 99;
        Toast("数量最大为99");
      }
    },
    // 删除商品
    remove_cart: function(index) {
      var id = this.$refs.remove_cart[index].dataset.id;

      MessageBox.confirm("", {
        message: "确定删除商品？",
        title: "提示",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            this.$axios
              .post("cart/removeCart", qs.stringify({ id: id }))
              .then(res => {
                console.log(res);
                if (res.data.code == 1) {
                  this.carts.splice(index, 1);
                  Toast("删除成功！");
                }
              });
            console.log(1);
          }
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
            console.log(2);
          }
        });
      console.log(id, index);
    },
    // 控制全选
    selectAll: function(e) {
      let selectAllStatus = this.selectAllStatus;
      selectAllStatus = !selectAllStatus;
      let carts = this.carts;
      for (var i = 0; i < carts.length; i++) {
        carts[i].seleted = selectAllStatus;
      }
      this.selectAllStatus = selectAllStatus;
      this.carts = carts;
      this.computeTotalPrice();
    },
    // 商品选择
    selectList: function(e, index) {
      let carts = this.carts;
      const seleted = carts[index].seleted;
      carts[index].seleted = !seleted;
      for (let i = 0; i < carts.length; i++) {
        console.log(carts[i].seleted);
        carts[i].seleted === true
          ? (this.selectAllStatus = true)
          : (this.selectAllStatus = false);
      }
      this.computeTotalPrice();
    },
    // 计算总价
    computeTotalPrice: function() {
      let carts = this.carts;
      let total = 0;
      for (let i = 0; i < carts.length; i++) {
        if (carts[i].seleted) {
          total += carts[i].cart_count * carts[i].cart_price;
        }
      }
      this.carts = carts;
      this.totalPrice = total;
      console.log(total);
    }
  }
};
</script>