/**
 * Created by yh on 2021/6/27
 */
import Dropdown from "./src/main";
Dropdown.install = function (Vue) {
    Vue.component(Dropdown.name,Dropdown);
}
export default Dropdown;