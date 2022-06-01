<template>
	<!-- 美食详情 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="品味琅岐" @clickLeft="goBack"></uni-nav-bar>
		<view class="imgBox">
			<image :src="info.image" mode="aspectFill"></image>
			<view class="imgBoxInfo">
				<!-- <view class="introBox">
					
					<view class="title">
						<text>{{info.name}}</text>
						<image src="/static/images/zmlq/taste/yinhao.png" mode="widthFix"></image>
					</view>
					<view class="intro">{{info.intro}}</view>
				</view> -->
				<view class="seeNum">{{info.viewCount?info.viewCount:0}}+篇文章提及</view>
			</view>
		</view>
		<view class="produce" v-html="info.detail"></view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import {backTo,linkTo} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	import foodBg from '@/static/images/zmlq/taste/foodbg.png';
	
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				foodBg:foodBg,
				goBack:backTo,
				info:{},
			};
		},
		onLoad(options) {
			const _this = this;
			this.queryAppHotelsDetail(_this, options.id)
		},
		methods:{
			queryAppHotelsDetail: async (_this, id) => {
				const paramsPayload = {
					apixkey: "queryAppHotelsDetail",
					payload: {
						id: id
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					_this.info = response.data
			
				}
			},
		}
	}
</script>

<style lang="scss">
	.imgBox {
		background-color: $uni-bg-color;

		image {
			width: 100%;
			height: 610rpx;
			margin: 0;
		}

		.imgBoxInfo {
			padding: 22rpx 28rpx 33rpx;
			display: flex;
			flex-direction: column;
			.introBox {
				width: 693rpx;
				height: 303rpx;
				background-color: #f8f8f8;
				border-radius: 26rpx;
				background-size: cover;
				padding-top: 55rpx;
				padding-left: 39rpx;
				box-sizing: border-box;
				position: relative;
				.title {
					font-size: 30rpx;
					padding-bottom: 28rpx;
					position: relative;
					height: 30rpx;
					text {
						position: absolute;
						z-index: 2;
					}
					image {
						position: absolute;
						width: 51rpx;
						left: -9rpx;
						top: -20rpx;
						z-index: 1;
						
					}
				}
				.intro {
					color: #6f6565;
					font-size: 24rpx;
					width: 406rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
					overflow: hidden;
				}
				
			}
			.seeNum {
				color: #0289e3;
				font-size: 28rpx;
				text-align: right;
				margin-top: 26rpx;
			}
		}
	}

	.produce {
		font-size: 28rpx;
		color: #1b1b1b;
		text-indent: 56rpx;
		line-height: 48rpx;
		padding: 50rpx 30rpx;
		background-color: $uni-bg-color;
		margin-top: 26rpx;
	}
</style>
