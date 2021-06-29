/**
 * Created by yh on 2021/6/3
 */
import CanvasProps from './src/CanvasProps'

CanvasProps.install = function (Vue) {
    Vue.component(CanvasProps.name, CanvasProps);
}
export default CanvasProps
