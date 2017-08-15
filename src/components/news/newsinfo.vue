<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue新闻详情"></mt-header>
        </div>
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datefmt('YYYY/MM/DD')}} {{info.click}}次浏览</p>
        </div>
        <div class="content" v-html="info.content"></div>
        <comment :id="id"></comment>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    import common from '../../kits/common.js';
    import comment from '../subcom/comment.vue';

    export default {
        components:{
            comment
        },
        data: function () {
            return {
                id : 0,
                info : {}
            }
        },
        created:function (){
            this.id = this.$route.params.id;
            this.getinfo();
        },
        methods:{
            getinfo:function(){
                var url = common.apidomain + '/api/getnew/' + this.id;
                this.$http.get(url).then(function(response){
                    var data = response.body;
                    if (data.status != 0) {
                        Toast(data.message);
                        return ;
                    }
                    this.info = data.message[0];
                })
            }
        }
    }
</script>

<style lang="css" scoped>

    #temp{
        padding: 0 5px;
    }
    .title h4{
        font-size: 17px;
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }
    .title,.content{
        padding: 5px;
    }
</style>