/**
 * Created by yh on 2021/6/3
 */
import CanvasContextMenu from './src/CanvasContextMenu'

CanvasContextMenu.install = function (Vue) {
    Vue.component(CanvasContextMenu.name, CanvasContextMenu)

}
export default CanvasContextMenu;
