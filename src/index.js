/**
 * Created by yh on 2021/6/27
 */
import topologyEditorLayout from './layout'
topologyEditorLayout.install = function (Vue) {
    Vue.component('topology-editor',topologyEditorLayout);
}

export default topologyEditorLayout