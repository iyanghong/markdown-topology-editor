/**
 * Created by yh on 2021/7/20
 */
import markdown from "./markdown";
markdown.install = function (Vue) {
    Vue.component('markdown-editor', markdown);
}

export default markdown;