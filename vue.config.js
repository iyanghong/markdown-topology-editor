/**
 * Created by yh on 2021/6/29
 */
let path = require('path');
module.exports = {
    output : {
        path : path.resolve(__dirname,'./dist'),
        publicPath : '/dist/',
        filename: 'markdown-topology-editor.js',
        library : 'markdown-topology-editor',
        libraryTarget : 'umd',
        umdNamedDefine : true
    },
    // 修改 src 为 examples
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },

}