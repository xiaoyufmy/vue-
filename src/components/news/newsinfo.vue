<template lang="html">
    <div id="tmpl">
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datefmt('YYYY/MM/DD')}} {{info.click}}次浏览</p>
        </div>
        <div class="content" v-html="info.content">

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    export default {
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
                var url = 'http://182.254.146.100:8899/api/getnew/' + this.id;
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
    .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }
    .title,.content{
        padding: 5px;
    }
</style>