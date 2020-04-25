import Vue from 'vue'

// 引入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入 vue-resource 获取ajax数据
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

var car = JSON.parse(localStorage.getItem('car') || '[]')
// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar(state, gsinfo) {
            var flag = false
            state.car.some(item => {
                if(item.id === gsinfo.id) {
                    item.count +=parseInt(gsinfo.count)
                    flag = true
                    return true
                }
            })

            if(!flag) {
                state.car.push(gsinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if(item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            state.car.some((item, i) => {
                if(item.id == id) {
                    state.car.splic(i, 1)
                    return
                }
            })
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if(item.id === info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters: {
        getAllCount(state) {
            console.log(state.car)
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id]=item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            console.log(o)
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if(item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

// 引入axios 
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// 设置请求根目录
// Vue.http.options.root = 'http://www.liulongbin.top:3005'
// Vue.http.options.emulateJSON = true
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'


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

// element-ui引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

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
import './lib/mui/js/mui.min.js'


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
    router,
    store
})