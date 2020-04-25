<template>
  <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' data-numbox-max='100'>
  <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
  <input class="mui-numbox-input" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly />
  <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {
        mui('.mui-numbox').numbox()
    },
    methods: {
        countChanged() {
            this.$store.commit('updateGoodsInfo', {
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        }
    },
    props: ['initcount','goodsid']
};
</script>

<style lang="scss" scoped>
</style>