<template>
  <div class="goodslist">
    <ul class="goods">
      <router-link to="/home/goodslist/getdesc" class="goods-item" v-for="item in listP" :key="item.id">
        <img :src="item.img_url" alt />
        <h3>{{ item.title }}</h3>
        <div class="info">
          <p class="price">
            <span class="now">￥889</span>&nbsp;&nbsp;
            <span class="old">￥999</span>
          </p>
          <p class="hot">
            <span>热卖中</span>
            <span>剩下10件</span>
          </p>
        </div>
      </router-link>
    </ul>

    <div class="mui-content-padded">
      <ul class="mui-pager">
        <li class="mui-disabled">
          <a @click="DelPage">上一页</a>
        </li>
        <li>
          <a href="#" @click="addPage">下一页</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  data() {
    return {
      number: 1,
      listP: []
    };
  },
  created() {
    this.getGoodsPhoto();
  },
  mounted() {
    this.refresh();
  },
  methods: {
      addPage() {
          ++this.number
          this.getGoodsPhoto()
      },
       DelPage() {
           if(this.number === 0) {
               return 
           }
          --this.number
          this.getGoodsPhoto()
      },
    getGoodsPhoto() {
      this.$http.get("api/getgoods?pageindex=" + this.number).then(result => {
        if (result.body.status === 0) {
          this.listP = result.body.message;
        }
      });
    },
    refresh() {
      mui.init({
        swipeBack: true //启用右滑关闭功能
      });
      (function($) {
        $(".mui-pagination").on("tap", "a", function() {
          var li = this.parentNode;
          var classList = li.classList;
          if (
            !classList.contains("mui-active") &&
            !classList.contains("mui-disabled")
          ) {
            var active = li.parentNode.querySelector(".mui-active");
            if (classList.contains("mui-previous")) {
              //previous
              if (active) {
                var previous = active.previousElementSibling;
                console.log("previous", previous);
                if (previous && !previous.classList.contains("mui-previous")) {
                  $.trigger(previous.querySelector("a"), "tap");
                } else {
                  classList.add("mui-disabled");
                }
              }
            } else if (classList.contains("mui-next")) {
              //next
              if (active) {
                var next = active.nextElementSibling;
                if (next && !next.classList.contains("mui-next")) {
                  $.trigger(next.querySelector("a"), "tap");
                } else {
                  classList.add("mui-disabled");
                }
              }
            } else {
              //page
              active.classList.remove("mui-active");
              classList.add("mui-active");
              var page = parseInt(this.innerText);
              var previousPageElement = li.parentNode.querySelector(
                ".mui-previous"
              );
              var nextPageElement = li.parentNode.querySelector(".mui-next");
              previousPageElement.classList.remove("mui-disabled");
              nextPageElement.classList.remove("mui-disabled");
              if (page <= 1) {
                previousPageElement.classList.add("mui-disabled");
              } else if (page >= 5) {
                nextPageElement.classList.add("mui-disabled");
              }
            }
          }
        });
      })(mui);
    }
  }
};
</script>

<style lang="scss" scoped>
.goodslist {
  margin: 0;
  padding: 7px;
  .goods {
    margin: 0;
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 49%;
      border: 1px solid #ccc;
      max-height: 289px;
      box-shadow: 0 0 9px #666;
      margin-bottom: 7px;
      padding: 3px;
      img {
        width: 100%;
        height: 168.88px;
      }
      h3 {
        height: 50px;
        margin: 0;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 700;
        overflow: hidden; //溢出隐藏
        text-overflow: ellipsis;
        line-height: 20px;
      }
      .info {
        .now {
          font-size: 12px;
          color: red;
        }
        .old {
          font-size: 12px;
          text-decoration: line-through;
        }
        .hot {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>