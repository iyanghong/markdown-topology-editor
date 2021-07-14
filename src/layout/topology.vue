<template>
    <div
            class="topology-layout"
            v-if="isCallback === false || (isCallback === true && show === true)"
            :style="{'top' : top}"
    >
        <slot
                v-if="$scopedSlots.header"
                name="header"
                :is-callback="isCallback"
                :canvas-data="canvasData"
        >
        </slot>
        <div v-else>
            <topology-navigate-bar
                    v-if="isCallback"
                    :is-callback="isCallback"
                    @success="handleSuccess"
                    @cancel="handleCancel"
                    @handleEvent="handleEvent"
                    :canvas-data="canvasData"
            ></topology-navigate-bar>
            <topology-navigate-bar
                    v-else
                    :canvas-data="canvasData"
                    @handleEvent="handleEvent"
            ></topology-navigate-bar>
        </div>
        <topology-body
                :events="events"
                :ref="topologyKey"
                :uploadImage="uploadImage"
                :default-open-data="defaultOpenData"
                @updateData="handleUpdateCanvasData"
        >

        </topology-body>
        <remote-css href="//at.alicdn.com/t/font_2598515_r5t3uheph2a.css"></remote-css>
    </div>
</template>

<script>
    import Vue from 'vue';
    //导入ElementUI框架
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'

    Vue.use(ElementUI);

    import TopologyNavigateBar from '../packages/NavigateBar'
    import TopologyBody from '../packages/TopologyBody'
    import config from "../config";
    import '../styles/css/index.css'

    export default {
        name: "TopologyLayout",
        components: {
            TopologyNavigateBar,
            TopologyBody,
            'remote-css': {
                render(createElement) {
                    return createElement('link', {attrs: {rel: 'stylesheet', href: this.href}});
                },
                props: {
                    href: {type: String, required: true},
                },
            },
        },
        provide() {
            return {
                config: this.getConfig()
            }
        },
        props: {
            /** 选项 */
            options: {
                type: Object,
                default: null
            },
            /** 是否开启回调 */
            isCallback: {
                type: Boolean,
                default: false
            },
            /**
             * 上传图片方法，不设置则关闭上传功能。
             * 格式应为promise回调图片路径
             * */
            uploadImage: {
                type: Function,
                default: null
            },
            /** 是否显示 */
            visible: {
                type: Boolean,
                default: true
            },
            /** 添加top 防止预留被顶部nav遮挡 */
            top: {
                default: 0
            },
            /**
             * 默认打开数据，用props传递防止画布未渲染造成画布找不到问题
             * */
            defaultOpenData:{
                type : Object,
                default :null
            },
        },
        data() {
            return {
                topologyKey: `topology-${new Date().getTime()}`,
                show: this.visible,
                config: config,
                events: {
                    name: '',
                    data: null
                },
                canvasData: {
                    scale: 1,
                    lineName: 'curve',
                    fromArrow: '',
                    toArrow: 'triangleSolid',
                    locked: 0
                }
            }
        },
        created() {
        },
        watch: {
            visible(value) {
                this.show = value;
            },
            show(value) {
                this.$emit('update:visible', value);
            }
        },
        methods: {
            toImage() {
                return this.$refs[this.topologyKey].handleToImage();
            },
            getJson() {
                return this.$refs[this.topologyKey].handleGetJson();
            },
            getImages(hasBaseResourcePath = true) {
                return this.$refs[this.topologyKey].handleGetImages(hasBaseResourcePath);
            },
            refreshResourcesPath(plusBaseResourcePath = true){
                return this.$refs[this.topologyKey].handleRefreshResourcesPath(plusBaseResourcePath);
            },
            getConfig() {
                if (this.options !== null) {
                    for (let key in this.options) {
                        this.config[key] = this.options[key];
                    }
                }
                return this.config;
            },
            setConfig(config) {
                this.$refs[this.topologyKey].handleEventChangeState(config);
            },
            handleSuccess() {
                this.$refs[this.topologyKey].handleToImage().then(image => {
                    this.$emit('success', image);
                });
            },
            handleCancel(data) {
                this.show = false;
                this.$emit('cancel', data);
            },
            handleEvent(payload) {
                this.events = payload
            },
            handleUpdateCanvasData(data) {
                this.canvasData = data;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .topology-layout {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', Arial, sans-serif;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        line-height: 2;
        z-index: 999;

        *,
        *:before,
        *:after {
            box-sizing: border-box;
            margin: 0;
        }

        .headers {
            display: flex;
            background-color: #f8f8f8;
            font-size: 0.13rem;
            height: 0.4rem;

            .full {
                flex: 1;
            }

            .logo {
                img {
                    height: 0.22rem;
                    position: relative;
                    top: -0.04rem;
                }
            }
        }

        .el-menu-item,
        .el-submenu__title {
            color: #314659 !important;
            font-size: 0.13rem;
            padding: 0 0.1rem;
            height: 0.39rem !important;
            line-height: 0.39rem !important;

            &.separator {
                border-top: 1px solid #e8e8e8;
                margin: 0 0.1rem;
                height: 0.01rem !important;
                line-height: 0.01rem !important;
            }

            a {
                text-decoration: none;
                color: #314659;
            }

            .iconfont {
                color: #314659;
                font-size: 0.26rem;
            }
        }

    }


</style>
