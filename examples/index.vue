<template>
<!--    <topology-editor></topology-editor>-->
    <markdown-editor></markdown-editor>
</template>

<script>
    import {
        markdownEditor,
    } from '../lib/markdown-topology-editor.common'
    import '../lib/markdown-topology-editor.css'
    export default {
        name: 'TopologyView',
        components: {
            markdownEditor
        }
    };
</script>
<style lang="scss" scoped>

</style>
