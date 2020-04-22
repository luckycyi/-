<template>
  <div>
    <!-- 顶部滚动区域 -->
    <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          :class="['mui-control-item', item.id == 0 ? ' mui-active' : '']"
          v-for="item in list"
          :key="item.id"
        >{{ item.title }}</a>
      </div>
    </div>

    <!-- 图片列表 -->
    <ul class="photo-list">
      <router-link v-for="item in cates" :key="item.add_time" :to="'/home/photolist/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="introduce">
          <h4 class="introduce-title">{{ item.title }}</h4>
          <p class="introduce-zhaiyao">{{ item.zhaiyao }}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 区域滚动事件需要格式化
import mui from "../../lib/mui/js/mui.js";

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      list: [],
      cates: []
    };
  },
  mounted() {
    //  如果在页面没有加载成功之前格式化，是补漆作用的
    // 需要在页面加载完成后的钩子函数中添加格式化代码
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllCategory();
    this.getPhotoId(0);
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.list = result.body.message;
        } else {
          Toast("读取分类失败！");
        }
      });
    },
    getPhotoId(cateID) {
      this.$http.get("api/getimages/" + cateID).then(result => {
        if (result.body.status === 0) {
          this.cates = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: none;
}
.photo-list {
  margin: 0;
  padding: 10px;
  list-style: none;
  padding-bottom: 0;
  li {
    box-shadow: 0 0 9px #666;
    margin-bottom: 10px;
    text-align: center;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .introduce {
      position: absolute;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: left;
      max-height: 105px;
      width: 100%;
      
      .introduce-title {
        width: 100%;
        font-size: 14px;
        overflow: hidden;//溢出隐藏
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .introduce-zhaiyao {
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style>