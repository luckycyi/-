<template>
    <div class="comment-module">
        <h3>发表评论</h3>
        <textarea name="" id="" cols="30" rows="5" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    <span>第 {{ i+1 }} 楼用户: {{ item.user_name }}</span>
                    <span>发布时间：{{ item.add_time | dataFrom }}</span>
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，什么都没说' : item.content }}
                </div>
            </div>
        </div>
         <mt-button type="danger" size="large" plain @click="getMore">加载更多...</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            pageIndex: 1,
            comments: [],
            msg: ''
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments() {
            this.$http.get("api/getcomments/"+ this.id +"?pageindex=" + this.pageIndex)
                .then(result => {
                    if(result.body.status === 0) {
                        this.comments = this.comments.concat(result.body.message)
                    } else {
                        Toast('获取数据失败！')
                    }
                })
        },
        getMore() {
            this.pageIndex++
            this.getComments()
        },
        postComment() {
            
            if(this.msg.trim().length === 0) {
                return Toast('请输入内容!')
            }
            this.$http.post('api/postcomment/'+ this.$route.params.id, {
                content: this.msg.trim()
            })
            .then(result => {
                if(result.body.status === 0) {
                    let cmt = {
                        user_name: "匿名函数",
                        add_time: Date.now(),
                        content: this.msg.trim()
                    }
                    this.comments.unshift(cmt)
                    this.msg = ""
                }
            })
            .catch((e) => {})
                
        }
    },
    props: ["id"]
}
</script>

<style lang="scss" scoped>
    .comment-module {
        padding: 0 3px;
        h3 {
            font-size: 22px;
            font-weight: 700;
            padding: 10px 0;
            border-bottom: 2px solid #ccc;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                div {
                    padding: 8px 5px;
                    background-color: #ccc;
                }
                .cmt-body {
                     background-color: #fff;
                     padding-left: 10px;
                     font-size: 16px;
                }
                .cmt-title {
                    display: flex;
                    justify-content: space-between;
                }
            }

        }
    }
</style>