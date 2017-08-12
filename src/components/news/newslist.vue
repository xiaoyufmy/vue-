<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue新闻资讯"></mt-header>
        </div>

        <ul class="mui-table-view">
            <li v-for="item in list" class="mui-table-view-cell mui-media">
                <router-link v-bind="{to:'newsinfo/' + item.id}">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis' v-text='item.zhaiyao'></p>
                        <div class="footer">
                            <span>发表时间:{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span class="click">点击数:{{item.click}}</span>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    import common from '../../kits/common.js';

    export default {
        data: function () {
            return {
                list: [

                ]
            }
        },
        created: function () {
            this.getnewslist()
        },
        methods: {
            getnewslist:function(){
                var url = common.apidomain + '/api/getnewslist';
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.list = data.message;
                })
            }
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
        position: absolute;
        z-index: 999;
        font-size: 50px;
    }

    .mui-table-view{
        font-size: 16px;
    }
    .mui-table-view img{
        height: 80px;
        width: 80px;
    }
    .mui-table-view .mui-media-object{
        max-width: 80px;
        line-height: 80px;
    }
    .footer{
        margin-top: 1.5em;
        font-size: 12px;
        color: #b4b4b4;
    }
    .footer .click{
        margin-left: 20px;
    }
    .mui-ellipsis{
        line-height: 26px;
        color: #6978ff;
        font-size: 14px;
    }
</style>