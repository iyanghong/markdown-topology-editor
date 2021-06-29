/**
 * Created by yh on 2021/6/27
 */
import Collapse from "./src/main";
Collapse.install = function (Vue) {
    Vue.component(Collapse.name,Collapse);
}
export default Collapse;