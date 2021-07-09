<template>
    <div class="topology-view" :style="{'top' : top}">
        <div v-if="showConsole" class="topology-view-console">
            <div class="scale-item">
                <el-button class="btn-icon" size="mini" icon="el-icon-minus"
                           @click="handleChangeSize('narrow')"></el-button>
                <el-button class="btn-icon" size="mini" icon="el-icon-plus"
                           @click="handleChangeSize('plus')"></el-button>
                <el-button size="mini" @click="handleAutoWindowSize">窗口大小</el-button>
                <el-button size="mini" @click="handleChangeSize('reset')">重置</el-button>
            </div>
        </div>
        <topology-body
                :ref="topologyKey"
                :events="events"
                @updateData="handleUpdateCanvasData"
                :default-open-data="data"
                :is-view="true"
        ></topology-body>
    </div>
</template>

<script>
    import TopologyBody from '../packages/TopologyBody'
    import config from "../config";
    export default {
        name: "topologyView",
        props:{
            /** 添加top 防止预留被顶部nav遮挡 */
            top: {
                default: 0
            },
            data:{
                type :Object,
                default :null
            },
            showConsole:{
                type : Boolean,
                default : true
            }
        },
        components:{
            TopologyBody
        },
        provide() {
            return {
                config: this.getConfig()
            }
        },
        data() {
            return {
                topologyKey: `topology-${new Date().getTime()}`,
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
        methods:{
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
            handleEvent(payload) {
                this.events = payload
            },
            handleUpdateCanvasData(data) {
                this.canvasData = data;
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
                    this.events = {
                        name : 'ChangeState',
                        data :{
                            scale: scale
                        }
                    }
                }
            },
            handleAutoWindowSize() {
                this.events = {
                    name : 'AutoWindowSize'
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .topology-view{
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
        .topology-view-console{
            background: transparent;
            position: fixed;
            top: 20px;
            left: 0;
            width: 100%;
            text-align: center;
            z-index: 1000;
            .scale-item{
                background: transparent;
                width: 300px;
                margin: 0 auto;
            }
        }
    }
</style>