<template>
  <div>
    <div class="shop display overHide">
      <!-- 左边菜单 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            class="menu-item display alignItem"
            :class="{'current':currentIndex === index}"
            @click="selectMenu(index)"
            v-for="(item,index) in menuLeft"
            :key="index"
          >{{item.title}}</li>
        </ul>
      </div>
      <!-- 右边商品 -->
      <div class="shop-wrapper" ref="shopWrapper">
        <ul>
          <li
            class="w100 borderRed shop-list-hook"
            v-for="(item,index) of menuLeft"
            :key="index"
            style="height:500px;"
          >{{item.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style  scoped>
@import "../../assets/css/classIfy.css";
</style>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      menuLeft: [],
      listHeight: [],
      scrollY: 0 // 记录右侧列表实时滚动的Y坐标值。
    };
  },
  created() {
    // 左侧菜单数据
    this.$axios.get("classIfy/menuLeft").then(res => {
      this.menuLeft = res.data;
      this.$nextTick(() => {
        this._initBScroll();
        this._calculateHeight();
      });
    });
  },
  methods: {
    selectMenu(index) {
      // 发生点击事件时，将被点击菜单栏的索引传递过来，与右侧food列表区域绑定，实现滚动。
      console.log(index);
      let shopList = this.$refs.shopWrapper.getElementsByClassName(
        "shop-list-hook"
      ); // 获取food列表区间数组集合。
      let el = shopList[index]; // 获取当前点击菜单栏对应的food列表区间，
      this.shopRightScroll.scrollToElement(el, 300); // 调动接口函数，使得food列表实时滚动到el所在区间，300表示滚动时间。
    },
    _initBScroll() {
      // 左边滚动
      this.menuLeftScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
        scrollY: true
      });
      this.shopRightScroll = new BScroll(this.$refs.shopWrapper, {
        probeType: 3 // probeType: 3表示实时传递滚动位置，相当于探针。用法见better-scroll，还可以为1,2，效果不一样。
      });
      //监听右边滚动事件
      this.shopRightScroll.on("scroll", pos => {
        // 实时获得滚动轴的Y坐标。
        this.scrollY = Math.abs(pos.y);
      });
    },
    _calculateHeight() {
      let shopList = this.$refs.shopWrapper.getElementsByClassName(
        "shop-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (var i = 0; i < shopList.length; i++) {
        height = height + shopList[i].clientHeight;
        this.listHeight.push(height);
      }
      console.log(this.listHeight);
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY > +height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  }
};
</script>