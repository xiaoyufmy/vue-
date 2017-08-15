<template lang="html">
    <div id="infotemp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue商品详情"></mt-header>
        </div>

        <!--商品轮播图-->
        <div class="silder">
            <silder :imgs="imgs"></silder>
        </div>

        <!--实现商品购买区-->
        <div id="buy">
            <h4 v-text="info.title"></h4>
            <p class="line"></p>
            <ul>
                <li class="price">
                    市场价: <s>￥{{info.market_price}}</s>    销售价：<span>￥{{info.sell_price}}</span>
                </li>
                <li class="inputli">
                    购买数量： <inputnumber v-on:dataobj="getcount" class="inputnumber"></inputnumber>
                </li>
                <li>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small">加入购物车</mt-button>
                </li>
            </ul>
        </div>

        <div id="params">
            <h6>商品参数</h6>
            <p class="line"></p>
            <ul>
                <li>商品货号：：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}</li>
                <li>上架时间：{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
            </ul>
        </div>

        <!-- 图文详情-->
        <!-- 商品评论-->
        <div id="other">
            <router-link v-bind="{to:'/goods/goodsdesc/'+info.id}">
                <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodscomment/'+info.id}">
                <mt-button type="danger" size="large">商品评论</mt-button>
            </router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    import silder from '../subcom/silder.vue';
    import common from '../../kits/common.js';
    import inputnumber from '../subcom/inputNumber.vue';

    export default {
        components:{silder,inputnumber},
        data: function () {
            return{
                id:0,//商品id
                imgs:[],
                info:{}
            }
        },
        methods:{
            getimgs:function(){
                var url  = common.apidomain + '/api/getthumimages/'+this.id;
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.imgs = data.message;
                })
            },
            getinfo: function () {
                var url = common.apidomain +'/api/goods/getinfo/'+this.id;
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.info = data.message[0];
                })
            },
            getcount:function(count){
                this.inputNumberCount = count;
            },
        },
        created: function () {
            this.id = this.$route.params.id;
            this.getimgs();
            this.getinfo();
        }
    }
</script>

<style lang="css" scoped>

    .silder{
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
        margin: 5px;
    }

    #buy,#params,#other{
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
    .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
    #buy h4{
        color:#0094ff;
        padding: 5px;
    }
    #buy li,#params li{
        list-style: none;
        padding: 8px;
    }

    #buy .price span{
        color:red;
    }

    #other .imgdesc{
        margin-bottom: 20px;
    }
    .inputli{
        position: relative;
    }
    .inputnumber{
        position: absolute;
        left:100px;
        top:5px;
    }
</style>