<template lang="html">
    <div class="temp">
        <div class="row" v-for="(item,index) in datalist">
            <mt-switch class="switch" v-model="value[index]"></mt-switch>
            <img class="img" :src="item.thumb_path" alt="商品图片" >
            <div class="inforight">
                <h4 v-text="item.title"></h4>
                <div class="bottom">
                    <ul>
                        <li>￥{{item.sell_price}}</li>
                        <li><carinputnumber :initCount="item.cou" :goodsid="item.id" v-on:cardataobj="getiInputNumber"></carinputnumber></li>
                        <li><a href="javascript:void(0)" @click="delrow(item.id,index)">删除</a></li>
                    </ul>

                </div>
            </div>
        </div>

        <div id="total">
            <div class="desc">
                <ul>
                    <li>总计（不含运费）</li>
                    <li>已勾选商品{{totalcount}}件,总价:￥{{totalAmount}}元</li>
                </ul>
            </div>
            <div id="button">
                <mt-button  type="danger" size="small">去结算</mt-button>
            </div>
        </div>

        <!--{{value}}-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {getgoodsObject,updateData,removeItem} from '../../kits/localStorage.js';
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';
    import carinputnumber from '../subcom/carinputNumber.vue';

    export default {
        components:{
            carinputnumber
        },
        computed:{
            totalcount(){
                var trueArr =  this.value.filter(function(item){return item;});
                //当前商品的购买数量 * 商品的单价 （其中两个值均从this.datalist中来）
                var amount = 0;
                this.value.forEach((item,index) =>{
                    if(item){
                        var count = this.datalist[index].cou;
                        var price = this.datalist[index].sell_price;
                        var itemamount =   count * price;
                        amount += itemamount;
                    }
                });

                this.totalAmount = amount;
                return trueArr.length;
            }
        },
        data: function () {
            return{
                value:[],
                datalist:[
                    /*{
                        "cou": 1,
                        "id": 87,
                        "title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
                        "sell_price": 2195,
                        "thumb_path": "http://www.webhm.top:8080/upload/201504/20/thumb_201504200046594439.jpg"
                    }*/
                ],
                totalAmount:0
            }
        },
        methods:{
            //http://182.254.146.100:8899/api/goods/getshopcarlist/id
            getdatalist: function () {
                var obj = getgoodsObject();
                var idstring = '';
                for(var key in obj){
                    idstring+= key + ',';
                }
                idstring = idstring.substring(0,idstring.length-1);
                var url  = common.apidomain + '/api/goods/getshopcarlist/'+idstring;
                this.$http.get(url).then(function(response){
                    if(response.body.status != 0 ){
                        Toast(response.body.message);
                        return;
                    }
                    response.body.message.forEach((item)=>{
                        item.cou = obj[item.id];
                        this.value.push(false);
                    })
                    this.datalist = response.body.message;
                });
            },
            getiInputNumber: function (resObj) {
                updateData(resObj);
                for(var i = 0; i < this.datalist.length; i++){
                    if(this.datalist[i].id == resObj.goodsid){
                        if(resObj.type == "add"){
                            this.datalist[i].cou = this.datalist[i].cou + 1;
                        }else{
                            this.datalist[i].cou = this.datalist[i].cou - 1;
                        }
                        break;
                    }
                }
            },
            delrow(goodsid,index){
                console.log(goodsid,index);
                //将this.value数组中的index这个位置的值移除(当移除了这个值的时候就会自动触发计算属性totalcount的执行)
                this.value.splice(index,1);
                //将this.datalist中的index这个位置的值移除(当移除了这个值的时候就会自动触发计算属性totalcount的执行)
                this.datalist.splice(index,1);
                //将localStroage中的goodsid对应的所有值移除
                removeItem(goodsid);
            }
        },
        created: function () {
            this.getdatalist();
        }
    }
</script>

<style lang="css">
    .row{
        border-bottom: 1px solid rgba(0,0,0,0.3);
        height: 105px;
        display: flex;
        padding: 5px;
    }
    .switch{
        flex:0 0 52px;
    }
    .img{
        margin-left: 5px;
        height: 75px;
        width: 70px;
        flex: 0 0 85px;
    }
    .inforight{
        margin-left: 5px;
        flex:1;
    }
    .inforight ul{
        padding-left: 0px;
    }
    .inforight li{
        list-style: none;
        display: inline-block;
    }
    .inforight h4{
        color: #0094ff;
        font-size: 14px;
    }
    .bottom li:first-child{
        color:red;
        margin-right: 5px;
    }
    .bottom li:last-child{
        margin-left: 5px;
    }
    .bottom ul{
        margin: 0;
    }
    #total{
        /*margin-top: 10px;*/
        padding: 0px 8px;
        background-color: #b9b9b9;
        display: flex;
    }
    #total ul{
        padding: 0;
    }
    #total li{
        list-style: none;
        font-size: 14px;
    }
    #button{
        flex: 0 0 60px;
        margin-top:20px;
    }
    .desc{
        flex: 1;
    }
</style>