<template>
	<!-- 投诉建议详情 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="投诉建议详情" @clickLeft="goBack"></uni-nav-bar>
		<view class="formBox">
			<cell title="上报类型" :value="info.sketch"></cell>
		</view>
		<view class="formBox">
			<cell title="问题简述" :value="info.sketch"></cell>
			<view class="itemBox">
				<view class="itemBoxTitle">
					<image src="/static/images/advise/wenhao.png" mode="widthFix"></image>
					<text>描述</text>
				</view>
				<view class="itemInfo">{{info.description}}</view>
			</view>
			<view class="itemBox">
				<view class="itemBoxTitle">
					<image src="/static/images/advise/tupian.png" mode="widthFix"></image>
					<text>图片</text>
				</view>
				<view class="itemInfo">
					<image v-for="(item,index) in info.image" :key="index" :src="item" mode="aspectFill"></image>
				</view>
			</view>
			<view class="itemBox">
				<view class="itemBoxTitle">
					<image src="/static/images/advise/shipin.png" mode="widthFix"></image>
					<text>视频</text>
				</view>
				<view class="itemInfo">
					<video :src="info.video" controls v-if="info.video"></video>
				</view>
			</view>
		</view>
		<view class="formBox">
			<cell title="上报人" :value="info.reportName"></cell>
			<cell title="联系电话" :value="info.mobile"></cell>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import cell from '@/components/cell.vue';
	import executeS from '@/service/executeS.js';
	import {
		backTo
	} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			cell
		},
		data() {
			return {
				goBack: backTo,
				info:{
					image:[]
				}
			};
		},
		onLoad(options) {
			let _this = this
			this.queryAppSuggestGoEdit(_this,options.id)
		},
		methods:{
			queryAppSuggestGoEdit: async (_this,id) => {
				const paramsPayload = {
					apixkey: "queryAppSuggestGoEdit",
					payload: {id:id},
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data,
						info = _this.info;
					data.image = data.image.split(',')
					_this.info = data;
				}
			},
		}
	}
</script>

<style lang="scss">
	.formBox {
		background-color: $uni-bg-color;
		padding: 0 28rpx;
		margin-top: 20rpx;
	}

	.itemBox {
		font-size: 28rpx;
		padding: 30rpx 0;

		.itemBoxTitle {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			image {
				width: 29rpx;
				margin-right: 16rpx;
			}
		}

		.itemInfo {
			color: #787878;
			line-height: 48rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			image {
				width: 217rpx;
				height: 136rpx;
				margin-bottom: 25rpx;
				margin-right: 10rpx;
			}
			video {
				width: 217rpx;
				height: 136rpx;
			}
		}
	}
</style>
