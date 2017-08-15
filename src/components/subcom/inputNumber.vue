<template lang="html">
    <div id="inputtemp">
        <div class="inleft div" @click="substrict">-</div>
        <div class="incenter div" v-text="count"></div>
        <div class="inright div"  @click="add">+</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return{
                count:1
            }
        },
        methods:{
            substrict: function () {
                this.count--;
                if(this.count < 1){
                    this.count = 1;
                }
                this.sendmessage();
            },
            add: function () {
                this.count++;
                this.sendmessage();
            },
            sendmessage: function () {
                this.$emit('dataobj',this.count);
            }
        },
        created: function () {

        }
    }
</script>

<style lang="css" scoped>
    #inputtemp .div{
        width: 40px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #000;
        display: inline-block;
        text-align: center;
    }
</style>