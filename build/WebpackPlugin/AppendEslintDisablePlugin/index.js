/**
 * Created by yh on 2021/7/18
 */
const endOfLine = require('os').EOL;

class AppendEslintDisablePlugin {
    appendList = [];

    constructor(list = []) {
        this.appendList = list;
    }

    apply(compiler) {
        compiler.hooks.emit.tap('AppendEslintDisablePlugin', (compilation) => {
            compilation.chunks.forEach((chunk) => {
                chunk.files.forEach((filename) => {
                    if (/\.js$/.test(filename)) {
                        // compilation.assets 存放当前所有即将输出的资源
                        // 调用一个输出资源的 source() 方法能获取到输出资源的内容
                        let fileContent = compilation.assets[filename].source();
                        fileContent = this.handleAppend(fileContent);
                        // fileContent = '/* eslint-disable */' + endOfLine + fileContent + endOfLine + '/* eslint-enable  */'
                        compilation.assets[filename] = {
                            source: () => {
                                return fileContent;
                            },
                            size: () => {
                                return Buffer.byteLength(fileContent, 'utf8');
                            }
                        };
                    }
                });
            });
        })
    }

    handleAppend(content) {
        return '/* eslint-disable */' + endOfLine + content + endOfLine + '/* eslint-enable  */'
    }
}

module.exports = AppendEslintDisablePlugin;