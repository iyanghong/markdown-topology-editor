<template>
    <topology-editor></topology-editor>
</template>

<script>
    // import {topologyEditor} from '../lib/markdown-topology-editor.umd.min'
    // import '../lib/markdown-topology-editor.css'
    import {topologyEditor} from '../lib/index'
    export default {
        name: 'MarkdownEditorLib',
        components: {
            topologyEditor
        }
    };
</script>
<style lang="scss" scoped>

</style>
