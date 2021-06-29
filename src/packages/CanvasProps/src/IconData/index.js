/**
 * Created by yh on 2021/6/7
 */
const modulesFiles = require.context('./', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    if(moduleName !== 'index') {
        const iconGroup = modulesFiles(modulePath).default
        if (iconGroup) {
            modules[iconGroup.name] = iconGroup
        }
    }

    return modules
}, {})


export default modules
