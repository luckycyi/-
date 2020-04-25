<template>
  <div class="introduce">
    <h1>{{ list.title }}</h1>

    <hr />

    <div class="content" v-html="list.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {}
    };
  },
  created() {
    this.getDesc();
  },
  methods: {
    getDesc() {
      this.axios
        .get("api/goods/getdesc/" + this.$route.params.id)
        .then(result => {
          if (result.data.status === 0) {
            this.list = result.data.message[0];
          }
        });
    }
  }
};
</script>

<style lang="scss">
.introduce {
  margin: 0;
  padding: 0 5px;
  h1 {
    font-size: 16px;
    color: #409ed4;
    text-align: center;
    margin: 0;
    padding: 10px;
  }
  hr {
    border: 1px solid #ccc;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>