<template>
  <div>
    <div style="position:fixed;top:0;z-index:999;background:#F2F2F2;width:100%;">
      <!-- 顶部搜索组件-start -->
      <header class="display alignItem between">
        <span class="mui-icon iconfont icon-xiaomi" style="color:#FF6B00;margin-left:10px;"></span>
        <div class="header-input display h100">
          <span style="font-size:20px;" class="mui-icon iconfont icon-sousuo"></span>
          <input class="h100 border-0" style="font-size:14px;" type="text" placeholder="请输入搜索内容">
        </div>
        <span class="mui-icon iconfont icon-My"></span>
      </header>
      <!-- 顶部搜索组件-end -->
      <!-- 列表菜单-start -->
      <nav class="display between alignItem overHide">
        <!-- 菜单未展开 -->
        <ly-tab
          v-if="!isNav"
          v-model="selectedId"
          :items="items"
          :options="options"
          @change="navTab"
        ></ly-tab>
        <div v-else>
          <div style="padding:8px 14px">全部</div>
          <div style="position:fixed;top:70px;background:#F2F2F2;z-index:9999">
            <el-row :gutter="20" style="margin-left:5px;">
              <el-col :span="6" v-for="item in items" :key="item.id">
                <div class="navItem">{{item.label}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <span
          class="mui-icon iconfont icon-jiantouxia"
          :class="isNav?'rotate':'' "
          @click="showNav"
        ></span>
      </nav>
      <!-- 列表菜单-end -->
    </div>
    <div ref="index_wrap" :style="{height:Height}">
        <!-- 推荐页面 -->
        <div v-if="selectedId==0">
          <!-- 轮播图-start -->
          <div style="margin-top:72px;">
            <!-- <el-carousel height="180px">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <img class="w100 h100" v-lazy="item.img" alt>
        </el-carousel-item>
            </el-carousel>-->
            <mt-swipe :auto="4000" style="height:180px">
              <mt-swipe-item v-for="item in banner" :key="item.id">
                <img class="w100 h100" :src="item.img" alt>
              </mt-swipe-item>
            </mt-swipe>
          </div>

          <!-- 轮播图-end -->
          <!-- 分类菜单icon-start -->
          <div>
            <ul class="display wrap">
              <li class="w20" v-for="item in iconList" :key="item.id">
                <img class="w100 h100" v-lazy="item.img" alt>
              </li>
            </ul>
          </div>
          <!-- 分类菜单icon-end -->
          <!-- 推荐组件-start -->
          <ul style="height:270px" class="clear box-sizing recommend">
            <li class="w50 h100 fl" v-for="item in recommend" :key="item.id">
              <img class="w100 h100" v-lazy="item.img" alt>
            </li>
          </ul>
          <!-- 推荐组件-end -->
          <!-- 广告组件-start -->
          <div class="advertisement">
            <img
              style="margin-bottom:5px;"
              class="w100 h100"
              v-lazy="dailySelect.advertisement"
              alt
            >
            <!-- 商品组件-每日精选-start -->
            <ul class="product display wrap between overHide">
              <li v-for="item in dailySelect.data" :key="item.id" @click="jumpDetail(item.mid)">
                <div>
                  <img v-lazy="item.img" alt>
                </div>
                <div v-if="item.title" class="product-content">
                  <p class="product-title">{{item.title}}</p>
                  <p class="product-subtitle">{{item.subtitle}}</p>
                  <p>
                    <span class="new-price">￥{{item.newPrice}}</span>
                    <span class="past-price" v-if="item.pastPrice">￥{{item.pastPrice}}</span>
                  </p>
                </div>
              </li>
            </ul>
            <!-- <div v-if="dailySelect.className!=null" class="product-last">更多{{dailySelect.className}}产品 ></div> -->
            <!-- 商品组件-每日精选-end -->
          </div>
          <!-- 广告组件-end -->
          <!-- 广告组件-start -->
          <div class="advertisement">
            <img style="margin-bottom:5px;" class="w100 h100" v-lazy="xiaomiTV.advertisement" alt>
            <!-- 商品组件-小米电视-start -->
            <ul class="product display wrap between overHide">
              <li v-for="item in xiaomiTV.data" :key="item.id">
                <div>
                  <img v-lazy="item.img" alt>
                </div>
                <div v-if="item.title" class="product-content">
                  <p class="product-title">{{item.title}}</p>
                  <p class="product-subtitle">{{item.subtitle}}</p>
                  <p>
                    <span class="new-price">￥{{item.newPrice}}</span>
                    <span class="past-price" v-if="item.pastPrice">￥{{item.pastPrice}}</span>
                  </p>
                </div>
              </li>
            </ul>
            <div v-if="xiaomiTV.className" class="product-last">更多{{xiaomiTV.className}}产品 ></div>
            <!-- 商品组件-小米电视-end -->
          </div>
          <!-- 广告组件-end -->
          <!-- 广告组件-end -->
          <!-- 广告组件-start -->
          <div class="advertisement">
            <img style="margin-bottom:5px;" class="w100 h100" v-lazy="notebook.advertisement" alt>
            <!-- 商品组件-小米笔记本-start -->
            <ul class="product display wrap between overHide">
              <li v-for="item in notebook.data" :key="item.id">
                <div>
                  <img v-lazy="item.img" alt>
                </div>
                <div v-if="item.title" class="product-content">
                  <p class="product-title">{{item.title}}</p>
                  <p class="product-subtitle">{{item.subtitle}}</p>
                  <p>
                    <span class="new-price">￥{{item.newPrice}}</span>
                    <span class="past-price" v-if="item.pastPrice">￥{{item.pastPrice}}</span>
                  </p>
                </div>
              </li>
            </ul>
            <div v-if="notebook.className" class="product-last">更多{{notebook.className}}产品 ></div>
            <!-- 商品组件-小米笔记本-end -->
          </div>
          <!-- 广告组件-end -->
          <!-- 广告组件-start -->
          <div class="advertisement">
            <img
              style="margin-bottom:5px;"
              class="w100 h100"
              v-lazy="starProduct.advertisement"
              alt
            >
            <!-- 商品组件-明星单品-start -->
            <ul class="product display wrap between overHide">
              <li v-for="item in starProduct.data" :key="item.id">
                <div>
                  <img v-lazy="item.img" alt>
                </div>
                <div v-if="item.title" class="product-content">
                  <p class="product-title">{{item.title}}</p>
                  <p class="product-subtitle">{{item.subtitle}}</p>
                  <p>
                    <span class="new-price">￥{{item.newPrice}}</span>
                    <span class="past-price" v-if="item.pastPrice">￥{{item.pastPrice}}</span>
                  </p>
                </div>
              </li>
            </ul>
            <div v-if="starProduct.className" class="product-last">更多{{starProduct.className}}产品 ></div>
            <!-- 商品组件-明星单品-end -->
          </div>
          <!-- 广告组件-end -->
          <!-- 广告组件-start -->
          <div class="advertisement">
            <img style="margin-bottom:5px;" class="w100 h100" v-lazy="newProduct.advertisement" alt>
            <!-- 商品组件-新品上线-start -->
            <ul class="product display wrap between overHide">
              <li v-for="item in newProduct.data" :key="item.id">
                <div>
                  <img v-lazy="item.img" alt>
                </div>
                <div v-if="item.title" class="product-content">
                  <p class="product-title">{{item.title}}</p>
                  <p class="product-subtitle">{{item.subtitle}}</p>
                  <p>
                    <span class="new-price">￥{{item.newPrice}}</span>
                    <span class="past-price" v-if="item.pastPrice">￥{{item.pastPrice}}</span>
                  </p>
                </div>
              </li>
            </ul>
            <div v-if="newProduct.className" class="product-last">更多{{newProduct.className}}产品 ></div>
            <!-- 商品组件-明星单品-end -->
          </div>
          <!-- 广告组件-end -->
          <!-- 广告组件-start -->
          <div class="advertisement">
            <img style="margin-bottom:5px;" class="w100 h100" v-lazy="AI.advertisement" alt>
            <!-- 商品组件-米家智能-start -->
            <ul class="product display wrap between overHide">
              <li class="product-item display w100" v-for="item in AI.data" :key="item.id">
                <div>
                  <img class="w100 h100" v-lazy="item.img" alt>
                </div>
                <div v-if="item.title" class="product-content">
                  <p class="product-title">{{item.title}}</p>
                  <p class="product-subtitle">{{item.subtitle}}</p>
                  <p>
                    <span class="new-price">￥{{item.newPrice}}</span>
                    <span class="past-price" v-if="item.pastPrice">￥{{item.pastPrice}}</span>
                  </p>
                </div>
              </li>
            </ul>
            <div v-if="AI.className" class="product-last">更多{{AI.className}}产品 ></div>
            <!-- 商品组件-明星单品-end -->
          </div>
          <!-- 广告组件-end -->
          <!-- 小米其他商品组件-start -->
          <ul class="others display wrap between">
            <li v-for="item in others.data" :key="item.id">
              <img class="w100 h100" v-lazy="item.img" alt>
            </li>
            <img class="w100 h100 p20" v-lazy="others.advertisement" alt>
          </ul>
          <div class="product-last" style="border:none;margin-bottom:10px;">了解小米</div>
          <!-- 小米其他商品组件-end -->
        </div>
    </div>
    <!-- 手机页面 -->
    <div v-if="selectedId!=0" style="margin-top:80px;">
      <h4>{{selectedName}}页面待开发中</h4>
    </div>
  </div>
</template>
<style scoped>
@import "../../assets/css/Index.css";
</style>
<script>
import BScroll from "better-scroll";
import { Swipe, SwipeItem } from "mint-ui";
export default {
  data() {
    return {
      Height: window.innerHeight + "px",
      banner: [], //轮播图
      iconList: [], //图标列表
      recommend: [], //商品推荐
      dailySelect: [], //每日精选
      xiaomiTV: [], //小米电视
      notebook: [], //小米笔记本
      starProduct: [], //明星单品
      newProduct: [], //新品上线
      AI: [], //米家智能
      others: [], //其他
      selectedId: 0,
      selectedName: "",
      items: [
        { label: "推荐", id: "recommend" },
        { label: "手机", id: "phone" },
        { label: "智能", id: "intelligence" },
        { label: "电视", id: "television" },
        { label: "笔记本", id: "notebook" },
        { label: "生活周边", id: "likeSurrounding" },
        { label: "家电", id: "appliances" }
      ],
      options: {
        activeColor: "#FF6B00"
        // 可在这里指定labelKey为你数据里文字对应的字段名
      },
      isNav: false //关闭或打开菜单
    };
  },
  mounted() {
    this.getBanner();
    this.getIconList();
    this.getRecommend();
    this.getDailySelect();
    this.getXiaoMiTV();
    this.getNotebook();
    this.getStarProduct();
    this.getNewProduct();
    this.getAI();
    this.getOthers();
    this._initBScroll();
  },
  methods: {
    _initBScroll() {
      console.log(this.$refs.index_wrap);
      this.indexWrap = new BScroll(this.$refs.index_wrap, {
        scrollY: true,
        click: true
      });
    },
    // 获取轮播图
    getBanner() {
      this.$axios.get("index/banner").then(res => {
        this.banner = res.data;
      });
    },
    // 获取图标列表
    getIconList() {
      this.$axios.get("index/icon").then(res => {
        this.iconList = res.data;
      });
    },
    // 获取商品推荐列表
    getRecommend() {
      this.$axios.get("index/recommend").then(res => {
        this.recommend = res.data;
      });
    },
    // 获取商品每日精选
    getDailySelect() {
      this.$axios.get("index/dailySelect").then(res => {
        this.dailySelect = res.data;
      });
    },
    // 获取商品小米电视
    getXiaoMiTV() {
      this.$axios.get("index/xiaomiTV").then(res => {
        this.xiaomiTV = res.data;
      });
    },
    // 获取商品小米笔记本
    getNotebook() {
      this.$axios.get("index/notebook").then(res => {
        this.notebook = res.data;
      });
    },
    // 获取明星单品列表
    getStarProduct() {
      this.$axios.get("index/starProduct").then(res => {
        this.starProduct = res.data;
      });
    },
    // 获取新品上线列表
    getNewProduct() {
      this.$axios.get("index/newProduct").then(res => {
        this.newProduct = res.data;
      });
    },
    // 获取米家智能列表
    getAI() {
      this.$axios.get("index/AI").then(res => {
        this.AI = res.data;
        console.log(res);
      });
    },
    // 获取其他商品列表
    getOthers() {
      this.$axios.get("index/others").then(res => {
        this.others = res.data;
      });
    },
    // 列表菜单
    navTab: function(e) {
      console.log(e.label);
      this.selectedName = e.label;
    },
    showNav: function() {
      this.isNav = !this.isNav;
      console.log(1, this.isNav);
    },
    // 跳转详情页并携带商品id
    jumpDetail: function(mid) {
      sessionStorage.setItem("mid", mid);
      this.$router.push({
        name: "detail",
        path: "/detail"
        // params:{mid}
      });
    }
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  }
};
</script>