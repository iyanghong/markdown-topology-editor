<template>
	<div @click="toUpload" class="topology-upload-file-body">
		<input type="file" class="uploadFile" ref="uploadFile" @change="upload" />
		<div>
			<div class="progress-wrapper-panel" v-if="uploadIng">
				<div class="progress-wrapper">
					<div class="progress-progress" :style="uploadStyle"></div>
					<div class="progress-rate" v-if="uploadRate < 1">{{ (uploadRate * 100).toFixed(2) }}%</div>
					<div class="progress-rate" v-else>正在存储文件...</div>
				</div>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	/*import {
		Message
	} from 'element-ui' //提示框*/
export default {
	name : 'Upload',
	props: {
		type: {
			type: String,
			default: 'cache'
		},
		uploadImage:{
			type : Function,
			default : null
		},
		path: {
			type: String,
			default: ''
		},
		field : {
			type : String,
			default : ''
		}
	},
	data() {
		return {
			uploadIng: false,
			uploadRate: 0,
			uploadStyle: {
				width: '0%'
			}
		};
	},
	watch:{
		uploadRate(value){
			if(value >= 1){
				this.uploadStyle.width = '100%';
			}
		}
	},
	methods: {
		toUpload() {
			if (this.uploadIng) {
				return;
			}
			this.$refs.uploadFile.click();
		},
		upload() {
			if(this.uploadImage === null){
				/*Message({
					message: '暂未开启图片上传',
					type: 'error',
					duration: 5 * 1000
				});*/
				alert('暂未开启图片上传');
				console.error('暂未开启图片上传')
				return false;
			}
			let file = this.$refs.uploadFile.files[0];
			let data = {
				type: this.type,
				path: this.path
			};
			this.uploadIng = true;
			this.uploadImage(file, data, e => {
				//属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
				//如果lengthComputable为false，就获取不到e.total和e.loaded
				if (e.lengthComputable) {
					var rate = (this.uploadRate = e.loaded / e.total); //已上传的比例
					if (rate < 1) {
						//这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
						//因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
						//等响应回来时，再将进度设为100%
						this.uploadRate = rate;
						this.uploadStyle.width = (rate * 100).toFixed(2) + '%';
					}
				}
			})
				.then(response => {
					this.uploadIng = false;
					this.$emit('change', response,this.field);
				})
				.catch(() => {
					this.uploadIng = false;
				});
		}
	}
};
</script>

<style lang="scss">
.topology-upload-file-body {
	cursor: pointer;
	position: relative;
	.uploadFile {
		position: fixed;
		top: -200px;
		left: -200px;
	}
	.progress-wrapper-panel{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255,255,255,.9);
	}
	.progress-wrapper {
		position: relative;
		width: 90%;
		top: 50%;
		margin: -10px auto 0 auto;
		height: 10px;
		border-radius: 5px;
		background-color: lightgrey;
	}
	.progress-wrapper .progress-progress {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 0%;
		border-radius: 5px;
		background-color: #3DE1AD;
		z-index: 1;
	}
	.progress-wrapper .progress-rate {
		position: absolute;
		top: 0px;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;
		font-size: 14px;
		line-height: 10px;
		height: 100%;
		z-index: 2;
	}
}


</style>
