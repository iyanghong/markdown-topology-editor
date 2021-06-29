<template>
    <div class="props-container">
        <!-- 选中为空 -->
        <template v-if="!props.node && !props.line && !props.multi">
            <el-tabs v-model="noNodeActive" :stretch="true">
                <el-tab-pane label="图纸" name="drawings">

                    <div class="tab-panel drawings-panel" v-if="options">
                        <div class="form-group">
                            <div class="form-item">
                                <label>文件名</label>
                                <div><input type="text" v-model="fileName" placeholder="文件名"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-item">
                                <label>背景颜色</label>
                                <div>
                                    <el-color-picker size="mini" v-model="canvasData.bkColor"></el-color-picker>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>背景图片</label>
                                <div>
                                    <upload :upload-image="uploadImage"  @change="handleChangeBackgroundImage">
                                        <el-image v-if="canvasData.bkImage" :src="canvasData.bkImage"
                                                  class="upload-images"></el-image>
                                        <i v-else class="el-icon-upload"></i>
                                    </upload>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>背景网格</label>
                                <div>
                                    <el-switch size="mini" v-model="canvasData.grid"></el-switch>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>网格颜色</label>
                                <div>
                                    <el-color-picker size="mini" v-model="canvasData.gridColor"></el-color-picker>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>网格大小</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="canvasData.gridSize"
                                            controls-position="right"
                                            placeholder="网格大小"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="form-item">
                                <label>显示标尺</label>
                                <div>
                                    <el-switch size="mini" v-model="canvasData.rule"></el-switch>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>标尺颜色</label>
                                <div>
                                    <el-color-picker size="mini" v-model="canvasData.ruleColor"></el-color-picker>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="title">小提示</div>
                            <ul class="group">
                                <li>方向键：控制节点移动5个像素</li>
                                <li>Ctrl + 方向键：控制节点移动1个像素</li>
                                <li>Ctrl + 鼠标移动：移动整个画布</li>
                                <li>Ctrl + 鼠标滚轮：缩放</li>
                                <li>添加或选中节点，右侧属性支持上传各种图片哦</li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="布局" name="layout">
                    <!--<el-scrollbar class="tab-panel">
                        <div class="form-group">
                            <div class="form-item">
                                <label>画布宽度</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="canvasData.width"
                                            controls-position="right"
                                            placeholder="画布宽度"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>画布高度</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="canvasData.height"
                                            controls-position="right"
                                            placeholder="画布高度"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>-->
                </el-tab-pane>
                <el-tab-pane label="结构" name="structure">
                    <div class="tab-panel structure-panel" v-if="pens">
                        <div

                                v-for="(pen,index) in canvasPens"
                                :key="index"
                                @click="$_activePens(pen)"
                                :class="{
                                    'item':true,
                                    'status-lock' : pen.locked,
                                    'status-ban-view':pen.visible === false}"
                        >
                            <div class="node-icon">
                                <i v-if="pen.type === 0" class="el-icon-picture-outline"></i>
                                <i v-else-if="pen.type === 1"
                                   class="ts-icon ts-icon-tubiaoshangshengqushi"></i>
                            </div>
                            <span class="node-name" v-text="$_getPenLabel(pen)"></span>
                            <div class="node-action">
                                <div>
                                    <i
                                            v-if="!pen.locked"
                                            class="ts-icon ts-icon-lock btn-action"
                                            @click="$_setPenLock(pen,1)"></i>
                                    <i

                                            v-else
                                            class="ts-icon ts-icon-unlock btn-action"
                                            @click="$_setPenLock(pen,0)"></i>

                                </div>
                                <div>
                                    <i
                                            v-if="pen.visible === true"
                                            class="ts-icon ts-icon-view btn-action"
                                            @click="$_setPenVisible(pen,false)"></i>
                                    <i
                                            v-else
                                            class="ts-icon ts-icon-ban-view btn-action"
                                            @click="$_setPenVisible(pen,true)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>
        <!-- 选中节点 -->
        <template v-if="props.node">
            <node-props :node.sync="props.node" :uploadImage="uploadImage" @change="handleChangeNode"></node-props>
        </template>
        <template v-else-if="props.line">
            <line-props :line.sync="props.line" @change="handleChangeLine"></line-props>
        </template>
    </div>
</template>
<script>

    import NodeProps from "./NodeProps";
    import LineProps from "./LineProps";
    import Upload from "../../Upload";


    const noImages = 'global/noimg.png';
    import penMixin from './mixins/pens'

    export default {
        name: 'CanvasProps',
        components: {
            NodeProps, LineProps, Upload
        },
        mixins: [penMixin],
        props: {
            props: {
                type: Object,
                require: true
            },
            uploadImage : {
                type : Function,
                default : null
            },
            options: {
                default: null
            },
            pens: {
                default: null
            }
        },
        inject:['config'],
        data() {
            return {
                nodeId: null,
                nodeIsJson: false,
                nodeData: '',
                noNodeActive: 'drawings',
                fileName: '',
                noImages: noImages,
                canvasData: {},
                canvasPens: []
            }
        },
        created() {
        },
        mounted() {
        },

        watch: {
            /*props(value) {
                if (value) console.log(value)
            },*/
            options: {
                deep: true,
                handler(value) {
                    if (value) this.canvasData = value;
                }
            },
            canvasData: {
                deep: true,
                handler() {
                    this.handleChangeCanvas()
                }
            },
            pens: {
                deep: true,
                handler(value) {
                    if (value) {
                        this.$set(this, 'canvasPens', value);
                    }

                }
            }

        },
        methods: {
            handleChangeNode(node) {
                this.$emit('change', node);
            },
            handleChangeLine(line) {
                this.$emit('change', line);
            },
            handleChangeCanvas() {
                this.$emit('changeCanvas', this.canvasData)
            },
            handleChangeBackgroundImage(url) {
                setTimeout(() => {
                    this.$set(this.canvasData, 'bkImage',this.config.resourcePath + url);
                }, 100);
            },
        }
    }
</script>

<style lang="scss">
    .props-container .el-tabs__content, .props-container .el-tab-pane {
        min-height: calc(100vh - 100px);
    }
    .el-color-dropdown.el-color-picker__panel{
        z-index: 99999 !important;
    }
    .props-container .tab-panel {

    }
</style>
<style lang="scss" scoped>
    @import "styles/main";

    .upload-images {
        width: 40px;
        height: 40px;
    }


</style>
