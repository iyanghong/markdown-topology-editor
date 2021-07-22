<template>
    <topology-editor :options="options"/>
</template>

<script>
    import {TopologyEditor} from '../../src'
    import '../../src/packages/ElementUIDemand'
    export default {
        name: "TopologyEditorExamples",
        components: {
            TopologyEditor
        },
        data() {
            return {
                options: {
                    extendIcons: []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>