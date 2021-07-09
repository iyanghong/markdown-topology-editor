<template>
    <markdown-editor />
</template>

<script>
    import {
        markdownEditor,
    } from '../lib/markdown-topology-editor.umd'
    import '../lib/markdown-topology-editor.css'

    export default {
        name: 'MarkdownEditorLib',
        components: {
            markdownEditor
        }
    };
</script>
<style lang="scss" scoped>

</style>
