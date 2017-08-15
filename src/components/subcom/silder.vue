<template lang="html">
    <div id="temp">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in imgs" :key="item.id">
                <img v-bind:src="item.img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props:['imgs'],//父给子传值props接受 imgs对应父组件中的绑定的样式（list）
        data: function () {
            return{

            }
        },
        methods:{
            
        },
        created: function () {
            
        }
    }
</script>

<style lang="css" scoped>
    .mint-swipe{
        height: 160px;
        /*height: 300px;*/
    }

    .mint-swipe-item img{
        display: block;
        width: 100%;
    }
    .mint-swipe-item{
        width: 100%;
        height: 300px;
    }
</style>