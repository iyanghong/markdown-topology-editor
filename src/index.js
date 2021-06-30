/**
 * Created by yh on 2021/6/27
 */
import topologyEditor from './layout'
import markdownEditor from './layout/markdown'


topologyEditor.install = function (Vue) {
    Vue.component('topology-editor', topologyEditor);
}

markdownEditor.install = function (Vue) {
    Vue.component('markdown-editor', markdownEditor);
}

export {
    topologyEditor,
    markdownEditor
}
