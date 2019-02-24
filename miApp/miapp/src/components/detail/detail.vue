<template>
  <div class="container">
    <div v-if="mid>0" ref="detail_wrap" :style="{height:Height}" class="overHide" style="margin-top:70px;">
      <div>
        <!-- 返回and分享组件-start -->
        <div class="back display between alignItem w100">
          <a @click="previous">
            <img class="w80 h80" src="../../assets/images/detail/arrow_left.png" alt>
          </a>
          <a>
            <img class="w80 h80" src="../../assets/images/detail/share.png" alt>
          </a>
        </div>
        <!-- 返回and分享组件-end -->
        <!-- 轮播图组件-start -->
        <mt-swipe :auto="0" style="height:400px;">
          <mt-swipe-item v-for="item in details.banner" :key="item.id">
            <img class="w100 h100" v-lazy="item.pic" alt>
          </mt-swipe-item>
        </mt-swipe>
        <!-- 轮播图组件-end -->
        <!-- 商品简介-start -->
        <div class="about w95 auto">
          <p class="about-title">{{content.title}}</p>
          <p class="about-subtitle">
            <span>{{content.discounts}}</span>
            {{content.subtitle}}
          </p>
          <p class="price">
            <span class="new-price">￥{{new_price}}</span>
            <span class="past-price" v-if="past_price">￥{{past_price}}</span>
          </p>
        </div>
        <!-- 商品简介-end -->
        <!-- 关键参数-start -->
        <div class="overHide w100" style ref="paramDiv">
          <ul class="display content param" style="white-space: nowrap;width:715px">
            <li class="param-item" v-for="item in details.icons" :key="item.id">
              <img v-lazy="item.pic" alt>
              <span class="param-title">超大屏</span>
              <span class="param-subtitle">6.26英寸</span>
            </li>
          </ul>
        </div>
        <!-- 关键参数-end -->
        <!-- 促销 -->
        <ul class="card w95">
          <li class="card-item">
            <span class="card-item-classify">促销</span>
            <span class="card-item-gift">
              <a>赠品</a>
            </span>
            <span class="card-item-content">赠米粉卡，最高含100元话费</span>
            <span class="card-arrow-right"></span>
          </li>
        </ul>
        <!-- 换机 -->
        <ul class="card w95">
          <li class="card-item">
            <span class="card-item-classify">换机</span>
            <span class="card-item-content colorE27832">高价回收，极速到账换新机</span>
            <span class="card-arrow-right"></span>
          </li>
        </ul>
        <!-- 已选 送至 -->
        <ul class="card w95">
          <li class="card-item" @click="selectProduct">
            <span class="card-item-classify">已选</span>
            <span class="card-item-content">{{title}}</span>
            <span class="card-arrow-right"></span>
          </li>
          <li class="card-item">
            <span class="card-item-classify">送至</span>
            <span class="card-item-content">北京市 东城区</span>
            <span class="cashSale colorE27832">有现货</span>
            <span class="card-arrow-right"></span>
          </li>
          <li class="card-item">
            <span class="card-item-commitment">
              <img src="../../assets/icon.png" alt>
              小米自营
            </span>
            <span class="card-item-commitment">
              <img src="../../assets/icon.png" alt>
              小米发货
            </span>
            <span class="card-item-commitment">
              <img src="../../assets/icon.png" alt>
              7天无理由退货
            </span>
            <span class="card-arrow-right"></span>
          </li>
        </ul>
        <!-- 评论-start -->
        <div ref="comment" class="w100 overHide" v-if="details">
          <ul class="comment display" style="width:1580px">
            <li class="comment-item" v-for="item in details.comment" :key="item.id">
              <div class="userInfo display between alignItem">
                <!-- 用户头像 昵称 评论时间 -->
                <div class="display">
                  <img class="userPhoto" v-lazy="item.avatar" alt>
                  <p class="display column" style="line-height:1.3;margin-top:5px;">
                    <span class="userName">{{item.uname}}</span>
                    <span class="comment-time">{{item.time}}</span>
                  </p>
                </div>
                <!-- 用户赞数 -->
                <div class="userLike">
                  <img src="../../assets/like.png" alt>
                  <span>{{item.likeCount}}</span>
                </div>
              </div>
              <div class="comment-item-content">{{item.content}}</div>
              <div class="comment-item-imgs">
                <img v-lazy="item.pic1" alt>
                <img v-lazy="item.pic2" alt>
                <img v-lazy="item.pic3" alt>
              </div>
              <div class="comment-item-reply">
                <span class="replyName" v-if="item.reply">官方回复：</span>
                {{item.reply}}
              </div>
            </li>
          </ul>
          <!-- 更多评论 -->
          <p class="moreComment">更多评论▶</p>
        </div>
        <!-- 评论-end -->
        <!-- 商品参数图片-start -->
        <ul class="paramsImg">
          <li v-for="item in details.paramImg" :key="item.id">
            <img class="w100 h100" v-lazy="item.pic" alt>
          </li>
        </ul>

    
        
      </div>
          <!-- 选择商品下侧弹出窗 -->
        <div class="selectProduct w100 h100" v-if="isSpec">
          <div class="select-content w100 h80">
            <!-- 关闭按钮 -->
            <div class="close" @click="closeSpec">
              <img class="w100 h100" src="../../assets/images/detail/close.png" alt>
            </div>
            <!-- 图片 and 商品内容 -->
            <div class="product-content display alignItem">
              <div>
                <img src="../../assets/images/detail/banner/1.png" class="w100 h100" alt>
              </div>
              <div class="display column">
                <p>
                  <span class="new-price">￥{{details.optionSize[active].new_price}}</span>
                  <span
                    class="past-price"
                    v-if="details.optionSize[active].past_price"
                  >￥{{details.optionSize[active].past_price}}</span>
                </p>
                <p>
                  {{content.title}}
                  <span style="margin:0 8px">{{details.optionSize[active].title}}</span>
                  {{details.optionColor[activeColor].color}}
                </p>
              </div>
            </div>
            <!-- 版本 -->
            <div class="versions border-bottom">
              <p>版本</p>
              <p
                class="version-item display between"
                :class="active==index?'active':''"
                @click="changeBGC($event,index)"
                v-for="(item,index) in details.optionSize"
                :key="item.id"
                :data-new_price="item.new_price"
              >
                <span>{{item.title}}</span>
                <span>{{item.new_price}}</span>
              </p>
            </div>
            <!-- 颜色 -->
            <div class="selectColor border-bottom">
              <p>颜色</p>
              <p class="selectColor-item">
                <span
                  v-for="(item,index) in details.optionColor"
                  :key="item.id"
                  :class="activeColor==index? 'active':''"
                  @click="changeColor(index)"
                >{{item.color}}</span>
              </p>
            </div>
            <!-- 购买数量 -->
            <div class="quantity display between alignItem border-bottom">
              <p>购买数量</p>
              <!-- <p class="display quantity-item"> -->
              <div
                class="mui-numbox"
                style="margin-bottom:10px"
                data-numbox-min="0"
                data-numbox-max="100"
              >
                <button class="mui-btn mui-numbox-btn-minus" @click="btn_minute" type="button">-</button>
                <input class="mui-numbox-input" type="number" v-model="selectNum">
                <button class="mui-btn mui-numbox-btn-plus" type="button" @click="btn_add">+</button>
              </div>
              <!-- </p> -->
            </div>
            <!-- 加入购物车 -->
            <div class="confirmAdd w90 display alignItem center" @click="addCart($event)">加入购物车</div>
          </div>
        </div>

        <!-- 商品参数图片-end -->
      <!-- 底部加入购物车 -->
        <footer class="w95 display between alignItem">
          <div class="alignItem display footer-item">
            <router-link to="/" class="display column alignItem" style="color:#A9A9A9">
              <span style="font-size:25px;" class="mui-icon iconfont icon-shouye"></span>
              <span style="font-size:12px;" class="mui-tab-label">首页</span>
            </router-link>
            <router-link to="/cart" class="display column alignItem" style="color:#A9A9A9">
              <span style="font-size:25px;" class="mui-icon iconfont icon-gouwuche"></span>
              <span style="font-size:12px;" class="mui-tab-label">购物车</span>
            </router-link>
          </div>
          <div class="addCart" @click="selectProduct">加入购物车</div>
        </footer>
    </div>
    <div v-else style="text-align:center">此商品暂无数据
      <br>
      <br>
      <span @click="routerGo" style="padding:10px 20px;border:1px solid red;">返回首页！</span>
    </div>
  </div>
</template>
<style scoped>
@import "../../assets/css/detail.css";
.container {
  background-color: white;
  height: 100%;
  padding-bottom: 60px;
}
* {
  touch-action: pan-y;
}
.mint-msgbox {
  z-index: 99999999 !important;
}
</style>
<script>
import { MessageBox, Swipe, SwipeItem, Toast } from "mint-ui";
import BScroll from "better-scroll";
import qs from "qs";
export default {
  data() {
    return {
      Height: window.innerHeight + "px",
      ulWidth: 530,
      isSpec: false, //是否显示选择规格页面
      // mid: this.$route.params.mid,
      mid: sessionStorage.getItem("mid"),
      details: [],
      content: {},
      // 版本选择默认第一个
      active: 0,
      // 颜色选择默认第一个
      activeColor: 0,
      // 购买数量 默认为1
      selectNum: 1,
      new_price: "",
      past_price: "",
      title: ""
    };
  },
  created() {
    this.$axios.get("detail/?mid=" + this.mid).then(res => {
      console.log(res);
      this.details = res.data;
      console.log(this.details);
      this.content = res.data.content[0];
      this.new_price = res.data.optionSize[0].new_price;
      this.past_price = res.data.optionSize[0].past_price;
      this.title =
        res.data.content[0].title +
        " " +
        res.data.optionSize[this.active].title +
        " " +
        res.data.optionColor[this.activeColor].color;
    });
  },
  mounted() {
    let detailWrap = new BScroll(this.$refs.detail_wrap,{
      scrollY:true,
      click:true
    })
    console.log("mid:" + this.mid);
    let paramDiv = this.$refs.paramDiv;
    const params = new BScroll(paramDiv, {
      scrollX: true
    });

    let comments = this.$refs.comment;
    const comment = new BScroll(comments, {
      scrollX: true
    });
  },
  methods: {
    // 无数据返回首页
    routerGo() {
      this.$router.push({
        path: "/"
      });
    },
    // 加入购物车
    addCart(e) {
      let title = this.content.title;
      let param = this.details.optionSize[this.active];
      let color = this.details.optionColor[this.activeColor].color;
      let uid = sessionStorage.getItem("uid");
      if (uid === null) {
        MessageBox.confirm("", {
          message: "未登录，是否前往登录？",
          title: "提示",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }).then(action => {
          if (action == "confirm") {
            this.$router.push({ name: "login" });
            sessionStorage.setItem('jump','/detail')
          }
        });
      } else {
        console.log(1);
        this.$axios
          .post(
            "cart/addCart",
            qs.stringify({
              uid: uid,
              mid: this.mid,
              cart_price: param.new_price,
              cart_pic: this.details.banner[0].pic,
              cart_title: title,
              cart_count: this.selectNum
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.isSpec = false;
              Toast("添加购物车成功");
            }
          });
      }
      console.log(uid, title, param.new_price, param.title, this.selectNum);
    },
    // 购买数量 -
    btn_minute() {
      if (this.selectNum < 2) {
        console.log("最小为1");
      } else {
        this.selectNum -= 1;
      }
    },
    // 购买数量 +
    btn_add() {
      if (this.selectNum > 98) {
        this.selectNum = 99;
        console.log("最大数量为99");
      } else {
        this.selectNum += 1;
      }
    },
    // 选择版本并高亮显示
    changeBGC(e, index) {
      console.log(e);
      this.active = index;
      this.new_price = this.details.optionSize[index].new_price;
      this.past_price = this.details.optionSize[index].past_price;
    },
    // 选择颜色并高亮显示
    changeColor(index) {
      this.activeColor = index;
    },
    // 关闭选择规格
    closeSpec() {
      this.isSpec = false;
    },
    // 选择商品显示
    selectProduct() {
      this.isSpec = true;
    },
    // 返回按钮
    previous: function() {
      this.$router.go(-1);
    }
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  }
};
</script>