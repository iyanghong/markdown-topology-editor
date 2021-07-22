<template>
    <div class="topology-collapse">
        <div class="collapse-title-panel" @click="handleCollapse">
            <div>
                <span v-text="title"></span>
            </div>
            <div>
                <i :class="visibleCollapse === false ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
        </div>
        <el-collapse-transition>
            <div class="collapse-panel" v-show="visibleCollapse">
                <slot name="main"></slot>
                <slot></slot>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
    export default {
        name: "Collapse",
        props: {
            visible: {
                default: true
            },
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                visibleCollapse: this.visible || false
            }
        },
        methods: {
            handleCollapse() {
                this.visibleCollapse = !this.visibleCollapse;
            }
        }
    }
</script>

<style lang="scss">
    .topology-collapse {
        background-color: #ffffff;

        * {
            outline: none;
        }

        *, :after, :before {
            box-sizing: border-box;
        }
        /*margin: 10px 0;*/
        border-bottom: 1px solid #e5e5e5;

        .collapse-title-panel {
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
    }
</style>
