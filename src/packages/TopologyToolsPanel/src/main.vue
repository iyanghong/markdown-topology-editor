<template>
    <el-scrollbar class="topology-tools-panel">

        <div class="tools-group" v-for="(item, index) in graphics" :key="index">
            <div class="title-panel" @click="handleActive(index)">
                <div>
                    <i :class="item.show === false ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
                    <span>{{ item.group }}</span>
                </div>
                <div>
                    <i :class="item.show === false ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                </div>
            </div>
            <el-collapse-transition>
                <div v-show="item.show" :class="{'graphics' : true,'show':item.show !== false}">
                    <a
                            v-for="(btn, i) in item.children"
                            :key="i"
                            :title="btn.name"
                            :draggable="btn.data"
                            @dragstart="onDrag($event, btn)"
                    >
                        <i :class="`iconfont ${btn.icon}`"></i>
                    </a>
                </div>
            </el-collapse-transition>
        </div>
    </el-scrollbar>
</template>

<script>
    export default {
        name: "TopologyToolsPanel",
        props: {
            tools: {
                type: Array
            }
        },
        data() {
            return {
                graphics: this.tools
            }
        },
        created() {

        },
        methods: {
            onDrag($event, btn) {
                this.$emit('toolDrag', $event, btn)
            },
            handleActive(index) {
                this.graphics[index].show = !this.graphics[index].show;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .topology-tools-panel {
        height: calc(100vh - 40px);
        * {
            outline: none;
        }

        *, :after, :before {
            box-sizing: border-box;
        }

        .tools-group {
            margin-bottom: 10px;

            .title-panel {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 15px;
                cursor: pointer;
                font-size: 12px;

                &:hover {
                    div:first-child {
                        color: #1890ff;
                    }
                }
            }

            .graphics {
                padding: 15px;

                a {
                    display: inline-block;
                    color: #314659;
                    line-height: 1;
                    width: 25%;
                    text-align: center;
                    text-decoration: none !important;
                    cursor: pointer;

                    .iconfont {
                        font-size: 25px !important;
                        width: 25px;
                    }

                    &:hover {
                        color: #1890ff;
                    }
                }
            }
        }
    }
</style>
