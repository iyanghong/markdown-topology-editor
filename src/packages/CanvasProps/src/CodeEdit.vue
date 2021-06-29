<template>
    <div class="code-edit" v-if="show">
        <div class="code-edit-title">
            <span>编辑</span>
            <div class="btn-panel">
                <div><i class="el-icon-check" @click="handleSubmit"></i></div>
                <div><i class="el-icon-close" @click="handleCancel"></i></div>
            </div>
        </div>
        <div class="code-edit-main">
            <div class="code-edit-line">
                <textarea v-model="lineContent" wrap="off" cols="2" disabled ref="codeEditLine"></textarea>
            </div>
            <textarea class="code-edit-textarea" @keyup="handleKeyUp" v-model="content" @scroll="handleScroll"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CodeEdit",
        props:{
            value : {
                default:''
            },
            visible : {
                type : Boolean,
                default : false
            }
        },
        data() {
            return {
                content: this.value,
                lineContent: '',
                show : this.visible,
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.handleKeyUp();
            });
        },
        watch:{
            content(value){
                this.$emit('update:value',value);
                this.handleKeyUp();
            },
            value(value){
                this.content = value;
            },
            visible(value){
                this.show = value;
            },
            show(value){
                this.$emit('update:visible',value)
            }
        },
        methods: {
            handleScroll(e) {
                this.$refs.codeEditLine.scrollTop = e.target.scrollTop;
            },
            handleKeyUp() {
                let str = this.content.replace(/\r/gi, "");
                str = str.split("\n");
                this.handleSetLine(str.length);
            },
            handleSetLine(n) {
                let lineStr = '';
                for (let i = 1; i <= n; i++) {
                    if (document.all) {
                        lineStr += i + "\r\n";//判断浏览器是否是IE
                    } else {
                        lineStr += i + "\n";
                    }
                }
                this.lineContent = lineStr;
            },
            handleCancel(){
                this.$emit('cancel',this.content);
            },
            handleSubmit(){
                this.$emit('submit',this.content);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .code-edit {
        position: fixed;
        width: 50vw;
        height: 70vh;
        top: 50%;
        left: 50%;
        margin-top: -35vh;
        margin-left: -25vw;
        background-color: #ffffff;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        border-radius: 5px;

        .code-edit-title {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ececec;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;

            .btn-panel {
                display: flex;
                flex-wrap: nowrap;

                i {
                    cursor: pointer;
                    margin-left: 10px;
                    border-radius: 50%;
                    padding: 3px;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
                    &:hover {
                        color: #1E9FFF;
                    }
                }
            }
        }

        .code-edit-main {
            display: flex;
            flex-wrap: nowrap;
            height: calc(100% - 41px);
            width: 100%;
            .code-edit-line {
                background: #ecf0f5;
                width: 35px;
                height: 100%;
                text-align: left;

                textarea {
                    height: 100%;
                    width: 100%;
                    resize: none;
                    outline: none;
                    overflow-y: hidden;
                    overflow-x: hidden;
                    border: 0;
                    background: rgb(247, 247, 247);
                    color: #999;
                    line-height: 24px;
                    font-size: 14px;
                    padding: 10px 4px;
                    text-align: right;
                    font-weight: bold;
                    box-sizing: border-box;
                }
            }

            .code-edit-textarea {
                border: 1px solid #eaeaea;
                outline: none;
                width: 100%;
                height: 100%;
                resize: none;
                background: rgb(250, 250, 250);
                line-height: 24px;
                font-size: 14px;
                float: left;
                padding: 10px 8px;
                color: black;
                font-family: inherit;
                box-sizing: border-box;
            }
        }
    }


</style>
