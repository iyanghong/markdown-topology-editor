/**
 * Created by yh on 2021/7/20
 */
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(arr) {
    return Array.isArray(arr)
}

/*function merge(target, ...arg) {
    return arg.reduce((acc, cur) => {
        return Object.keys(cur).reduce((subAcc, key) => {
            const srcVal = cur[key]
            if (isObject(srcVal)) {
                subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
            } else if (isArray(srcVal)) {
                // series: []，下层数组直接赋值
                subAcc[key] = srcVal.map((item, idx) => {
                    if (isObject(item)) {
                        const curAccVal = subAcc[key] ? subAcc[key] : []
                        return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
                    } else {
                        return item
                    }
                })
            } else {
                subAcc[key] = srcVal
            }
            return subAcc
        }, acc)
    }, target)
}*/
function merge(target, args) {
    for (let key in args) {
        let item = args[key],
            targetItem = target[key];
        if (isArray(item) && isArray(targetItem)) {
            for (let value of item){
                target[key].push(value)
            }
        } else if (isObject(item) && isObject(targetItem)) {
            target[key] = merge(targetItem,item)
        } else {
            target[key] = item;
        }
    }
    return target;
}


exports.merge = merge;