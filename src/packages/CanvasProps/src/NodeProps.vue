<template>
    <el-tabs class="node-props-tabs" v-model="nodeActive" :stretch="true">

        <el-tab-pane label="外观" name="appearance">
            <el-scrollbar class="tab-panel tab-scrollbar-container" wrap-class="scrollbar-wrapper">

                <div class="collapse-item">
                    <div class="title-panel" @click="handleActive('position')">
                        <div>
                            <span>位置和大小</span>
                        </div>
                        <div>
                            <i :class="collapse.position === false ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div v-show="collapse.position" class="form-group">
                            <div class="form-item">
                                <label>X</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            :precision="config.valuePrecision"
                                            v-model="data.rect.x"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="X"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>Y</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.rect.y"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="Y"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>宽(px)</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.rect.width"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="宽(px)"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>高(px)</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.rect.height"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="高(px)"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>旋转</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.rotate"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="旋转角度"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>圆角</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.borderRadius"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="圆角"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>内边距 - 左</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.paddingLeft"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="内边距 - 左"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>内边距 - 右</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.paddingRight"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="内边距 - 右"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>内边距 - 上</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.paddingTop"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="内边距 - 上"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>内边距 - 下</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.paddingBottom"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="内边距 - 下"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="collapse-item">
                    <div class="title-panel" @click="handleActive('style')">
                        <div>
                            <span>样式</span>
                        </div>
                        <div>
                            <i :class="collapse.style === false ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div class="form-group" v-show="collapse.style">
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
                                            <!--<div class="item"><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g fill="none" stroke="black" stroke-width="1"><path d="M0 9 l85 0"></path></g></svg></div>
                                            <div class="item"><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g fill="none" stroke="black" stroke-width="1"><path stroke-dasharray="5 5" d="M0 9 l85 0"></path></g></svg></div>
                                            <div class="item"><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g fill="none" stroke="black" stroke-width="1"><path stroke-dasharray="10 10" d="M0 9 l85 0"></path></g></svg></div>
                                            <div class="item"><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g fill="none" stroke="black" stroke-width="1"><path stroke-dasharray="10 10 2 10" d="M0 9 l85 0"></path></g></svg></div>-->
                                        </template>
                                    </dropdown>
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
                                <label>线条颜色</label>
                                <div>
                                    <el-color-picker size="mini" v-model="data.strokeStyle"
                                                     @change="handleChange"></el-color-picker>
                                </div>
                            </div>
                            <div class="form-item form-item-select">
                                <label>背景类型</label>
                                <div>
                                    <el-select size="mini" v-model="data.bkType" @change="handleChange">
                                        <el-option :value="0" label="纯色背景"></el-option>
                                        <el-option :value="1" label="线性渐变"></el-option>
                                        <el-option :value="2" label="径向渐变"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="form-item" v-if="data.bkType === 0">
                                <label>背景颜色</label>
                                <div>
                                    <el-color-picker size="mini" v-model="data.fillStyle"
                                                     @change="handleChange"></el-color-picker>
                                </div>
                            </div>
                            <div class="form-item" v-if="data.bkType === 1 || data.bkType === 2">
                                <label>开始颜色</label>
                                <div>
                                    <el-color-picker size="mini" v-model="data.gradientFromColor"
                                                     @change="handleChange"></el-color-picker>
                                </div>
                            </div>
                            <div class="form-item" v-if="data.bkType === 1 || data.bkType === 2">
                                <label>结束颜色</label>
                                <div>
                                    <el-color-picker size="mini" v-model="data.gradientToColor"
                                                     @change="handleChange"></el-color-picker>
                                </div>
                            </div>
                            <div class="form-item" v-if="data.bkType === 1">
                                <label>渐变角度</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.gradientAngle"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="透明度"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item" v-if="data.bkType === 2">
                                <label>渐变半径</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.gradientRadius"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="透明度"
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
                        </div>
                    </el-collapse-transition>
                </div>

                <div class="collapse-item">
                    <div class="title-panel" @click="handleActive('font')">
                        <div>
                            <span>文字</span>
                        </div>
                        <div>
                            <i :class="collapse.font === false ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div class="form-group" v-show="collapse.font">
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
                    </el-collapse-transition>
                </div>

                <div class="collapse-item">
                    <div class="title-panel" @click="handleActive('image')">
                        <div>
                            <span>图片</span>
                        </div>
                        <div>
                            <i :class="collapse.image === false ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div class="form-group" v-show="collapse.image">
                            <div class="form-item">
                                <label>图片选择</label>
                                <div>
                                    <upload :upload-image="uploadImage" @change="handleChangeBackgroundImage">
                                        <el-image
                                                v-if="data.image"
                                                :src="data.image"
                                                class="upload-images"
                                        ></el-image>
                                        <i v-else class="el-icon-upload"></i>
                                    </upload>
                                </div>
                            </div>
                            <div class="form-item form-item-textarea">
                                <label>图片路径</label>
                                <div>
                                    <el-input
                                            v-model="data.image"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="图片路径"
                                            size="mini"
                                    ></el-input>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>图片宽度</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.imageWidth"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="自适应"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>图片高度</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.imageHeight"
                                            :precision="config.valuePrecision"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="自适应"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>保持比例</label>
                                <div>
                                    <el-switch size="mini" v-model="data.imageRatio"
                                               @change="handleChange"></el-switch>
                                </div>
                            </div>
                            <div class="form-item form-item-select">
                                <label>图片对齐</label>
                                <div>
                                    <el-select size="mini" v-model="data.imageAlign" @change="handleChange">
                                        <el-option value="left" label="左对齐"></el-option>
                                        <el-option value="center" label="居中"></el-option>
                                        <el-option value="right" label="右对齐"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="collapse-item">
                    <div class="title-panel" @click="handleActive('iconfont')">
                        <div>
                            <span>字体图标</span>
                        </div>
                        <div>
                            <i :class="collapse.iconfont === false ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div class="form-group" v-show="collapse.iconfont">
                            <div class="form-item">
                                <label>图标</label>
                                <div>
                                    <div v-if="data.iconClassName" class="has-icon flex">
                                        <i
                                                :class="'btn-icon-action '+data.iconClassName"
                                                @click="handleVisibleIconPanel"
                                        ></i>
                                        <i class="btn-icon-action ts-icon ts-icon-delete"
                                           @click="handleDeleteIcon"></i>
                                    </div>

                                    <i v-else class="btn-icon-action ts-icon ts-icon-edit"
                                       @click="handleVisibleIconPanel"></i>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>图标大小</label>
                                <div>
                                    <el-input-number
                                            class="form-item-number"
                                            v-model="data.iconSize"
                                            :precision="0"
                                            controls-position="right"
                                            @change="handleChange"
                                            placeholder="图标大小"
                                            size="mini"
                                    ></el-input-number>
                                </div>
                            </div>
                            <div class="form-item">
                                <label>图标颜色</label>
                                <div>
                                    <el-color-picker size="mini" v-model="data.iconColor"
                                                     @change="handleChange"></el-color-picker>
                                </div>
                            </div>
                        </div>
                    </el-collapse-transition>
                </div>
            </el-scrollbar>
            <div class="icons-view-panel" v-if="visibleIconsPanel">
                <select-icons-card @select="handleSelectIcon" @cancel="handleCloseIconPanel"></select-icons-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="数据" name="data">
            <el-scrollbar class="tab-panel tab-scrollbar-container" wrap-class="scrollbar-wrapper">

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
            <div class="tab-panel structure-panel">
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
            </div>

        </el-tab-pane>
    </el-tabs>
</template>

<script>

    import Dropdown from '../../Dropdown'
    import Upload from "../../Upload";
    import CodeEdit from "./CodeEdit";

    const noImages = 'global/noimg.png';
    import SelectIconsCard from './SelectIconsCard'
    import penMixin from './mixins/pens'
    import JsonViewer from 'vue-json-viewer/ssr'
    import 'vue-json-viewer/style.css'

    let config = {};
    export default {
        name: "NodeProps",
        components: {
            Dropdown, Upload, SelectIconsCard, CodeEdit, JsonViewer
        },
        inject: ['config'],
        mixins: [penMixin],
        filters: {
            resources: value => {
                if (value && /^(https|http)\:\/\//.test(value)) {	//eslint-disable-line
                    return value
                }
                return config.resourcePath + value;
            }
        },
        directives: {
            number: {
                // 指令的定义
                componentUpdated(el) {
                    console.log(el)
                    let value = el.value;
                    if(value) {
                        value = value.replace(/(^\s*)|(\s*$)/g, "");
                        const reg = /[^\d.]/g;

                        // 只能是数字和小数点，不能是其他输入
                        value = value.replace(reg, "");

                        // 保证第一位只能是数字，不能是点
                        value = value.replace(/^\./g, "");
                        // 小数只能出现1位
                        value = value
                            .replace(".", "$#$")
                            .replace(/\./g, "")
                            .replace("$#$", ".");
                        // 小数点后面保留2位
                        value = value.replace(
                            // eslint-disable-next-line no-useless-escape
                            /^(\-)*(\d+)\.(\d\d).*$/,
                            "$1$2.$3"
                        );
                        el.value = value;
                    }
                }
            }
        },
        props: {
            node: {
                type: Object,
                required: true
            },
            uploadImage : {
                type : Function,
                default : null
            },
        },
        data() {
            return {
                data: this.node,
                nodeActive: 'appearance',
                appearanceActive: [
                    'position',
                    'style',
                    'font',
                    'image',
                    'iconfont'
                ],
                /*折叠*/
                collapse: {
                    position: true,
                    style: true,
                    font: true,
                    image: true,
                    iconfont: true,
                },
                lineDash: [[], [5, 5], [10, 10], [10, 10, 2, 10]],
                noImages: noImages,
                visibleIconsPanel: false,
                visibleDataEditor: false
            }
        },
        watch: {
            node(newValue) {
                this.data = newValue
            },
        },
        computed: {
            nodeData() {
                return typeof this.data.data === 'object' ? JSON.stringify(this.data.data, null, 4) : this.data.data;
            }
        },
        created() {
            config = this.config;
        },
        methods: {
            handleChange() {
                this.$emit('change', this.data);
            },
            handleActive(key) {
                this.collapse[key] = !this.collapse[key];
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
            handleChangeBackgroundImage(url) {
                setTimeout(() => {
                    this.$set(this.data, 'image', this.config.resourcePath + url);
                    // this.$set(this.data, 'image', this.$config.app.baseResourcesUrl + response.data.url);
                    this.handleChange();
                }, 100);
            },
            handleVisibleIconPanel() {

                this.visibleIconsPanel = true;
            },
            handleCloseIconPanel() {
                this.visibleIconsPanel = false;
            },
            handleSelectIcon(icon) {
                // let unicode = "";
                this.$set(this.data, 'icon', String.fromCharCode(icon.unicode_decimal));
                this.$set(this.data, 'iconFamily', icon.iconFamily);
                this.$set(this.data, 'iconClassName', icon.iconClassName);
                this.handleChange();
                this.handleCloseIconPanel();
            },
            handleDeleteIcon() {
                this.$set(this.data, 'icon', '');
                this.$set(this.data, 'iconFamily', '');
                this.$set(this.data, 'iconClassName', '');
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


    .node-props-tabs {
        background-color: #ffffff;

        * {
            outline: none;
        }

        *, :after, :before {
            box-sizing: border-box;
        }

        .collapse-item {
            /*margin: 10px 0;*/
            border-bottom: 1px solid #e5e5e5;

            .title-panel {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 15px;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
                font-size: 12px;

                div:first-child {
                    font-weight: bold;
                    font-size: 14px;
                }

                &:hover {
                    div:first-child {
                        color: #1890ff;
                    }
                }
            }

            .form-group {
                border-bottom: none;
                font-size: 12px;

                .form-item-svg {
                    height: 15px;
                }

                .dropdown-title {
                    display: flex;

                    flex-wrap: nowrap;
                }

                .dropdown-item {
                    height: 15px;

                    svg {
                        height: 15px;
                    }
                }

                .upload-images {
                    width: 40px;
                    height: 40px;
                }
            }


        }

        .tab-panel {
            .btn-icon-action {
                cursor: pointer;

                &:hover {
                    color: #1E9FFF;
                }
            }
        }

        .tab-scrollbar-container {
            position: relative;
            overflow: hidden;
            height: calc(100vh - 90px);
        }

        .icons-view-panel {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #fff;
            z-index: 1000;
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

        /*item-my-data*/
    }


</style>
