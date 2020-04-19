import Vue from 'vue'

// 引入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入mint-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

// 清楚公共样式
import './css/index.css'

// 引入MUI框架 
import './lib/mui/css/mui.min.css'

// 引入bootstrap框架样式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'open-iconic/font/css/open-iconic-bootstrap.css'

// 引入路由模块
import router from './router.js'

// 引入页面模块
import app from './App.vue'

const vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    render: c => c(app),
    router
})