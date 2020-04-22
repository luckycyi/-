<template>
  <div>
    <div class="container">
      <h3>{{ photoinfo.title }}</h3>
      <div class="container-list">
        <p class="times">发布时间：{{ photoinfo.add_time | dataFrom }}</p>
        <p class="clicks">点击: {{ photoinfo.click }}次</p>
      </div>

      <hr />

      <!-- 缩略图 -->
      <div class="thumbs">
        <vue-preview :slides="slide1" class="imgPrev"></vue-preview>
      </div>

      <!-- 内容区域 -->
      <div class="conetnt" v-html="photoinfo.content"></div>

      <hr />

      <!-- 伦伦区域 -->
      <box-comment :id="this.id"></box-comment>
    </div>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      slide1: []
    };
  },
  created() {
    this.getImgList();
    this.getThumImg();
  },
  methods: {
    getImgList() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        this.photoinfo = result.body.message[0];
      });
    },
    getThumImg() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.w = 600;   //设置以大图浏览时的宽度
            item.h = 400; 
            item.msrc = item.src
          });
          this.slide1 = result.body.message;
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "box-comment": comment
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  padding: 5px;
  h3 {
    width: 100%;
    margin: 0;
    padding: 10px 0;
    font-size: 16px;
    text-align: center;
    color: rgb(55, 111, 216);
    overflow: hidden;//溢出隐藏
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .container-list {
    display: flex;
    justify-content: space-between;
  }
  hr {
    margin: 0;
    border: 1px solid #ccc;
  }
  .conetnt {
    padding: 10px 0;
    line-height: 30px;
    font-size: 14px;
    text-indent: 2em;
  }
  .thumbs {
            /deep/ .my-gallery{   //deep深层作用选择器
                display: flex;
                flex-wrap:wrap;//默认换行
                figure{
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 8px #999;
                        vertical-align: middle;
                        border-radius: 5px;
                    }
                }
            }
        }
}
</style>