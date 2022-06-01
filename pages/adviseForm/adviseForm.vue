<template>
	<!-- 投诉建议-提交 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="投诉建议" @clickLeft="goBack"></uni-nav-bar>
		<view class="formMain">
			<view class="formBox">
				<cell :title="'问题简述'">
					<view class="valueR" slot="value">{{consultTxt}}</view>
				</cell>
			</view>
			<lay-out-wrap :title="'详细描述'" :isMoreShow="false">
				<view class="remark" slot="content">
					<textarea placeholder="请输入描述内容" v-model="params.sketch" />
					</view>
			</lay-out-wrap>
			<lay-out-wrap title="相关照片" :isMoreShow="false">
				<view class="photoBox" slot="content">
					<xyz-choose-image @chooseImage="chooseImage" :imgsList="imgList" @delImg="chooseImage"></xyz-choose-image>
				</view>
			</lay-out-wrap>
			<lay-out-wrap title="相关视频" :isMoreShow="false">
				<view class="photoBox" slot="content">
					<xyz-choose-image :isVideo="true" :num="1" @chooseImage="chooseVideo" :imgsList="videoUrl" @delImg="chooseVideo"></xyz-choose-image>
				</view>
			</lay-out-wrap>
			<!-- <view class="formBox">
				<cell :title="'上报人'">
					<view class="valueR" slot="value">
						<input type="text" placeholder="请输入上报人姓名" />
					</view>
				</cell>
				<cell :title="'联系电话'">
					<view class="valueR" slot="value">
						<input type="number" placeholder="请输入联系电话" />
					</view>
				</cell>
			</view> -->
		</view>
		<view class="btnFixed" @click="onReserve">提交</view>
	</view>
</template>

<script>
	import LayOutWrap from'@/components/layout.vue';
	import cell from'@/components/cell.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import xyzChooseImage from "@/components/xyz-choose-image.vue"
	import executeS from '@/service/executeS.js';
	import {backTo,linkTo,upLoad,showMsg} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			LayOutWrap,
			cell,
			uniNavBar,
			xyzChooseImage
		},
		data() {
			return {
				goBack:backTo,
				consultTxt:'',
				params:{},
				imgList:[],
				isEdit:false,
				videoUrl:[]
			};
		},
		onLoad(options) {
			let _this = this
			if(options.id) {
				this.isEdit = true
				this.queryAppSuggestGoEdit(_this,options.id)
			}
			this.consultTxt = options.name
		},
		methods:{
			async onReserve() {
				let imgList = this.imgList,
					params = this.params,
					chooseVideo = this.videoUrl,
					imgArr = [],
					_this = this;
				if(!params.sketch) return showMsg('请输入描述内容')
				if(imgList.length > 0) {
					for (let i = 0; i < imgList.length; i++) {
						await upLoad(imgList[i]).then(rs=>{
							imgArr.push(rs.url)
						})
					}
					params.image = imgArr.join(',')
				}
				if(chooseVideo.length > 0) {
					await upLoad(chooseVideo[0]).then(rs=>{
						params.video = rs.url
					})
				}
				if(this.isEdit) {
					await this.queryAppSuggestEdit(_this)
				}else {
					await this.queryAppArticleList(_this)
				}
				
			},
			chooseImage(img) {
				this.imgList = img
			},
			chooseVideo(video) {
				this.videoUrl = video
			},
			queryAppArticleList: async (_this) => {
				const paramsPayload = {
					apixkey: "queryAppSuggestAdd",
					payload: _this.params,
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					linkTo('/pages/reserveSuccess/reserveSuccess?type=2')
				}
			},
			queryAppSuggestGoEdit: async (_this,id) => {
				const paramsPayload = {
					apixkey: "queryAppSuggestGoEdit",
					payload: {id:id},
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data
					_this.imgList = data.image.split(',')
					_this.videoUrl = data.video.split(',')
					_this.params = data
				}
			},
			queryAppSuggestEdit: async (_this) => {
				const paramsPayload = {
					apixkey: "queryAppSuggestEdit",
					payload: _this.params,
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					linkTo('/pages/reserveSuccess/reserveSuccess?type=2')
				}
			},
		}
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
	}
	
	.btnFixed {
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
