<template>
    <div
            :class="{'ts-dropdown topology-dropdown':true,'active-method-hover' : activeMethod === 'hover'}"


    >
        <div class="dropdown-title" @click="handleClick" :style="{'flex-direction':titleLayout}">
            <slot v-if="$scopedSlots.title" name="title"></slot>
            <template v-else>
                <div class="icon-group" v-if="iconGroup.length > 0">
                    <i v-for="(icon,index) in iconGroup" :key="index" :class="icon"></i>
                </div>
                <i v-else-if="icon !== ''" :class="icon"></i>
                <span :class="{'title':true,'title-left':iconGroup.length > 0} ">{{title}}</span>
            </template>
        </div>
        <div :class="{'dropdown':true,'active':active}" :style="dropdownStyle">
            <slot name="menus">

            </slot>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props: {
            title: {
                default: ''
            },
            iconGroup: {
                type: Array,
                default: () => {
                    return []
                }
            },
            icon: {
                type: String,
                default: ''
            },
            titleLayout: {
                type: String,
                default: 'column'
            },
            dropdownWidth: {
                type: String,
                default: ''
            },
            activeMethod: {
                type: String,
                default: 'hover'
            }
        },
        data() {
            return {
                dropdownStyle: {},
                active: false
            }
        },
        created() {
            if (this.dropdownWidth) {
                this.dropdownStyle.width = this.dropdownWidth;
            }
            // console.log(this.iconGroup)
        },
        methods: {
            handleClick() {
                if(this.activeMethod !== 'click') return false
                this.$set(this,'active',true);
                setTimeout(() => {
                    document.documentElement.addEventListener('click', this.handleRemove);
                },50);
            },
            handleRemove(){
                this.$set(this,'active',false);
                document.documentElement.removeEventListener('click', this.handleRemove);
            }
        }
    }
</script>

<style lang="scss">
    .ts-dropdown.topology-dropdown {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 15px;
        text-align: center;
        cursor: pointer;

        .dropdown-title{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
        }
        &.ts-dropdown-group {
            text-align: left;
        }


        .icon-group {
            line-height: 25px;
            height: 25px;
        }

        i {
            line-height: 25px;
        }

        &.active-method-hover:hover {
            .dropdown {
                display: block;
            }
        }

        &:hover {
            color: #1E9FFF;


        }

        span.title {
            font-size: 12px;
            line-height: 1em;

            &.title-left {
                text-align: left;
            }
        }
        svg {
            height: 15px;
        }
        .dropdown {
            position: absolute;
            display: none;
            width: auto;
            min-width: calc(100%);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            z-index: 100;
            background-color: #fff;
            padding: 8px 0;
            left: 0;
            top: 100%;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            &.active{
                display:block;
            }
            .item {
                line-height: 30px;
                padding: 0 15px;
                font-size: 13px;
                color: #595959;
                position: relative;
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 30px;
                box-sizing: border-box;
                &.hover{
                    &:hover {
                        background-color: #f8f8f8;
                    }
                }
                &:hover {
                    color: #1E9FFF;
                }

                &.divider {
                    width: calc(100% - 30px);
                    height: 0.5px;
                    background-color: #e5e5e5;
                    margin: 5px 15px;
                }
            }


        }
    }
</style>
