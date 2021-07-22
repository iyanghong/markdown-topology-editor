/**
 * Created by yh on 2021/7/20
 */
const {layouts}  = require('../config');
const upperCamelCase = require('uppercamelcase');
const render = require('json-templater/string');
const path = require('path');
const fs = require('fs');
const endOfLine = require('os').EOL;
const OUTPUT_PATH = path.join(__dirname,'../../lib/index.js');
let IMPORT_TEMPLATE = 'import {{componentName}} from \'./{{name}}.js\';';
let INSTALL_TEMPLATE = '{{componentName}}.install = function (Vue) {\n' +
    '    Vue.component(\'{{componentName}}\', {{componentName}});\n' +
    '}';
var MAIN_TEMPLATE = `/* Automatically generated */
{{include}}

import './packages/element-ui-demand'
import './css/index.css'

export {
{{list}}
};
`;
let includeTemplate = [];
let installTemplate = [];
let listTemplate = [];
Object.keys(layouts).forEach((layoutName) => {
    let componentName = upperCamelCase(layoutName);
    includeTemplate.push(render(IMPORT_TEMPLATE,{
        name : layoutName,
        componentName
    }));
    installTemplate.push(render(INSTALL_TEMPLATE,{
        name : layoutName,
        componentName
    }))
    listTemplate.push(`    ${componentName}`);
});

let template = render(MAIN_TEMPLATE,{
    include : includeTemplate.join(endOfLine),
    install : installTemplate.join(endOfLine),
    list: listTemplate.join(',' + endOfLine)
});
fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);