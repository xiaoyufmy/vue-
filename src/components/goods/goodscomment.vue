<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue商品评论"></mt-header>
        </div>
        <comment :id="id"></comment>
    </div>
</template>

<script type="text/ecmascript-6">
    import comment from '../subcom/comment.vue';
    export default {
        components:{
            comment
        },
        data: function () {
            return{
                id:0
            }
        },
        methosd:{

        },
        created: function () {
            this.id = this.$route.params.id;
        }
    }
</script>

<style lang="css" scoped>

</style>