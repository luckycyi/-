<template>
  <div>
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

    <!-- 6宫格 使用MUI框架-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newslist">
          <img src="/images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/photolist">
          <img src="/images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodslist">
          <img src="/images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="/images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="/images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="/images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'

export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.axios
        .get("api/getlunbo")
        .then(result => {
          if (result.data.status === 0) {
            this.lunbotuList = result.data.message;
          } else {
            Toast({
              message: "轮播加载失败...",
              position: "middle",
              duration: 3000
            });
          }
        })
        .catch(e => {});
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
.mui-grid-9 {
  background: #fff;
  border: none;
  img {
      width: 60px;
      height: 60px;
  }
    .mui-table-view-cell .mui-media-body{
        padding-top: 2px;
        font-size: 12px;
  }
  .mui-table-view-cell {
      border: none;
  }
}
</style>