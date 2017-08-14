<template lang="html">
    <div id="temp">
        <div class="top">
            <a href="javascript:history.go(-1);" class="back">‹</a>
            <mt-header fixed title="Vue图片分享"></mt-header>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    import common from '../../kits/common.js';

    export default {

    }
</script>

<style lang="css" scoped>
    .top a{
        float: left;
    }
    .top a.back {
        color: #fff;
        top: 7px;
        left: 5px;
        position: fixed;
        z-index: 999;
        font-size: 50px;
    }

</style>