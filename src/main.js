import Vue from 'vue'

// 引入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入 vue-resource 获取ajax数据
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 设置请求根目录
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

//引入格式化时间的插件
import moment from 'moment'
// 定义全局的时间过滤器
Vue.filter('dataFrom', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") { 
    return moment(dataStr).format(pattern)
 }) 

// 引入mint-ui组件
// import { Header, Swipe, SwipeItem, Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button);
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.min.css'

// defalut install
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 清楚公共样式
import './css/index.css'

// 引入MUI框架 
import './lib/mui/css/mui.min.css'

// 引入bootstrap框架样式
import 'bootstrap/dist/css/bootstrap.min.css'

// 引入路由模块
import router from './router.js'

// 引入页面模块
import app from './App.vue'

const vm = new Vue({
    el: '#app',
    data: {},
    methods: {
    },
    render: c => c(app),
    router
})