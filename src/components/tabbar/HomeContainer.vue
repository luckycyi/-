<template>
  <div>
    <!-- 使用轮播图 使用 Mint-ui -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 6宫格 使用MUI框架-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newslist">
          <img src="/images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="/images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="/images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </a>
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
      this.$http
        .get("api/getlunbo")
        .then(result => {
          if (result.body.status === 0) {
            this.lunbotuList = result.body.message;
            console.log(this.lunbotuList);
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
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: pink;
    }
    &:nth-child(3) {
      background-color: blue;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
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