<template>
    <div class="select-icons-card" >
        <span class="select-icon-title">
            <span>选择字体图标</span>  <span class="btn-cancel" @click="handleCancel">返回</span></span>
        <el-scrollbar class="icon-list">
            <collapse
                    class="icon-group"
                    v-for="(item,index) in iconModules"
                    :key="index"
                    :title="item.label"
            >
                <template slot="main">
                    <div class="icon-group-list">
                        <i
                                v-for="(icon,iconIndex) in item.glyphs"
                                :key="iconIndex"
                                :class="getIconClassName(item,icon)"
                                @click="handleSelectIcon(item,icon)"
                        ></i>
                    </div>
                </template>
            </collapse>

        </el-scrollbar>
    </div>
</template>

<script>
    import iconModules from './IconData/index'
    import Collapse from "../../Collapse";

    export default {
        name: "SelectIconsCard",
        components: {
            Collapse
        },
        data() {
            return {
                iconModules: iconModules,
            }
        },
        created() {
            console.log(iconModules)
        },
        mounted() {
        },
        methods: {
            /** 选择图标 */
            handleSelectIcon(group, icon) {
                icon.iconFamily = group.fontFamily
                icon.iconClassName = this.getIconClassName(group, icon);
                this.$emit('select', icon);
            },
            /** 获取图标class */
            getIconClassName(group, icon) {
                return `${group.fontFamily} ${group.cssPrefixText}${icon.font_class}`;
            },
            /** 关闭图标选择框 */
            handleCancel() {
                this.$emit('cancel');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .select-icons-card {
        width: 100%;
        height: calc(100vh - 90px);

        .select-icon-title {
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            border-bottom: 1px solid #ececec;
            line-height: 30px;
            font-size: 12px;
            padding: 0 10px;

            span:first-child {
                font-weight: bold;
            }

            span.btn-cancel {
                color: #1E9FFF;
                cursor: pointer;
            }
        }

        .icon-list {
            height: calc(100vh - 120px);
            .icon-group-list {
                padding: 20px;

                i {
                    width: 25%;
                    display: inline-block;
                    line-height: 1;
                    text-align: center;
                    text-decoration: none !important;
                    cursor: pointer;
                    font-size: 30px !important;


                    &:hover {
                        color: #1890ff;
                    }
                }
            }
        }
    }
</style>
