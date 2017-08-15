/**
 * Created by xiaoyu on 2017/8/9.
 */

import Vue from 'vue';

import App from './App.vue';

import vueRouter from 'vue-router';

Vue.use(vueRouter);

import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';

var router1 = new vueRouter({
    linkActiveClass : 'mui-active',
    routes : [
        {path: "/",redirect:"/home"},
        {path: '/home', component: home},
        {path: '/shopcar', component: shopcar},
        {path: '/news/newslist', component: newslist},
        {path: '/news/newsinfo/:id', component: newsinfo},
        {path: '/photo/photolist', component: photolist},
        {path: '/photo/photoinfo/:id', component: photoinfo},
        {path: '/goods/goodslist', component: goodslist},
        {path: '/goods/goodsinfo/:id', component: goodsinfo},
        {path: '/goods/goodsdesc/:id',component: goodsdesc},
        {path: '/goods/goodscomment/:id',component: goodscomment},
    ]
});

import 'mint-ui/lib/style.min.css'

import Mintui from 'mint-ui';

Vue.use(Mintui);

import '../statics/mui/css/mui.css';

import '../statics/css/site.css';

import vueResource from 'vue-resource';
Vue.use(vueResource);

import moment from 'moment';
Vue.filter('datefmt', function(input, fmtstring){
    return moment(input).format(fmtstring)
})

import VuePreview from 'vue-preview';
Vue.use(VuePreview);

new Vue({
    el:'#app',
    router:router1,
    render:c=>c(App)
});