<template>
    <div class="markdown-editor github-markdown-body">
        <mavon-editor
                :ref='editorKey'
                v-model="content"
                placeholder="请输入内容"
                class="markdown-mavon-editor"
                @imgAdd="handleResolveImage"
                previewBackground="#ffffff"
                :toolbars="toolbars"
        >
            <template v-slot:left-toolbar-after>
                <button
                        type="button"
                        title="拓扑图"
                        class="op-icon ts-icon ts-icon-topology"
                        @click="handleVisibleTopology"
                ></button>
            </template>
        </mavon-editor>
        <topology-editor
                v-loading="topologyLoading"
                :is-callback="true"
                :visible.sync="visibleTopology"
                @success="handleSetTopology"
                :upload-image="uploadImage"
                :options="options"
        ></topology-editor>

    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import TopologyEditor from '../topology'
    import config from "../../config";
    import 'mavon-editor/dist/css/index.css'
    import "../../styles/css/github-markdown.scss";
    import '../../styles/css/ts-icon.css'

    export default {
        name: "markdown",
        components: {mavonEditor, TopologyEditor},
        props: {
            value: {
                type: String,
                default: ''
            },
            uploadImage: {
                type: Function,
                default: null
            },
            /** 选项 */
            options: {
                type: Object,
                default: null
            },
        },
        data() {
            return {
                config: config,
                openUploadImage: false,
                editorKey: `markdown-editor-${new Date().getTime()}`,
                content: this.value,
                visibleTopology: false,
                topologyLoading: false,
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: false, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                toolbar: 'undo redo|h bold italic strikethrough quote|ul ol table hr|link image code|save clear',
            }
        },
        watch: {
            value(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.content = newValue;
                }
            },
            content(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.$emit('update:value', newValue);
                }
            }
        },
        created() {
            if (this.options !== null) {
                for (let key in this.options) {
                    this.config[key] = this.options[key];
                }
            }
            if (this.uploadImage !== null) {
                this.openUploadImage = true;
            }
        },
        methods: {
            handleResolveImage(pos, $file) {
                this.openUploadImage ? this.handleUploadImage(pos, $file) : this.handleBase64Image(pos, $file);
            },
            handleUploadImage(pos, $file) {
                this.uploadImage($file).then(url => {
                    this.$refs[this.editorKey].$img2Url(pos, this.config.resourcePath + url);
                });
            },
            handleBase64Image(pos, $file) {
                let windowURL = window.URL || window.webkitURL;
                let dataURl = windowURL.createObjectURL($file);
                $file.url = dataURl;
                this.url = dataURl;
                this.getImgBase64(dataURl).then(base64 => {
                    if (base64) {
                        this.$refs[this.editorKey].$img2Url(pos, base64);
                    }
                });
            },
            /** 获取image的Base64编码 */
            getImgBase64(src) {
                return new Promise(resolve => {
                    let img = new Image();
                    img.src = src;
                    img.onload = () => {
                        resolve(this.image2Base64(img));
                    };
                });
            },
            image2Base64(img) {
                let canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                return canvas.toDataURL("image/png");
            },
            handleVisibleTopology() {
                this.visibleTopology = !this.visibleTopology;
            },
            handleSetTopology(image) {
                if (this.openUploadImage) {
                    this.topologyLoading = true;
                    this.uploadImage(image).then(url => {
                        this.handleInsertText({
                            prefix: `![${image.name}](${this.config.resourcePath + url})`,
                            subfix: '',
                            str: ''
                        })
                    }).finally(() => {
                        this.topologyLoading = false;
                        this.visibleTopology = false;
                    });
                } else {
                    let windowURL = window.URL || window.webkitURL;
                    let dataURl = windowURL.createObjectURL(image);
                    image.url = dataURl;
                    this.url = dataURl;
                    this.getImgBase64(dataURl).then(base64 => {
                        if (base64) {
                            this.handleInsertText({
                                prefix: `![${image.name}](${base64})`,
                                subfix: '',
                                str: ''
                            })
                        }
                    });
                    this.visibleTopology = false;
                }
            },
            handleInsertText(content) {
                // 这里获取到的是mavon编辑器实例，上面挂载着很多方法
                const $vm = this.$refs[this.editorKey]
                // 将文件名与文件路径插入当前光标位置，这是mavon-editor 内置的方法
                $vm.insertText($vm.getTextareaDom(), content)
            }
        }
    }
</script>

<style lang="scss">
    .markdown-editor {
        .v-note-wrapper {
            z-index: 555 !important;
        }
    }
</style>