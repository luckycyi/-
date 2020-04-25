<template>
  <div class="shopcar">
    <div class="goods-list">
      <!-- 商品列表区 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 开关 -->
            <el-switch v-model="value[item.id]"
             @change="getStatus(item.id, value[item.id])" 
             active-color="#13ce66" 
             inactive-color="#ff4949"></el-switch>

            <!-- 图片 -->
            <img :src="item.thumb_path" alt />

            <!-- 商品名称和数量 -->
            <div class="info">
              <h4>{{ item.title }}</h4>
              <div>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click="remove(item.id, i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner settle">
          <div class="left">
            <p>总计 (不含运费)</p>
            <p>
              已勾选商品
              <span>{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件
              总价：
              <span>{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
            </p>
          </div>
          <el-button type="danger" size="medium">去结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_number.vue'
export default {
  data() {
    return {
      goodslist: [],
      value: this.$store.getters.getGoodsSelected
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(parseInt(item.id));
      });
      if (idArr.length <= 0) {
        return;
      }
      this.axios
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.data.status === 0) {
            this.goodslist = result.data.message;
          }
        })
        
    },
    remove(id, index) {
        this.goodslist.splice(index, 1)
        this.$store.commir('removeFormCar', id)
    },
    getStatus(id, flag) {
        this.$store.commit('updateGoodsSelected', { id, selected: flag })
    }
  },
  components: {
      numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar {
  background: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 60px;
      }
      h4 {
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 215px;
        .price {
          color: red;
          font-weight: bold;
        }
        div {
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
        }
      }
    }
  }
  .settle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>