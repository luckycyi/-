<template>
    <div class="news-container">
        <h5>{{ newsInfo.title }}</h5>
        <p class="mui-ellipsis">
            <span>发表时间: {{ newsInfo.add_time | dataFrom }}</span>
            <span>点击{{ newsInfo.click }}次</span>
        </p>

        <!-- 主要内容 -->
        <div class="content" v-html="newsInfo.content"></div>

        <!-- 评论子组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            newsInfo: {}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo() {
            this.$http.get('api/getnew/'+this.id)
                .then(result => {
                    console.log(result.body.message[0].content)
                    if(result.body.status === 0) {
                        this.newsInfo = result.body.message[0]
                    }
                })
                .catch((e) => {})
        }
    },
    components: {
        "comment-box": comment
    }
}
</script>

<style lang="scss" scoped>
    .news-container {
        overflow: hidden;
        padding: 5px;
        h5 {
            font-size: 16px;
            font-weight: 700;
            padding: 10px 0;
            color: red;
            text-align: center;
        }
        .mui-ellipsis {
            display: flex;
            justify-content:space-between;
            color: rgb(36, 155, 235);
        }
        .content {
            img {
                width: 100%;
            }
        }
    }
</style>