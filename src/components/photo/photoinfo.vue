<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue图片详情"></mt-header>
        </div>

        <!--实现的是图片详情和缩略图-->
        <div id="desc">
            <!--图片详情- 标题部分-->
            <div class="title">
                <h4>{{photoinfo.title}}</h4>
                <p>
                    {{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}  {{photoinfo.click}}次浏览
                </p>
                <p class="line"></p>
            </div>

            <!--缩略图-->
            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li  v-for="(item, index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, list)">
                    </li>
                </ul>
            </div>

            <!--图片详情- 摘要部分-->
            <p v-html="photoinfo.content"></p>
        </div>

        <!--集成评论组件-->
        <div id="comment">
            <comment :id="id"></comment>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    //导入评论组件
    import {Toast} from 'mint-ui';
    import common from '../../kits/common.js';
    import comment from '../subcom/comment.vue';

    export default {
        components: {
            comment//注册评论组件
        },
        data: function () {
            return {
                id: 0,
                photoinfo: {
                    //"id": 42,
                    //"title": "100平米田园雅居三口之家 自然舒适空间",
                    //"click": 0,
                    //"add_time": "2015-04-18T04:55:58.000Z",
                    //"content": "设计师认为田园风格几乎可以等同于乡村风格。所以作为田园风格的载体——乡村。由于比城市更贴近原始自然环境，而居住在乡村里的人们的生活方式淳朴，生性豁达率性，心理压力小。所以在现今日益发达的城市中，因为繁杂喧闹并且污染越来越严重的城市环境和快速的生活节奏，繁忙的工作压力。使得现代的城市人将羡慕的眼光投向了曾经不屑的乡村。他们重新开始对乡村生活方式感到好奇或向往。"
                },
                list:[
                    /*{
                        src:"https://placekitten.com/600/400",
                        w:600,
                        h:400
                    },
                    {
                        src:"https://placekitten.com/1200/900",
                        w:1200,
                        h:900
                    }*/
                ]
            }
        },
        methods: {
            //获取图片想起描述数据
            getinfo: function () {
                var url = common.apidomain + '/api/getimageInfo/' + this.id;
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.photoinfo = data.message[0];//将正常的逻辑数据赋值给this.photoinfo对象
                })
            },
            getimgs: function () {
                var url = common.apidomain + '/api/getthumimages/' + this.id;
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    data.message.forEach(function (item) {
                        item.h = 300;
                        item.w = 300;
                    })
                    this.list = data.message;//将正常的逻辑数据赋值给this.list对象
                })
            }
        },
        created: function () {
            this.id = this.$route.params.id;
            this.getinfo();//ajax请求图片的详情数据
            this.getimgs()
        }
    }
</script>

<style lang="css" scoped>

    /*图片详情样式*/
    #desc {
        padding: 10px;
    }

    #desc .title h4 {
        font-size: 16px;
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
    .mui-table-view-cell{
        float: left;
    }
    .mui-grid-view.mui-grid-9 {
        border-top: 0px;
        border-left: 0px;
    }

    .mui-content img{
        width: 100px;
        height: 100px;
    }
</style>