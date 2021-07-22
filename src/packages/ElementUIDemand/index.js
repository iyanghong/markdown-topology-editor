/**
 * Created by yh on 2021/7/20
 */
/**
 * Created by yh on 2021/7/20
 */
import Vue from 'vue'
//导入ElementUI框架
import {
    Input,
    InputNumber,
    Image,
    Switch,
    Select,
    Option,
    Button,
    Scrollbar,
    Tabs,
    TabPane,
    ColorPicker,
    Loading
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'element-ui/lib/theme-chalk/index.css'

Vue
    .use(Input)
    .use(InputNumber)
    .use(Image)
    .use(Switch)
    .use(Select)
    .use(Option)
    .use(Button)
    .use(Scrollbar)
    .use(Tabs)
    .use(TabPane)
    .use(ColorPicker)
    .use(Loading);
Vue.component('el-collapse-transition',CollapseTransition)