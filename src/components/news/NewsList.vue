<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.add_time" id="item.id">
        <router-link :to="'/home/newslist/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h5>{{ item.title }}</h5>
           <p class="mui-ellipsis"><span>发表时间: {{ item.add_time | dataFrom }}</span><span>点击{{ item.click }}次</span></p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            newslist: []
        }
    },
    created(){
        this.getNewsList()
        
    },
    methods: {
        getNewsList() {
            this.axios.get('api/getnewslist')
            .then(result => {
                if(result.data.status === 0) {
                    this.newslist = result.data.message
                }else{
                    TOast('读取新闻列表失败!')
                }
            })
            .catch((e) => {})
        }
    }
};
</script>

<style lang="scss" scoped>
    .mui-table-view {
        h5 {
            font-size: 14px;
            color: black;
        }
        .mui-ellipsis {
            font-size: 12px;
            color: #3f44ce;
            display: flex;
            justify-content: space-between;
        }
    }
</style>