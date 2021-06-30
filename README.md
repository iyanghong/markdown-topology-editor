-基于[Le5le-Topology-Core](http://topology.le5le.com)写关于编辑器拓展插件的在线拓扑绘图组件，方便一边编写文章一边画图。
-内置了完整的markdown富文本编辑器[mavon-editor](https://github.com/hinesboy/mavonEditor)

### 安装
```shell script
$ npm install markdown-topology-editor --save
```

### 使用
带有topology的mavon-editor编辑器：
```javascript
<template>
    <markdown-editor 
        :options="options" 
        :upload-image="uploadImage"
        :value.sync="content"
    ></markdown-editor>
</template>
import {markdownEditor} from 'markdown-topology-editor'
export default {
    components: {
        markdownEditor
    },
    data(){
        return {
            options : {},
            content : ''
        }
    },
    methods:{
        //上传方法，文档后面有上传方法示例
        uploadImage(){}
    }
};
```
单独引入topology,如果需要mavon-editor额外拓展可以单独引入topology
```javascript
<template>
    <topology-editor 
        :options="options" 
        :is-callback="true"
        :visible.sync="visibleTopology"
        :upload-image="uploadImage"
    ></topology-editor>
</template>
import {topologyEditor} from 'markdown-topology-editor'
export default {
    components: {
        topologyEditor
    },
    data(){
        return {
            options : {},
            visibleTopology :false,
            @success="handleSuccess"
        }
    },
    methods:{
        //上传方法，文档后面有上传方法示例
        uploadImage(){},
        handleSuccess(image){}
    }
};
```



## TopologyEditor API文档

### Props
参数|说明|类型|必选|可选值|默认值
-----|-----|-----|-----|-----|-----
options|选项|Object|N|[Options](#props-options)|null
isCallback|是否开启回调（即右上方的取消确定按钮）|Boolean|true、false|false
uploadImage|上传图片方法（格式详情[Upload Function](#props-uploadImage)）|Function|N|-|null 
visible|是否显示|Boolean|N|true、false|true
top|Body距离顶部位置（当自定义header的时候建议设置该属性）|Number|N|-|0


### <span id="props-options">Options</span>
参数|说明|类型|必选|可选值|默认值
-----|-----|-----|-----|-----|-----
resourcePath|图片资源根路径|String|N|-|
scale|放大倍数|Number|N|-|1
lineName|线条类型|String|N|curve、polyline、line、mind|curve
lineWidth|线宽|Number|N|-|1
fromArrow|起点箭头|String|N|triangleSolid、triangle、diamondSolid、diamond、circleSolid、circle、line、lineDown、lineUp|
toArrow|终点箭头|String|N|triangleSolid、triangle、diamondSolid、diamond、circleSolid、circle、line、lineDown、lineUp|triangleSolid
fontSize|字体大小|Number|N|-|12
grid|是否开启网格|Boolean|N|true、false|true
rule|是否显示标尺|Boolean|N|true、false|true
rotateCursor|鼠标图标路径|String|N|-|
bkColor|背景颜色|String|N|-|#f8f8f8


### <span id="props-uploadImage">UploadImage Function</span>
>下面示例方法为axios的上传文件示例，注意返回值须为Promise，值为图片路径

```javascript
/**
 * 上传文件
 * @param {File} file 文件
 * @param {Object} data 数据
 * @param {Function} uploadProgress 上传进度方法
 * @return Promise
 */
function uploadFile(file,data,uploadProgress) {
	let postData = new FormData();
	postData.append('file',file);
	for(let key in data){
		postData.append(key,data[key]);
	}
    return new Promise(resolve => {
        axios({
    		url: '',
            method : 'POST',
    		data : postData,
    		onUploadProgress : uploadProgress,
    		timeout : 0,
    		headers: {
    			'Content-Type': 'multipart/form-data' 
    		}
    	}).then(response => {
            //判断上传是否成功
    	    if(response.success){
                //注意这个Promise回调须为图片路径
    	        resolve(response.data.url);
            }
        });
    });
	
}
```
### Events
事件|说明|参数
----|----|----
success|开启回调模式、点击上方确定按钮|image
cancel|开启回调模式、点击上方取消按钮|-

### Methods
方法名|说明|参数
----|----|----
toImage|把画布转为图片|File
getJson|获取画布数据|-
getConfig|获取当前画布配置|-
setConfig|设置画布配置|{name : value}
handleEvent|触发画布事件[详情](#Events)|{name:EventName,data:EventData}

### <span id="Events">Handle Events Payload</span>
>事件可用于自定义Header的时候触发

事件名称|说明|参数
----|----|----
AutoWindowSize|自适应窗口大小|-
SaveJson|保存JSON文件|fileName
SavePng|保存Svg|fileName
New|打开新画布|-
Undo|撤销|-
Redo|恢复|-
Copy|复制|-
Cut|剪切|-
Parse|粘贴|-
OpenFile|打开文件|-
SaveCache|保存缓存|-
ReadCache|读取缓存|-