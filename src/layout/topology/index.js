/**
 * Created by yh on 2021/7/20
 */
import topology from "./topology";
topology.install = function (Vue) {
    Vue.component('topology-editor', topology);
}
export default topology