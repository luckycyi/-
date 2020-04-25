<template>
  <div class="container">
      <!-- 小球 -->
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
          <div class="ball" v-show="ballFag" ref="ball"></div>
      </transition>

    <div class="goodsinfo-container">
      <div class="mui-card">
        <div class="mui-card-content">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-header">{{ goodsinfo.title }}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>
              <span class="old">市场价: ¥{{ goodsinfo.market_price }}</span> &nbsp; &nbsp;
              <span class="now">销售价: ¥{{ goodsinfo.sell_price }}</span>
            </p>
            <p>
              购买数量: &nbsp;
              <el-input-number v-model="num" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
            </p>
            <p>
              <el-button type="primary" size="medium">立即购买</el-button>
              <el-button type="danger" size="medium" @click="addToCar">加入购物车</el-button>
            </p>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品编号:  {{ goodsinfo.goods_no }}</p>
            <p>库存情况:  {{ goodsinfo.stock_quantity }}件</p>
            <p>商家时间:  {{ goodsinfo.add_time | dataFrom }}</p>
          </div>
          <div class="mui-card-footer">
            <el-button type="primary" plain size="medium" @click="goDec(id)">图文介绍</el-button>
            <el-button type="danger" plain size="medium" @click="goComment(id)">商品评论</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      num: 1,
      ballFag: false,
    };
  },
  created() {
    this.getSwipt();
    this.getData();
  },
  methods: {
    getSwipt() {
      this.axios.get("api/getthumimages/" + this.id).then(result => {
        if (result.data.status === 0) {
          result.data.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.data.message;
        }
      });
    },
    getData() {
      this.axios.get("api/goods/getinfo/" + this.id).then(result => {
        this.goodsinfo = result.data.message[0];
        console.log(this.goodsinfo)
      });
    },
    handleChange(value) {
      console.log(value)
    },
    goDec(id) {
        this.$router.push({ name: 'goodsdesc', params: { id }})
    },
    goComment(id) {
        this.$router.push({ name: 'goodscomment', params: { id }})
    },
    addToCar() {
        this.ballFag = !this.ballFag

        var gsinfo = {
          id: this.id,
          count: this.num,
          price: this.goodsinfo.sell_price,
          selected: true
        }

        this.$store.commit('addToCar', gsinfo)
    },
    beforeEnter(el) {
        el.style.transform = "translate(0, 0)"
    },
    enter(el, done) {
        el.offsetHeight
        const ballPosition = this.$refs.ball.getBoundingClientRect()
        const badgePosition = document.getElementById('badge').getBoundingClientRect()

        const x = badgePosition.left - ballPosition.left
        const y = badgePosition.top - ballPosition.top


        el.style.transform = `translate(${x}px, ${y}px)`
        el.style.transition = "all 1s cubic-bezier(.79,-0.01,.43,1.09)"
        done()
    },
    afterEnter(el) {
        this.ballFag = !this.ballFag
    },
    getSelectedCount(count) {
        this.num = count
        console.log(this.num)
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  overflow: hidden;
  background: #eee;
  color: #000;
  .mui-card {
    overflow: hidden;
    .mui-card-header {
      width: 100%;
      text-align: left;
      font-size: 18px;
    }
    .old {
        text-decoration: line-through;
        font-weight: 500;
    }
    .now {
        color: red;
        font-weight: 500;
    }
  }
  .mui-card-footer {
    display: block;
    text-align: center;
    button {
      margin: 5px 0;
      width: 100%;
    }
  }
  .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      top: 383px;
      left: 170px;
  }
}
</style>