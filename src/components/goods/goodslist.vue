<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue商品列表"></mt-header>
        </div>

        <div id="mui-content" class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view">
                <li v-for="item in list" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">{{item.title}}</div>
                        <div class="desc">
                            <p>
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </p>
                            <p>
                            <h6 class="left">热卖中</h6>
                            <h6 class="right">剩余{{item.stock_quantity}}件</h6>
                            </p>
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
                list:[
                    /*{
                        "id": 87,
                        "title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
                        "add_time": "2015-04-19T16:51:03.000Z",
                        "zhaiyao": "荣耀6 Plus，该机型分为两款型号，分别为PE-",
                        "click": 0,
                        "img_url": "http://http://webhm.top:8899/upload/201504/20/thumb_201504200046589514.jpg",
                        "sell_price": 2195,
                        "market_price": 2499,
                        "stock_quantity": 60
                    }*/
                ]
            }
        },
        methods:{
            getlist: function () {
                var url = common.apidomain + '/api/getgoods?pageindex=1';
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.list = data.message;//将正常的逻辑数据赋值给this.list对象
                })
            }
        },
        created: function () {
            this.getlist();
        }
    }
</script>

<style lang="css" scoped>

    #mui-content li{
        border: 1px solid rgba(0,0,0,0.4);
        -webkit-box-shadow: 0 0 4px #000;
        -moz-box-shadow: 0 0 4px #000 ;
        box-shadow: 0 0 4px #000 ;
        margin-left: 4px;
        padding-left: 0px;
    }

    #mui-content .mui-media-body{
        color: #0094ff;
    }

    #mui-content .desc{
        height: 60px;
        background-color: rgba(0,0,0,0.1);
        margin-top: 10px;
        padding: 5px;
        text-align: left;
    }
    #mui-content .desc span{
        color: red;
        margin-right: 15px;
    }
    #mui-content a{
        padding-left: 0px;
        margin-left: 0px;
    }

    #mui-content .desc .right{
        position: absolute;
        right: 10px;
        bottom: 0px;
    }

    #mui-content .desc .left{
        position: absolute;
        left: 10px;
        bottom: 0px;
    }
</style>