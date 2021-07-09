<template>

    <div class="topology-navigate-bar">
        <div class="navigate-bar-left">
            <div class="menu-item">
                <el-image class="logo" :src="logo"></el-image>
            </div>
            <dropdown
                    :icon-group="['el-icon-files','el-icon-caret-bottom']"
                    title="文件"
                    dropdown-width="200px">
                <template slot="menus">
                    <div class="item" @click="onMenu('New')">新建<span>Ctrl + N</span></div>
                    <div class="item" @click="onMenu('OpenFile')">打开<span>Ctrl + O</span></div>
                    <div class="item">导入<span>Ctrl + I</span></div>
                    <div class="item divider"></div>
                    <div class="item" @click="onMenu('SaveCache')">保存<span>Ctrl + S</span></div>
                    <div class="item" @click="onMenu('SaveJson')">下载JSON文件</div>
                    <div class="item" @click="onMenu('SavePng')">下载为PNG</div>
                    <div class="item" @click="onMenu('SaveSvg')">下载为SVG</div>
                </template>
            </dropdown>
            <dropdown
                    class="menu-item"
                    :icon-group="['el-icon-edit','el-icon-caret-bottom']"
                    title="编辑"
                    dropdown-width="200px">
                <template slot="menus">
                    <div class="item" @click="onMenu('Undo')">撤消<span>Ctrl+Z</span></div>
                    <div class="item" @click="onMenu('Redo')">恢复<span>Ctrl+Shift+Z</span></div>
                    <div class="item divider"></div>
                    <div class="item" @click="onMenu('Copy')">复制<span>Ctrl+C</span></div>
                    <div class="item" @click="onMenu('Cut')">剪切<span>Ctrl+X</span></div>
                    <div class="item" @click="onMenu('Parse')">粘贴<span>Ctrl+V</span></div>
                </template>
            </dropdown>
            <dropdown icon="el-icon-mobile" dropdown-width="200px">
                <template slot="title">
                    <div class="menu-item icon-butt" style="padding: 0" @click="onMenu('SaveCache')">
                        <i class="el-icon-mobile"></i>
                        <span class="title">保存</span>
                    </div>
                </template>
                <template slot="menus">
                    <div class="item">自动读取缓存
                        <el-switch
                                class="btn-auto-read-cache"
                                size="mini"
                                v-model="autoReadCache"
                                @change="setAutoReadCache"
                                :active-value="1"
                                :inactive-value="0"
                        ></el-switch>
                    </div>
                </template>
            </dropdown>
        </div>

        <div class="navigate-bar-middle">
            <dropdown icon="el-icon-mobile" dropdown-width="300px">
                <template slot="title">
                    <div class="menu-item icon-butt" style="padding: 0" @click="onMenu('SaveCache')">
                        <span class="icon-title">{{scale}}%</span>
                        <span class="title">视图</span>
                    </div>
                </template>
                <template slot="menus">
                    <div class="item scale-item">
                        <el-button class="btn-icon" size="mini" icon="el-icon-minus"
                                   @click="handleChangeSize('narrow')"></el-button>
                        <el-button class="btn-icon" size="mini" icon="el-icon-plus"
                                   @click="handleChangeSize('plus')"></el-button>
                        <el-button size="mini" @click="handleAutoWindowSize">窗口大小</el-button>
                        <el-button size="mini" @click="handleChangeSize('reset')">重置</el-button>
                    </div>
                </template>
            </dropdown>
            <div
                    :class="{'btn-lock-canvas':true,'is-lock' : locked}"
                    @click="handleSetLock"
            >
                <div class="btn-lock-icon">
                    <i v-if="locked" class="ts-icon ts-icon-lock"></i>
                    <i v-else class="ts-icon ts-icon-unlock"></i>
                </div>
                <div class="btn-lock-title" v-text="locked ? '已锁定' :'未锁定'"></div>
            </div>
            <dropdown icon="el-icon-mobile" dropdown-width="200px">
                <template slot="title">
                    <div class="menu-item icon-butt" style="padding: 0" @click="onMenu('SaveCache')">
                        <span class="icon-title">{{lineWidth}}</span>
                        <span class="title">线宽</span>
                    </div>
                </template>
                <template slot="menus">
                    <div class="item">
                        <el-input-number
                                class="form-item-number"
                                v-model="lineWidth"
                                placeholder="线宽"
                                size="mini"
                                @change="handleChangeLineWidth"
                        ></el-input-number>
                    </div>
                </template>
            </dropdown>
            <div
                    v-if="isCallback"
                    class="navigate-bar-callback"
            >
                <div class="btn-cancel" @click="handleCancel"><span>取消</span></div>

                <div class="btn-success" @click="handleSuccess"><span>确定</span></div>
            </div>
            <dropdown dropdown-width="200px">
                <template slot="title">
                    <div class="navigate-bar-middle-title">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <g fill="none" stroke="black" stroke-width="1">
                                    <path :d="getLineSvgPathD()"></path>
                                </g>
                            </svg>
                        </div>
                        <div>
                            <span class="title">连线</span>
                        </div>

                    </div>
                </template>
                <template slot="menus">
                    <div
                            class="item line-item hover"
                            v-for="(item,index) in lineNames"
                            :key="index"
                            @click="handleSetLineName(item)"
                    >
                        <div v-text="item.label"></div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <g fill="none" stroke="black" stroke-width="1">
                                    <path :d="item.pathD"></path>
                                </g>
                            </svg>
                        </div>

                    </div>
                </template>
            </dropdown>

            <dropdown
                    dropdown-width="200px"
                    title="起点箭头"
                    :icon="getFromArrowIcon()"
            >
                <template slot="menus">
                    <div
                            class="item line-item hover"
                            v-for="(item,index) in arrows"
                            :key="index"
                            @click="handleSetArrow('from',item)"
                    >
                        <div v-text="item.label"></div>
                        <div>
                            <i :class="item.icon"></i>
                        </div>

                    </div>
                </template>
            </dropdown>
            <dropdown
                    dropdown-width="200px"
                    title="终点箭头"
                    :icon="getToArrowIcon()"
            >
                <template slot="menus">
                    <div
                            class="item line-item hover"
                            v-for="(item,index) in arrows"
                            :key="index"
                            @click="handleSetArrow('to',item)"
                    >
                        <div v-text="item.label"></div>
                        <div>
                            <i :class="item.icon"></i>
                        </div>

                    </div>
                </template>
            </dropdown>

        </div>
        <div class="navigate-bar-right">

           <!-- <author v-if="$_isLogin"></author>
            <div v-else class="login-panel">
                <span @click="handleLogin">登录</span>
                <el-divider direction="vertical"></el-divider>
                <span @click="handleRegister">注册</span>
            </div>-->
        </div>
    </div>
    <!--<div v-else class="topology-navigate-bar no-login">
        <div class="login-panel">
            您未登录，使用将会受到限制。
            <span @click="handleLogin">登录</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="handleRegister">注册</span>
        </div>
    </div>-->
</template>

<script>
    import cache from "../../../utils/cache";
    // import Author from './author.vue'
    import Dropdown from '../../Dropdown'
    import {lineNames, arrows} from '../../../options/props-options'

    export default {
        name: "TopologyNavigateBar",
        components: { Dropdown},
        props: {
            isCallback: {
                type: Boolean,
                default: false
            },
            canvasData:{
                type : Object,
                default : () => {return {}}
            }
        },
        inject:['config'],
        data() {
            return {
                autoReadCache: this.getAutoReadCache(),
                lineNames: lineNames,
                arrows: arrows,
                lineWidth: this.canvasLineWidth || 1,
                logo : this.config.logo
            }
        },
        computed: {
            scale() {
                return Math.floor(this.canvasData.scale * 100);
            },
            lineName() {
                return this.canvasData.lineName;
            },
            fromArrow() {
                return this.canvasData.fromArrow;
            },
            toArrow() {
                return this.canvasData.toArrow;
            },
            locked() {
                return this.canvasData.locked;
            },
            canvasLineWidth() {
                return this.canvasData.lineWidth;
            }
        },
        watch: {
            canvasLineWidth(newValue) {
                if (newValue && this.lineWidth !== newValue) {
                    this.lineWidth = newValue;
                }
            }
        },
        created() {

        },
        mounted() {
            if (this.getAutoReadCache()) {
                this.onMenu('ReadCache');
            }
        },
        methods: {
            onMenu(name, data) {
                let payload = {
                    name: name
                }
                if (data) {
                    payload.data = data;
                }
                this.$emit('handleEvent',payload);
            },
            getAutoReadCache() {
                let value = cache.get('topology:autoReadCache');
                if (value !== '') {
                    value = parseInt(value);
                }
                if (value !== 0 && value !== 1) value = 0;
                return value;
            },
            setAutoReadCache() {

                cache.set('topology:autoReadCache', this.autoReadCache);
            },
            handleLogin() {
                // this.$_goLogin();
            },
            handleRegister() {
            },
            getLineSvgPathD() {
                for (let item of this.lineNames) {
                    if (item.name === this.lineName) {
                        return item.pathD
                    }
                }
                return '';
            },
            handleSetLineName(lineType) {
                this.onMenu('ChangeState', {
                    lineName: lineType.name
                });
            },
            getToArrowIcon() {
                let value = this.toArrow ? this.toArrow : 'triangleSolid';
                return this.getArrowIcon(value);
            },
            getFromArrowIcon() {
                let value = this.fromArrow ? this.fromArrow : '';
                return this.getArrowIcon(value);
            },
            /** 获取箭头图标 */
            getArrowIcon(value) {
                for (let item of this.arrows) {
                    if (item.value === value) {
                        return item.icon
                    }
                }
                return '';
            },
            handleSetArrow(mod = 'from', arrow) {
                let key = mod === 'from' ? 'fromArrow' : 'toArrow';
                let data = {};
                data[key] = arrow.value
                this.onMenu('ChangeState', data);
            },
            handleSetLock() {
                // console.log(this.locked)
                let locked = this.locked ? 0 : 1;
                this.onMenu('ChangeState', {
                    locked: locked
                });
            },
            handleChangeSize(method) {
                let scale = this.canvasData.scale;
                switch (method) {
                    case 'narrow':
                        scale = Number(scale) - 0.1
                        break;
                    case 'plus':
                        scale = Number(scale) + 0.1
                        break;
                    case 'reset':
                        scale = 1;
                        break;
                }
                scale = scale.toFixed(1);
                if (0.25 < scale < 5) {
                    this.onMenu('ChangeState', {
                        scale: scale
                    });
                }

            },
            handleChangeLineWidth() {
                // console.log(this.lineWidth)
                this.onMenu('ChangeState', {
                    lineWidth: this.lineWidth
                });
            },
            handleAutoWindowSize() {
                this.onMenu('AutoWindowSize');
            },
            handleSuccess() {
                this.$emit('success');
            },
            handleCancel() {
                this.$emit('cancel')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .topology-navigate-bar {
        height: 50px;
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        padding: 0 12px;

        &.no-login {
            text-align: center;
        }

        .login-panel {
            font-size: 12px;
            line-height: 50px;
            margin: 0 auto;

            span {
                color: #1E9FFF;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        * {
            box-sizing: border-box;
        }

        .scale-item {
            .btn-icon {
                border: 1px solid transparent;
            }

            /*i{
                margin-left: 10px;
            }*/
        }

        .menu-item {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 15px;
            text-align: center;
            cursor: pointer;
            span.icon-title{
                font-size: 12px;
                line-height: 25px;
            }
            .btn-auto-read-cache {
                margin-top: 5px;
            }


        }

        .navigate-bar-left {
            display: flex;
            flex-wrap: nowrap;
            height: 100%;
            min-width: 10px;

            .logo {
                height: 36px;
                width: 36px;

            }
        }

        .navigate-bar-middle {
            display: flex;
            flex-wrap: nowrap;
            min-width: 10px;

            * {
                box-sizing: border-box;
            }

            .navigate-bar-callback {
                width: 160px;
                height: 52px;
                display: flex;
                flex-wrap: nowrap;
                transform: perspective(2em) rotateX(-10deg);
                margin: 0 20px;

                & > div {
                    width: 80px;
                    height: 100%;
                    text-align: center;
                    cursor: pointer;

                    & > span {
                        font-size: 12px;
                        color: #ffffff;
                    }

                    &:hover {
                        opacity: 0.5;
                    }
                }

                .btn-cancel {
                    background-color: #F56C6C;
                }

                .btn-success {
                    background-color: #67C23A;
                }
            }

            .navigate-bar-middle-title {
                width: 80px;
                display: flex;
                flex-direction: column;

                div:first-child {
                    height: 20px;
                }

                div:nth-child(2) {
                    height: 12px;
                    line-height: 12px;
                }


                svg {
                    width: 40px;
                    height: 15px;
                    line-height: 25px;
                }

                .title {
                    line-height: 12px;
                }
            }

            .line-item {
                display: flex;
                justify-content: space-between;
                flex-wrap: nowrap;
                padding: 5px 12px;

                div:first-child {
                    min-width: 80px;
                    text-align: left;
                    line-height: 20px;
                }

                div:nth-child(2) {
                    width: 60px;
                    text-align: right;

                    svg {
                        width: 60px;
                    }
                }
            }


            .btn-lock-canvas {
                display: flex;
                flex-direction: column;
                width: 60px;
                text-align: center;
                cursor: pointer;
                justify-content: center;

                & > div {
                    width: 100%;
                }

                .btn-lock-icon {
                    height: 25px;
                    line-height: 25px;
                }

                .btn-lock-title {
                    height: 12px;
                    line-height: 12px;
                    font-size: 12px;
                }

                &.is-lock {
                    color: #E6A23C;
                }

                &:hover {
                    color: #1E9FFF;
                }
            }
        }


        .navigate-bar-right {


        }


    }
</style>
