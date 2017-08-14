<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue图片分享"></mt-header>
        </div>
        <div id="cate">
            <ul v-bind="{style:'width:'+ulWidth+'px'}">
                <li @click="getimages(0)">全部</li>
                <li v-for="item in cates" @click="getimages(item.id)">{{item.title}}</li>
            </ul>
        </div>

        <div id="imglist">
            <ul>
                <li v-for="item in list">
                    <img v-lazy="item.img_url">
                    <div id="desc">
                        <h5 v-text="item.title"></h5>
                        <p v-text="item.zhaiyao"></p>
                    </div>
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
                cates:[],
                ulWidth:320,
                list:[]
            }
        },
        methods: {
            getcates: function () {
                var url = common.apidomain + '/api/getimgcategory';
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.cates = data.message;

                    var width = 62;
                    var counts = data.message.length + 1;
                    this.ulWidth = width * counts;
                })
            },
            getimages: function (cateid) {
                cateid = cateid || 0;
                var url = common.apidomain + '/api/getimages/' + cateid;
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.list = data.message;
                })
            }
        },
        created: function () {
            this.getcates();
            this.getimages(0);//0表示获取全部图片
        }
    }
</script>

<style lang="css" scoped>
    .top a{
        float: left;
    }
    .top a.back {
        color: #fff;
        top: 7px;
        left: 5px;
        position: fixed;
        z-index: 999;
        font-size: 50px;
    }

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