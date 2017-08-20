<template lang="html">
    <div id="cartemp">
        <div class="inleft div" @click="substrict">-</div>
        <div class="incenter div" v-text="count"></div>
        <div class="inright div"  @click="add">+</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props:['initCount','goodsid'],
        data: function () {
            return{
                count:1,
                resObj:{goodsid:0,type:"add"}
            }
        },
        created: function () {
            this.count = this.initCount;
        },
        methods:{
            substrict: function () {
                this.count--;
                if(this.count < 1){
                    this.count = 1;
                    return;
                }
                this.sendmessage("substrict");
            },
            add: function () {
                this.count++;
                this.sendmessage("add");
            },
            sendmessage: function (type) {
                this.resObj.type = type;
                this.resObj.goodsid = this.goodsid;
                this.$emit('cardataobj',this.resObj);
            }
        }
    }
</script>

<style lang="css" scoped>
    #cartemp .div{
        width: 35px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #000;
        display: inline-block;
        text-align: center;
    }
</style>