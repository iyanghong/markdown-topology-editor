<template>
    <el-tabs class="line-props-tabs" v-model="lineActive" :stretch="true">
        <el-tab-pane label="外观" name="appearance">
            <el-scrollbar class="tab-panel">
                <collapse title="样式">
                    <div class="form-group">

                        <div class="form-item">
                            <label>线条样式</label>
                            <div>
                                <dropdown class="line-dash-dropdown">
                                    <template slot="title">
                                        <div class="line-dash">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                    <g fill="none" stroke="black" stroke-width="1">
                                                        <path :stroke-dasharray="data.lineDash ? data.lineDash.join(' ') : ''"
                                                              d="M0 9 l85 0"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div>
                                                <i class="el-icon-arrow-down"></i>
                                            </div>
                                        </div>
                                    </template>
                                    <template slot="menus">
                                        <div
                                                class="item line-dash-item"
                                                v-for="(strokeDasharray,index) in lineDash"
                                                :key="index"
                                                @click="handleSetLineDash(index)"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                <g fill="none" stroke="black" stroke-width="1">
                                                    <path :stroke-dasharray="strokeDasharray.join(' ')"
                                                          d="M0 9 l85 0"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </template>
                                </dropdown>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>线条类型</label>
                            <div>
                                <dropdown class="line-dash-dropdown">
                                    <template slot="title">
                                        <div class="line-dash">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                    <g fill="none" stroke="black" stroke-width="1">
                                                        <path :d="getLineSvgPathD()"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div>
                                                <i class="el-icon-arrow-down"></i>
                                            </div>
                                        </div>
                                    </template>
                                    <template slot="menus">
                                        <div
                                                class="item line-dash-item"
                                                v-for="(item,index) in lineNames"
                                                :key="index"
                                                @click="handleSetLineName(item)"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                <g fill="none" stroke="black" stroke-width="1">
                                                    <path :d="item.pathD"></path>
                                                </g>
                                            </svg>

                                        </div>
                                    </template>
                                </dropdown>
                            </div>
                        </div>

                        <div class="form-item">
                            <label>线条颜色</label>
                            <div>
                                <el-color-picker size="mini" v-model="data.strokeStyle"
                                                 @change="handleChange"></el-color-picker>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>线条宽度</label>
                            <div>
                                <el-input-number
                                        class="form-item-number"
                                        v-model="data.lineWidth"
                                        :precision="config.valuePrecision"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="线条宽度"
                                        size="mini"
                                ></el-input-number>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>边框颜色</label>
                            <div>
                                <el-color-picker size="mini" v-model="data.borderColor"
                                                 @change="handleChange"></el-color-picker>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>边框宽度</label>
                            <div>
                                <el-input-number
                                        class="form-item-number"
                                        v-model="data.borderWidth"
                                        :precision="config.valuePrecision"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="线条宽度"
                                        size="mini"
                                ></el-input-number>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>透明度</label>
                            <div>
                                <el-input-number
                                        class="form-item-number"
                                        v-model="data.globalAlpha"
                                        :precision="config.valuePrecision"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="透明度"
                                        size="mini"
                                ></el-input-number>
                            </div>
                        </div>
                        <div class="form-item form-item-select">
                            <label>控制点</label>
                            <div>
                                <el-select size="mini" v-model="data.manualCps" @change="handleChange">
                                    <el-option :value="false || undefined" label="自动计算"></el-option>
                                    <el-option :value="true" label="禁止自动计算"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div
                                class="form-item"
                                v-for="(point,index) in data.controlPoints"
                                :key="index"
                        >
                            <label v-text="'控制点' + (index+1)"></label>
                            <div class="form-item-point-group">
                                <div class="form-item-point">
                                    x:
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="point.x"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="X"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                                <div class="form-item-point">
                                    y:
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="point.y"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="Y"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                        </div>
                    </div>
                </collapse>
                <collapse title="位置">
                    <div class="form-group">
                        <div class="form-item form-item-arrow">
                            <label>起点箭头</label>
                            <div>
                                <dropdown class="line-dash-dropdown">
                                    <template slot="title">
                                        <div class="line-dash">
                                            <div>
                                                <i :class="getArrowIcon('from')"></i>
                                            </div>
                                            <div>
                                                <i class="el-icon-arrow-down"></i>
                                            </div>
                                        </div>
                                    </template>
                                    <template slot="menus">
                                        <div
                                                class="item line-dash-item"
                                                v-for="(arrow,index) in arrows"
                                                :key="index"
                                                @click="handleSetArrow('from',arrow)"
                                        >
                                            <el-tooltip
                                                    effect="dark"
                                                    :content="arrow.label"
                                                    placement="top"
                                            >
                                                <div><i :class="arrow.icon"></i></div>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                </dropdown>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>起点坐标</label>
                            <div class="form-item-point-group">
                                <div class="form-item-point">
                                    x:
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.from.x"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="X"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                                <div class="form-item-point">
                                    y:
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.from.y"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="Y"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                        </div>
                        <div class="form-item form-item-no-warp">
                            <label>起点箭头颜色</label>
                            <div>
                                <el-color-picker size="mini" v-model="data.fromArrowColor"
                                                 @change="handleChange"></el-color-picker>
                            </div>
                        </div>

                        <div class="form-item form-item-arrow">
                            <label>终点箭头</label>
                            <div>
                                <dropdown class="line-dash-dropdown">
                                    <template slot="title">
                                        <div class="line-dash">
                                            <div>
                                                <i :class="getArrowIcon('to')"></i>
                                            </div>
                                            <div>
                                                <i class="el-icon-arrow-down"></i>
                                            </div>
                                        </div>
                                    </template>
                                    <template slot="menus">
                                        <div
                                                class="item line-dash-item"
                                                v-for="(arrow,index) in arrows"
                                                :key="index"
                                                @click="handleSetArrow('to',arrow)"
                                        >
                                            <el-tooltip
                                                    effect="dark"
                                                    :content="arrow.label"
                                                    placement="top"
                                            >
                                                <div><i :class="arrow.icon"></i></div>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                </dropdown>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>终点坐标</label>
                            <div class="form-item-point-group">
                                <div class="form-item-point">
                                    x:
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.to.x"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="X"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                                <div class="form-item-point">
                                    y:
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.to.y"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="Y"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                        </div>
                        <div class="form-item form-item-no-warp">
                            <label>终点箭头颜色</label>
                            <div>
                                <el-color-picker size="mini" v-model="data.toArrowColor"
                                                 @change="handleChange"></el-color-picker>
                            </div>
                        </div>
                    </div>
                </collapse>
                <collapse title="文字">
                    <div class="form-group">
                        <div class="form-item">
                            <label>字体名</label>
                            <div>
                                <el-input
                                        class="form-item-input"
                                        size="mini"
                                        v-model="data.fontFamily"
                                        @change="handleChange"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>字体大小</label>
                            <div>
                                <el-input-number
                                        class="form-item-number"
                                        v-model="data.fontSize"
                                        :precision="0"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="字体大小"
                                        size="mini"
                                ></el-input-number>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>字体颜色</label>
                            <div>
                                <el-color-picker size="mini" v-model="data.fontColor"
                                                 @change="handleChange"></el-color-picker>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>背景颜色</label>
                            <div>
                                <el-color-picker size="mini" v-model="data.textBackground"
                                                 @change="handleChange"></el-color-picker>
                            </div>
                        </div>
                        <div class="form-item form-item-select">
                            <label>倾斜</label>
                            <div>
                                <el-select size="mini" v-model="data.fontStyle" @change="handleChange">
                                    <el-option value="normal" label="正常"></el-option>
                                    <el-option value="italic" label="倾斜"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item form-item-select">
                            <label>加粗</label>
                            <div>
                                <el-select size="mini" v-model="data.fontWeight" @change="handleChange">
                                    <el-option value="normal" label="正常"></el-option>
                                    <el-option value="bold" label="加粗"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item form-item-select">
                            <label>水平对齐</label>
                            <div>
                                <el-select size="mini" v-model="data.textAlign" @change="handleChange">
                                    <el-option value="left" label="左对齐"></el-option>
                                    <el-option value="center" label="居中"></el-option>
                                    <el-option value="right" label="右对齐"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item form-item-select">
                            <label>垂直对齐</label>
                            <div>
                                <el-select size="mini" v-model="data.textBaseline" @change="handleChange">
                                    <el-option value="top" label="顶部对齐"></el-option>
                                    <el-option value="middle" label="居中"></el-option>
                                    <el-option value="bottom" label="底部对齐"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>行高</label>
                            <div>
                                <el-input-number
                                        class="form-item-number"
                                        v-model="data.lineHeight"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="透明度"
                                        size="mini"
                                ></el-input-number>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>最大行数</label>
                            <div>
                                <el-input-number
                                        class="form-item-number"
                                        v-model="data.textMaxLine"
                                        :precision="0"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="最大行数"
                                        size="mini"
                                ></el-input-number>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>水平偏移</label>
                            <div>
                                <el-input-number
                                        class="form-item-number"
                                        v-model="data.textOffsetX"
                                        :precision="config.valuePrecision"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="水平偏移"
                                        size="mini"
                                ></el-input-number>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>垂直偏移</label>
                            <div>
                                <el-input-number
                                        class="form-item-number"
                                        v-model="data.textOffsetY"
                                        :precision="config.valuePrecision"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="垂直偏移"
                                        size="mini"
                                ></el-input-number>
                            </div>
                        </div>
                        <div class="form-item form-item-textarea">
                            <label>文本内容</label>
                            <div>
                                <el-input
                                        type="textarea"
                                        v-model="data.text"
                                        controls-position="right"
                                        @change="handleChange"
                                        placeholder="文本内容"
                                        size="mini"
                                ></el-input>
                            </div>
                        </div>
                    </div>
                </collapse>

            </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="数据" name="data">
            <el-scrollbar class="tab-panel">
                <div class="item item-my-data">
                    <label>我的数据
                        <el-button size="mini" type="primary" @click="handleShowDataEdit">编辑</el-button>
                    </label>
                    <div class="data-input">
                        <json-viewer
                                v-if="data.data && typeof data.data === 'object'"
                                :value="data.data"
                                class="json-viewer"
                                :expand-depth="5"
                        ></json-viewer>
                        <div v-else class="data-textarea" v-text="nodeData"></div>

                        <code-edit
                                :value="nodeData"
                                :visible.sync="visibleDataEditor"
                                @submit="handleChangeData"
                                @cancel="handleCloseDataEdit"
                        ></code-edit>
                    </div>
                </div>
            </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="结构" name="structure">
            <el-scrollbar class="tab-panel structure-panel">
                <div


                        @click="$_activePens(data)"
                        :class="{
                                    'item':true,
                                    'status-lock' : data.locked,
                                    'status-ban-view':!data.visible
                        }"
                >
                    <div class="node-icon">
                        <i v-if="data.type === 0" class="el-icon-picture-outline"></i>
                        <i v-else-if="data.type === 1"
                           class="ts-icon ts-icon-tubiaoshangshengqushi"></i>
                    </div>
                    <span class="node-name" v-text="$_getPenLabel(data)"></span>
                    <div class="node-action">
                        <div>
                            <i
                                    v-if="!data.locked"
                                    class="ts-icon ts-icon-lock btn-action"
                                    @click="$_setPenLock(data,1)"></i>
                            <i

                                    v-else
                                    class="ts-icon ts-icon-unlock btn-action"
                                    @click="$_setPenLock(data,0)"></i>

                        </div>
                        <div>
                            <i
                                    v-if="data.visible === true"
                                    class="ts-icon ts-icon-view btn-action"
                                    @click="$_setPenVisible(data,false)"
                            ></i>
                            <i
                                    v-else
                                    class="ts-icon ts-icon-ban-view btn-action"
                                    @click="$_setPenVisible(data,true)"
                            ></i>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import penMixin from './mixins/pens'
    import Collapse from "../../Collapse";
    import Dropdown from '../../Dropdown'
    import {lineDash, lineNames, arrows} from '../../../options/props-options'
    import JsonViewer from 'vue-json-viewer/ssr'
    import 'vue-json-viewer/style.css'
    import CodeEdit from "./CodeEdit";

    export default {
        name: "LineProps",
        components: {
            Collapse, Dropdown, JsonViewer, CodeEdit
        },
        mixins: [penMixin],
        inject:['config'],
        props: {
            line: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                data: this.line,
                lineActive: 'appearance',
                lineDash: lineDash,
                lineNames: lineNames,
                arrows: arrows,
                visibleDataEditor: false
            }
        },
        watch: {
            line(newValue) {
                this.data = newValue
            },
        },
        computed: {
            nodeData() {
                return typeof this.data.data === 'object' ? JSON.stringify(this.data.data, null, 4) : this.data.data;
            }
        },
        methods: {
            handleChange() {
                this.$emit('change', this.data);
            },
            handleSetLineDash(dash) {
                switch (dash) {
                    case 0:
                        this.$set(this.data, 'lineDash', undefined);
                        break;
                    case 1:
                        this.$set(this.data, 'lineDash', [5, 5]);
                        break;
                    case 2:
                        this.$set(this.data, 'lineDash', [10, 10]);
                        break;
                    case 3:
                        this.$set(this.data, 'lineDash', [10, 10, 2, 10]);
                        break;
                }
                this.handleChange();
            },
            handleSetLineName(lineType) {
                this.$set(this.data, 'name', lineType.name);
                this.handleChange();
            },
            getLineSvgPathD() {
                for (let item of this.lineNames) {
                    if (item.name === this.data.name) {
                        return item.pathD
                    }
                }
                return '';
            },
            /** 获取箭头图标 */
            getArrowIcon(mod = 'from') {
                let key = this.data[mod + 'Arrow'] || '';
                for (let item of this.arrows) {
                    if (item.value === key) {
                        return item.icon
                    }
                }
                return '';
            },
            /** 修改起点，终点箭头 */
            handleSetArrow(mod = 'from', arrow) {
                let key = mod + 'Arrow';
                this.$set(this.data, key, arrow.value);
                this.handleChange();
            },
            handleChangeData(value) {
                let data = '';
                try {
                    data = JSON.parse(value);
                } catch (e) {
                    data = value;
                }
                this.$set(this.data, 'data', data);
                this.handleChange();
                this.handleCloseDataEdit();
            },
            handleShowDataEdit() {
                this.visibleDataEditor = true;
            },
            handleCloseDataEdit() {
                this.visibleDataEditor = false;
            }
        }
    }
</script>
<style lang="scss">
    @import "styles/main";
</style>
<style lang="scss" scoped>

    .line-props-tabs {
        .tab-panel {
            height: calc(100vh - 90px);

            .btn-icon-action {
                cursor: pointer;

                &:hover {
                    color: #1E9FFF;
                }
            }
            .item-my-data {
                & > label {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    padding: 0 15px;
                }

                .data-input {
                    .data-textarea {
                        white-space: pre-line;
                        padding: 20px;
                        min-height: 300px;
                    }
                }
            }

        }

    }
</style>
