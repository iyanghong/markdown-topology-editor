<template>
    <topology-view :data="data"/>
</template>

<script>
    import {TopologyView} from '../../lib/index'
    import cache from "../../src/utils/cache";
    export default {
        name: "TopologyViewExample",
        components:{
            TopologyView
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
                let data = cache.getJson('topology:cache');
                if(typeof data === 'object'){
                    this.data = data;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>