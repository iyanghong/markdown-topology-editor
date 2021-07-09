<template>
    <topology-view :data="data"/>
</template>

<script>
    import {topologyView} from '../src'
    import cache from "../src/utils/cache";
    export default {
        name: "TopologyView",
        components:{
            topologyView
        },
        data() {
            return {
                data : {}
            }
        },
        created() {
            this.getCacheData();
        },
        methods :{
            getCacheData() {
                this.data = cache.getJson('topology:cache');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>