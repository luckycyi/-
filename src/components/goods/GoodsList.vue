<template>
  <div class="goodslist">
    <ul class="goods">
      <li class="goods-item" v-for="item in listP" :key="item.id" @click="goDetail(item.id)">
        <img :src="item.img_url" alt />
        <h3>{{ item.title }}</h3>
        <div class="info">
          <p class="price">
            <span class="now">￥{{ item.sell_price }}</span>&nbsp;&nbsp;
            <span class="old">￥{{ item.market_price }}</span>
          </p>
          <p class="hot">
            <span>热卖中</span>
            <span>剩下{{ item.stock_quantity }}件</span>
          </p>
        </div>
      </li>
    </ul>
    <mt-button type="primary" size="large" plain @click="addPage">加载更多...</mt-button>
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
  methods: {
      addPage() {
          ++this.number
          this.getGoodsPhoto()
      },
      getGoodsPhoto() {
      this.axios.get("api/getgoods?pageindex=" + this.number).then(result => {
        if (result.data.status === 0) {
          this.listP = this.listP.concat(result.data.message)
        }
      })
    },
    goDetail(id) {
        this.$router.push({ name: 'goodsinfo', params: { id }})
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