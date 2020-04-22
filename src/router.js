import VueRouter from "vue-router"

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'

// home页面的路由跳转
import NewsList from './components/news/NewsList.vue'

// NewsList列表点击跳转到详情页面
import NewsInfo from './components/news/NewsInfo.vue'

// home页面图片分享
import PhotoList from './components/photo/PhotoList.vue'
import PhotoInfo from './components/photo/PhotoInfo.vue'

// home商品列表
import GoodsList from './components/goods/GoodsList.vue'


// 创建路由对象
var router = new VueRouter({
    routes: [
       { path: '/', redirect: '/home' },
       { path: '/home', component: HomeContainer },
       { path: '/member', component: MemberContainer },
       { path: '/search', component: SearchContainer },
       { path: '/shopcar', component: ShopcarContainer },
       { path: '/home/newslist', component: NewsList },
       { path: '/home/newslist/:id', component: NewsInfo },
       { path: '/home/photolist', component: PhotoList },
       { path: '/home/photolist/:id', component: PhotoInfo },
       { path: '/home/goodslist', component: GoodsList }
    ],
    linkActiveClass: 'mui-active'
})

export default router