/**
 * Created by yh on 2021/7/20
 */
const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const files = fs.readdirSync(path.join(__dirname, '../../lib/css'));
const OUT_PUT_PATH = path.join(__dirname, '../../lib/css/index.css');
console.log('\x1B[32m%s\x1B[39m','start merge css');
let content = '';
files.forEach((fileName) => {
    if (fileName !== 'index.css') {
        let filePath = path.join(__dirname, '../../lib/css/' + fileName);
        let fileContent = '';
        try {
            fileContent = fs.readFileSync(filePath);
        } catch (e) {
            console.log(`合并失败：${filePath}`);
        }
        content += fileContent;
    }
});
const output = new CleanCSS().minify(content);
fs.writeFileSync(OUT_PUT_PATH, content);
// fs.writeFileSync(OUT_PUT_PATH, output.styles);
console.log(`merge css complete! path:\x1B[32m${OUT_PUT_PATH}\x1B[39m`)
console.log(`
    效率: \x1B[32m${output.stats.efficiency}s\x1B[39m`);
console.log(`    压缩后大小: \x1B[32m${output.stats.minifiedSize}\x1B[39m`);
console.log(`    原始大小: \x1B[32m${output.stats.originalSize}\x1B[39m`);
console.log(`    时间: \x1B[32m${output.stats.timeSpent}ms\x1B[39m`);