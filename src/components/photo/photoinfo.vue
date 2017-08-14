<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue图片详情"></mt-header>
        </div>

        <div id="desc">
            <div class="title">
                <h4 v-text="photoinfo.title"></h4>

                <p>{{ photoinfo.add_time | datefmt('YYYY-MM-DD') }} {{photoinfo.click}}次浏览</p>

                <div class="line"></div>
            </div>

            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/news/newslist">
                            <span class="mui-icon mui-icon-home"></span>

                            <div class="mui-media-body">新闻资讯</div>
                        </router-link>
                    </li>

                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/photo/photolist">
                            <span class="mui-icon mui-icon-email"></span>

                            <div class="mui-media-body">图片分享</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/goods/goodslist">
                            <span class="mui-icon mui-icon-chatbubble"></span>

                            <div class="mui-media-body">商品购买</div>
                        </router-link>

                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/feedback">
                            <span class="mui-icon mui-icon-location"></span>

                            <div class="mui-media-body">留言反馈</div>
                        </router-link>

                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/vide">
                            <span class="mui-icon mui-icon-search"></span>

                            <div class="mui-media-body">视频专区</div>
                        </router-link>

                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/callme">
                            <span class="mui-icon mui-icon-phone"></span>

                            <div class="mui-media-body">联系我们</div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <p v-html="photoinfo.content"></p>
        </div>
        <comment :id="id"></comment>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    import common from '../../kits/common.js';
    import comment from '../subcom/comment.vue';

    export default {
        components: {
            comment
        },
        data: function () {
            return {
                id: 0,
                photoinfo: {
                    "id": 42,
                    "title": "100平米田园雅居三口之家 自然舒适空间",
                    "click": 0,
                    "add_time": "2015-04-18T04:55:58.000Z",
                    "content": "设计师认为田园风格几乎可以等同于乡村风格。所以作为田园风格的载体——乡村。由于比城市更贴近原始自然环境，而居住在乡村里的人们的生活方式淳朴，生性豁达率性，心理压力小。所以在现今日益发达的城市中，因为繁杂喧闹并且污染越来越严重的城市环境和快速的生活节奏，繁忙的工作压力。使得现代的城市人将羡慕的眼光投向了曾经不屑的乡村。他们重新开始对乡村生活方式感到好奇或向往。"
                }
            }
        },
        methods: {
            getinfo: function () {
                var url = common.apidomain + '/api/getimageInfo/' + this.id;
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.photoinfo = data.message;
                })
            }
        },
        created: function () {
            this.id = this.$route.params.id;
            this.getinfo();
        }
    }
</script>

<style lang="css" scoped>
    .top a {
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

    /*图片详情样式*/
    #desc {
        padding: 10px;
    }

    #desc .title h4 {
        color: #0094ff;
    }

    #desc .title p {
        color: rgba(0, 0, 0, 0.4);
        margin-top: 10px;
    }

    #desc .title .line {
        width: 100%;
        height: 1px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    }

    .mui-content, .mui-content ul {
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border-right: 0px;
        border-bottom: 0px;
    }

    .mui-grid-view.mui-grid-9 {
        border-top: 0px;
        border-left: 0px;
    }
</style>