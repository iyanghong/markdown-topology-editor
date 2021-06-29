-基于topology-core



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