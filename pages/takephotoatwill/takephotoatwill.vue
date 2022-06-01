<template>
	<view class="x-panel x-full">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="随手拍" @clickLeft="goBack"></uni-nav-bar>
		<view class="formMain x-panel-content x-top-navbar x-bottom-btn">
			  <lay-out-wrap title="拍照上传" :isMoreShow="false">
				<view class="photoBox" slot="content">
				  <xyz-choose-image
					:isVideo="false"
					:num="3"
					@chooseImage="chooseVideo"
					@delImg="chooseVideo"
				  ></xyz-choose-image>
				</view>
			  </lay-out-wrap>
			  <lay-out-wrap :title="'说明'" :isMoreShow="false">
				<view class="remark" slot="content" style="padding-bottom: 30px;">
				  <textarea placeholder="请输入备注说明" v-model="remark"/>
				</view>
			  </lay-out-wrap>
		</view>
		<view class="x-btn-submit" @click="onSubmit">提交</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import LayOutWrap from "@/components/layout.vue";
	import xyzChooseImage from "@/components/xyz-choose-image.vue";
	import executeS from '@/service/executeS.js';
	import { backTo, linkTo, upLoad, showMsg, getStorage } from "@/utils/utils.js";	
	export default {
		components: {
			uniNavBar,
			LayOutWrap,
			xyzChooseImage
		},
		data() {
			return {
				user:Shell.UserInfo||{},
				goBack: backTo,
				images:[],
				remark:'',
			};
		},
		onLoad() {
			
		},
		methods: {
			chooseVideo(imgList) {
				this.images=imgList;
			},
			async upLoadImg(imgs) {
				for(var i=0,l=imgs.length;i<l;i++){
					var img=imgs[i];
					if(img.indexOf('blob:') != -1) {
						await upLoad(img).then(rs=>{
							this.images[i] = rs.url;
						})
					}
				};
			},
			async onSubmit() {
				//console.log(this.images)
				if(this.images.length>0){
				  uni.showLoading({
					title: "上传中",
					mask: true
				  });
					await this.upLoadImg(this.images);
				}else{
					return showMsg("请拍照 再提交");
				}
				 if (!this.remark) return showMsg("请输入备注说明");
				let data={
					userId:this.user.id,
					reportName:this.user.name,
					image:this.images.join(","),
					reportContent:this.remark
				}
				const paramsPayload = {
					apixkey: "queryAppTakePhotoAtWillAdd",
					payload: data
				}
				executeS(paramsPayload).then(response=>{
					if(response.success || response.msg=="保存成功") {
						showMsg('保存成功','success')
						this.goBack();
					}else{
						showMsg('提交失败','warn')
					}
				})
			},
			
		},
	}
</script>

<style lang="scss">
.formMain {
  margin-bottom: 92rpx;
  .formBox {
    background-color: $uni-bg-color;
    padding: 0 28rpx;
    margin: 20rpx 0;
    .valueR {
      font-size: 28rpx;
    }
  }
  .remark {
    padding: 0 28rpx;
    box-sizing: border-box;
    textarea {
      background-color: $uni-border-color;
      width: 100%;
      padding: 25rpx;
      box-sizing: border-box;
    }
  }
  .photoBox {
    margin: 0 28rpx;
  }
  .owner {
    font-size: $uni-font-size-base;
  }
}
	.btnSubmit {
		width: 100%;
		height: 92rpx;
		background-color: #f74f2a;
		position: fixed;
		bottom: 0;
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		line-height: 92rpx;
	}
</style>
