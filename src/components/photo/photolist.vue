<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue图片分享"></mt-header>
        </div>
        <!-- 图片分类 -->
        <div id="cate">
            <ul v-bind="{style:'width:'+ulWidth+'px'}">
                <li @click="getimages(0)">全部</li>
                <li v-for="item in cates" @click="getimages(item.id)">{{item.title}}</li>
            </ul>
        </div>

        <!-- 图片列表 -->
        <div id="imglist">
            <ul>
                <li v-for="item in list">
                    <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                        <img v-lazy="item.img_url">
                        <div id="desc">
                            <h5 v-text="item.title"></h5>
                            <p v-text="item.zhaiyao"></p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    import common from '../../kits/common.js';

    export default {
        data: function () {
            return{
                cates:[],//用来存储图片分类数据的数组
                ulWidth:320,
                list:[]//存储图片数据的数据
            }
        },
        methods: {
            getcates: function () {
                var url = common.apidomain + '/api/getimgcategory';
                this.$http.get(url).then(function(response){//调用$http的get方法获取数据
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.cates = data.message;//实现数据的赋值操作

                    //实现当前分类数据所在的ul的总宽度 = 分类个数 * 每个分类数据的宽度
                    var width = 62;// 每个li的宽度
                    var counts = data.message.length + 1;// 动态获取数据的长度 + 【全部】 = 总个数
                    this.ulWidth = width * counts;
                })
            },
            //加载图片数据
            getimages: function (cateid) {
                //如果方法的cateid参数没有传递，则默认是0,代表获取所有图片数据
                cateid = cateid || 0;
                var url = common.apidomain + '/api/getimages/' + cateid;//确定url
                this.$http.get(url).then(function(response){//ajax请求数据
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.list = data.message;//将数据复制给this.list
                })
            }
        },
        created: function () {
            this.getcates();//获取图片分类数据
            this.getimages(0);//加载图片数据  0表示获取全部数据
        }
    }
</script>

<style lang="css" scoped>

    #cate{
        width: 320px;
        max-width: 320px;
        overflow-x: auto;
    }
    #cate ul{
        margin:5px 0px 10px 0px;
        padding-left: 10px;
    }
    #cate li{
        cursor: pointer;
        list-style: none;
        display: inline-block;
        color: #7562fd;
        font-size: 14px;
        padding-left: 6px;
    }
    #imglist ul {
        padding-left: 0px;
        margin: 0;
    }
    #imglist li{
        list-style:none;
        position: relative ;
    }
    #imglist img{
        width:100%;
        height: 300px;
    }
    #desc{
        width: 100%;
        background-color: rgba(0,0,0,0.2);
        position: absolute;
        bottom: 2px;
        left: 0px;
        padding: 0 5px;
    }
    #desc h5{
        color: #ffffff;
        font-weight: bold;
    }
    #desc p{
        color:#fff;
    }
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>