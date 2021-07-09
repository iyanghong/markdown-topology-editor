/**
 * Created by yh on 2021/6/27
 */
import topologyEditor from './layout/topology'
import markdownEditor from './layout/markdown'
import topologyView from './layout/topologyView'


topologyEditor.install = function (Vue) {
    Vue.component('topology-editor', topologyEditor);
}

markdownEditor.install = function (Vue) {
    Vue.component('markdown-editor', markdownEditor);
}
topologyView.install = function (Vue) {
    Vue.component('topology-view', topologyView);
}
export {
    topologyEditor,
    markdownEditor,
    topologyView
}

