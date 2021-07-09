<template>
    <topology-editor></topology-editor>
</template>

<script>
    import {
        topologyEditor,
    } from '../lib/markdown-topology-editor.umd.min'
    import '../lib/markdown-topology-editor.css'

    export default {
        name: 'MarkdownEditorLib',
        components: {
            topologyEditor
        }
    };
</script>
<style lang="scss" scoped>

</style>
