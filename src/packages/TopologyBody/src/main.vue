<template>

    <div class="topology-body page">
        <div class="tools" v-if="!isView">
            <topology-tools-panel
                    :tools="tools"
                    @toolDrag="onDrag"
            ></topology-tools-panel>

        </div>
        <div :id="containerKey" class="full" @contextmenu="onContextMenu($event)"></div>
        <div v-if="!isView" class="props" :style="props.expand ? 'overflow: visible' : ''">
            <CanvasProps
                    :props.sync="props"
                    :options="canvasOptions"
                    :pens="canvas ? canvas.data.pens : null"
                    :uploadImage="uploadImage"
                    @change="onUpdateProps"
                    @changeCanvas="handleChangeCanvas"
                    @setPens="handleSetPens"
            ></CanvasProps>
        </div>
        <div class="context-menu" v-if="contextmenu.left && !isView" :style="this.contextmenu">
            <CanvasContextMenu :canvas="canvas" :props.sync="props"></CanvasContextMenu>
        </div>
    </div>
</template>

<script>
    import '../../../options/global'
    import {Topology,} from '@topology/core';
    import {saveAs} from 'file-saver'

    import {Tools, canvasRegister} from '../../../options/canvas';


    import CanvasProps from '../../../packages/CanvasProps';
    import CanvasContextMenu from '../../../packages/CanvasContextMenu';
    import TopologyToolsPanel from '../../../packages/TopologyToolsPanel';

    import cache from "../../../utils/cache";


    export default {
        name: "TopologyBody",
        components: {
            CanvasProps,
            CanvasContextMenu,
            TopologyToolsPanel
        },
        props: {
            uploadImage: {
                type: Function,
                default: null
            },
            events: {
                default: null
            },
            /**
             * 默认打开数据，用props传递防止画布未渲染造成画布找不到问题
             * */
            defaultOpenData:{
                type : Object,
                default :null
            },
            isView:{
                type : Boolean,
                default : false
            }
        },
        inject: ['config'],
        data() {
            return {
                containerKey: 'topology-body-' + new Date().getTime(),
                canvas: null,
                tools: Tools,
                props: {
                    node: null,
                    line: null,
                    nodes: null,
                    multi: false,
                    expand: false,
                    locked: false
                },
                contextmenu: {
                    left: null,
                    top: null,
                    bottom: null
                },
                canvasOptions: null,
            }
        },
        created() {
            canvasRegister();
            document.onclick = () => {
                this.contextmenu = {
                    left: null,
                    top: null,
                    bottom: null
                };
            };
        },
        mounted() {
            let canvasOptions = JSON.parse(JSON.stringify(this.config));
            if(this.isView){
                canvasOptions.rule = 0;
                canvasOptions.locked = 1;
            }
            canvasOptions.on = this.onMessage;
            this.canvas = new Topology(this.containerKey, canvasOptions);
            if(this.defaultOpenData !== null){
                try {
                    this.canvas.open(this.defaultOpenData)
                }catch (e) {
                    console.error(e)
                }
            }
            if(this.isView){
                this.handleChangeCanvas({locked : 1,rule :false});
            }
            this.handleRefreshOptions();
            // this.open();
        },
        /*computed: {
            eventHandle() {
                return this.$store.state.event;
            }
        },*/
        watch: {
            events(data) {
                if (data.name) {
                    // console.log('handleEvent' + data.name)
                    if (this['handleEvent' + data.name]) {
                        this['handleEvent' + data.name](data.data)
                    }
                }
            }
        },
        methods: {
            onMessage(event, data) {
                // console.log('onMessage', event, data);
                // 右侧输入框编辑状态时点击编辑区域其他元素，onMessage执行后才执行onUpdateProps方法，通过setTimeout让onUpdateProps先执行
                setTimeout(() => {
                    switch (event) {
                        case 'node':
                        case 'addNode':
                            this.props = {
                                node: data,
                                line: null,
                                multi: false,
                                expand: this.props.expand,
                                nodes: null,
                                locked: data.locked
                            };
                            break;
                        case 'line':
                        case 'addLine':
                            this.props = {
                                node: null,
                                line: data,
                                multi: false,
                                nodes: null,
                                locked: data.locked
                            };
                            break;
                        case 'multi':
                            this.props = {
                                node: null,
                                line: null,
                                multi: true,
                                nodes: data.length > 1 ? data : null,
                                locked: this.getLocked({nodes: data})
                            };
                            break;
                        case 'space':
                            this.props = {
                                node: null,
                                line: null,
                                multi: false,
                                nodes: null,
                                locked: false
                            };
                            break;
                        case 'moveOut':
                            break;
                        case 'moveNodes':
                        case 'resizeNodes':
                            if (data.length > 1) {
                                this.props = {
                                    node: null,
                                    line: null,
                                    multi: true,
                                    nodes: data,
                                    locked: this.getLocked({nodes: data})
                                };
                            } else {
                                this.props = {
                                    node: data[0],
                                    line: null,
                                    multi: false,
                                    nodes: null,
                                    locked: false
                                };
                            }
                            break;
                        case 'resize':
                        case 'scale':
                        case 'locked':
                            /*if (this.canvas && this.canvas.data) {
                                console.log(event)
                                // this.handleRefreshOptions();
                                this.$store.commit('topology/stateData', {
                                    scale: this.canvas.data.scale || 1,
                                    locked: this.canvas.data.locked
                                });
                            }*/
                            break;
                    }
                }, 0);
            },
            getLocked(data) {
                let locked = true;
                if (data.nodes && data.nodes.length) {
                    for (const item of data.nodes) {
                        if (!item.locked) {
                            locked = false;
                            break;
                        }
                    }
                }
                if (locked && data.lines) {
                    for (const item of data.lines) {
                        if (!item.locked) {
                            locked = false;
                            break;
                        }
                    }
                }

                return locked;
            },
            onUpdateProps(node) {
                // 如果是node属性改变，需要传入node，重新计算node相关属性值
                // 如果是line属性改变，无需传参
                this.canvas.updateProps(node);

            },
            onContextMenu(event) {
                event.preventDefault();
                event.stopPropagation();


                if (event.clientY + 360 < document.body.clientHeight) {

                    this.contextmenu = {
                        left: event.clientX + 'px',
                        top: event.clientY + 'px'
                    };

                } else {

                    this.contextmenu = {
                        left: event.clientX + 'px',
                        top: -(document.body.clientHeight - event.clientY) + 'px'
                    };

                }
            },
            onDrag(event, node) {
                event.dataTransfer.setData('Text', JSON.stringify(node.data));
            },
            handleChangeCanvas(data) {
                if (this.canvas) {
                    for (let key in data) {
                        if (key === 'bkImage') {
                            this.canvas.clearBkImg();
                            this.canvas.data[key] = data[key];
                        } else if (key === 'scale') {
                            this.canvas.scaleTo(Number(data[key]));
                        } else {
                            this.canvas.data[key] = data[key];
                            this.canvas.options[key] = data[key];
                        }
                    }
                    this.canvas.render();
                    // this.handleRefreshOptions();//刷新配置
                }

            },
            handleRefreshOptions() {
                let optionKeys = [
                    "cacheLen",
                    "refresh",
                    "fontColor",
                    "fontFamily",
                    "fontSize",
                    "lineHeight",
                    "textAlign",
                    "textBaseline",
                    "color",
                    "activeColor",
                    "hoverColor",
                    "anchorRadius",
                    "anchorFillStyle",
                    "dockStrokeStyle",
                    "dockFillStyle",
                    "dragColor",
                    "rotateCursor",
                    "hoverCursor",
                    "minScale",
                    "maxScale",
                    "anchorSize",
                    "keydown",
                    "viewPadding",
                    "gridSize",
                    "gridColor",
                    "ruleColor",
                    "bkColor",
                    "animateColor",
                    "extDpiRatio",
                    "playIcon",
                    "pauseIcon",
                    "fullScreenIcon",
                    "loopIcon",
                    "scale",
                    "lineName",
                    "fromArrow",
                    "toArrow",
                    "locked",
                    "width",
                    "height",
                    "fileName",
                    "lineWidth",
                    "resourcePath",
                    "grid",
                    "rule",
                    "rotateCursor"
                ];
                let options = {};
                for (let key of optionKeys) {
                    let value = this.canvas.data[key] || this.canvas.options[key];
                    if (value !== null && value !== undefined) {
                        options[key] = value;
                    }
                }
                if (!options.fileName) {
                    options.fileName = this.canvas.id;
                }
                this.canvasOptions = options;
                this.$emit('updateData', this.canvasOptions);
            },
            handleGetJson() {
                if (this.canvas) {
                    return this.canvas.data;
                }
                return null;
            },
            handleGetImages(hasBaseResourcePath = true) {
                let images = [];
                if (this.canvas) {
                    let bkImage = this.canvas.data.bkImage || this.canvas.options.bkImage;
                    if (bkImage) {
                        if(hasBaseResourcePath === false) {
                            images.push(this.resolveBaseResourcePath(bkImage,false))
                        }else {
                            images.push(bkImage);
                        }
                    }
                    for (let pen of this.canvas.data.pens) {
                        if (pen.image) {
                            if(hasBaseResourcePath === false) {
                                images.push(this.resolveBaseResourcePath(pen.image,false))
                            }else {
                                images.push(pen.image);
                            }
                        }
                    }
                }
                return images;
            },
            handleRefreshResourcesPath(plusBaseResourcePath = true){
                let bkImage = this.canvas.data.bkImage || this.canvas.options.bkImage;
                if (bkImage) {
                    this.handleChangeCanvas(this.resolveBaseResourcePath(bkImage,plusBaseResourcePath));
                }
                for (let index in this.canvas.data.pens) {
                    let pen = this.canvas.data.pens[index]
                    if (pen && pen.image) {
                        this.canvas.data.pens[index].image = this.resolveBaseResourcePath(pen.image,plusBaseResourcePath)
                    }
                }
                this.canvas.render();
            },
            /**
             * 图片路径操作
             * @param {String} path 图片路径
             * @param {Boolean} plus true：拼接根路径,false：移除根路径
             * */
            resolveBaseResourcePath(path, plus = false) {
                if (!path) return path;
                if (plus === true) {
                    if (path.indexOf('http') > -1) return path;
                    return this.config.resourcePath + path;
                } else {
                    if (path.indexOf('http') === -1) return path;
                    return path.replace(this.config.resourcePath, '')
                }
            },
            handleEventChangeState(data) {
                this.handleChangeCanvas(data);
                this.handleRefreshOptions();//刷新配置
            },
            handleEventAutoWindowSize() {
                this.canvas.fitView(16);
                this.handleRefreshOptions();//刷新配置
            },
            handleEventSaveJson(fileName) {
                saveAs(
                    new Blob([JSON.stringify(this.canvas.data)], {
                        type: 'text/plain;charset=utf-8'
                    }),
                    (fileName || this.canvasOptions.fileName) + `.json`
                );
            },
            handleEventSavePng(fileName) {
                this.canvas.saveAsImage((fileName || this.canvasOptions.fileName) + '.png');
            },
            handleEventSaveSvg(fileName) {

                // eslint-disable-next-line no-undef

                // eslint-disable-next-line no-undef
                const ctx = new C2S(this.canvas.canvas.width + 200, this.canvas.canvas.height + 200);
                for (const item of this.canvas.data.pens) {
                    item.render(ctx);
                }

                let mySerializedSVG = ctx.getSerializedSvg();
                mySerializedSVG = mySerializedSVG.replace(
                    '<defs/>',
                    `<defs>
    <style type="text/css">
      @font-face {
        font-family: 'topology';
        src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
      }
    </style>
  </defs>`
                );

                // mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

                const urlObject = window.URL || window;
                const export_blob = new Blob([mySerializedSVG]);
                const url = urlObject.createObjectURL(export_blob);

                const a = document.createElement('a');
                a.setAttribute('download', fileName || this.canvasOptions.fileName + '.svg');
                a.setAttribute('href', url);
                const evt = document.createEvent('MouseEvents');
                evt.initEvent('click', true, true);
                a.dispatchEvent(evt);
            },
            handleEventNew() {
                this.canvas.open();
                this.handleRefreshOptions();//刷新配置
            },
            handleEventUndo() {
                this.canvas.undo();
            },
            handleEventRedo() {
                this.canvas.redo();
            },
            handleEventCopy() {
                this.canvas.copy();
            },
            handleEventCut() {
                this.canvas.cut();
            },
            handleEventParse() {
                this.canvas.parse();
            },
            handleEventOpen(data) {
                try {
                    if (typeof data === 'string') {
                        data = JSON.parse(data);
                    }
                    this.canvas.open(data);
                    this.handleRefreshOptions();//刷新配置
                } catch (e) {
                    return false;
                }
            },
            handleEventOpenFile() {
                const input = document.createElement('input');
                input.type = 'file';
                input.onchange = event => {
                    const elem = event.srcElement || event.target;
                    if (elem.files && elem.files[0]) {
                        // const name = elem.files[0].name.replace('.json', '');
                        const reader = new FileReader();
                        reader.onload = e => {
                            const text = e.target.result + '';
                            try {
                                const data = JSON.parse(text);
                                this.canvas.open(data);
                                this.handleRefreshOptions();//刷新配置
                            } catch (e) {
                                return false;
                            }
                        };
                        reader.readAsText(elem.files[0]);
                    }
                };
                input.click();
            },
            handleEventSaveCache() {
                if (this.canvas) {
                    cache.set('topology:cache', this.canvas.data)
                }
            },
            handleEventReadCache() {
                let data = cache.getJson('topology:cache');
                if (data) {
                    this.canvas.open(data);
                    this.handleRefreshOptions();//刷新配置
                }
            },
            handleSetPens(node) {
                this.canvas.activeLayer.pens = [];
                this.canvas.activeLayer.add(node);
                this.canvas.render();
            },
            handleToImage(type = 'file') {
                return new Promise((resolve, reject) => {
                    if (this.canvas) {
                        let imageUrl = this.canvas.toImage(10), image = null;
                        if (!imageUrl || imageUrl === 'data:,') {
                            reject({
                                message: '无法保存空画布'
                            });
                            return;
                        }
                        if (type === 'file') {
                            image = this.handleBase64toFile(imageUrl, this.canvasOptions.fileName)
                        } else {
                            image = imageUrl;
                        }
                        resolve(image);
                    }
                    reject({
                        message: '画布未初始化完成'
                    });
                })

            },
            /** 将base64转换为文件 */
            handleBase64toFile(dataUrl, filename) {
                let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bStr = atob(arr[1]), n = bStr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bStr.charCodeAt(n);
                }
                return new File([u8arr], filename + '.png', {type: mime});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        display: flex;
        width: 100%;
        height: 100%;

        .tools {
            flex-shrink: 0;
            padding-top: 20px;
            /*width: 1.75rem;*/
            width: 220px;
            background-color: #ffffff;
            border-right: 1px solid #d9d9d9;
            overflow-y: auto;


        }

        .full {
            flex: 1;
            width: initial;
            position: relative;
            overflow: auto;
            background: #fff;
        }

        .props {
            flex-shrink: 0;
            width: 240px;
            padding: 0.1rem 0;
            background-color: #ffffff;
            border-left: 1px solid #d9d9d9;
            overflow-y: auto;
            position: relative;
        }

        .context-menu {
            position: fixed;
            z-index: 10;
        }
    }
</style>
