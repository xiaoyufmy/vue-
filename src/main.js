/**
 * Created by xiaoyu on 2017/8/9.
 */
/*
var v1 = document.querySelector('#v1');
var v2 = document.querySelector('#v2');
var bt = document.querySelector('#bt');
var res = document.querySelector('#res');

require('../statics/css/site.css');
require('../statics/mui/css/icons-extra.css');
require('../statics/css/site1.scss');
require('../statics/css/site2.less');

import '../statics/css/site.css';

import addObj from './calc.js';

bt.onclick=function(){
    var v1value = parseFloat(v1.value);
    var v2value = parseFloat(v2.value);
    var add = require('./calc.js');

    res.value = add(v1value,v2value);
}*/


import Vue from 'vue';

import App from './App.vue';

import vueRouter from 'vue-router';

Vue.use(vueRouter);


import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';

var router1 = new vueRouter({
    linkActiveClass : 'mui-active',
    routes : [
        {path : '/home', component: home},
        {path: '/shopcar', component: shopcar},
        {path: '/news/newslist', component: newslist},
        {path: '/news/newsinfo/:id', component: newsinfo}
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

new Vue({
        el:'#app',

        router:router1,

        render:c=>c(App)
});