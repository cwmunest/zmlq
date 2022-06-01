<template>
	<!-- 购物广场 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="购物广场" @clickLeft="goBack"></uni-nav-bar>
		<view class="bannerBox">
			<image :src="info.image" mode="aspectFill"></image>
		</view>
		<view class="infoBox">
			<view class="detailInfo">
				<view class="dItem nameInfo">
					<text>{{info.name}}</text>
					<label>{{info.viewCount}}篇文章提及</label>
				</view>
				<view class="dItem">
					<view class="dItemL">
						<image src="/static/images/common/didian.png" mode="widthFix"></image>
						<text>{{info.address}}</text>
					</view>
					<image src="/static/images/common/arrowR.png" mode="widthFix"></image>
				</view>
				<view class="dItem">
					<view class="dItemL">
						<image src="/static/images/common/dianhua.png" mode="widthFix"></image>
						<text>{{info.phone}}</text>
					</view>
					<image src="/static/images/common/arrowR.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import LayOutWrap from '@/components/layout.vue';
	import {backTo} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar,
			LayOutWrap
		},
		data() {
			return {
				goBack:backTo,
				info:{}

			};
		},
		onLoad(options) {
			const _this = this;
			this.queryAppHotelsDetail(_this, options.id)
		},
		methods: {
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
	.pageHomeWrap {
		.bannerBox {
			height: 319rpx;
			width: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.infoBox {
			background-color: $uni-bg-color;
			padding: 0 30rpx 75rpx;
			position: relative;

			.detailInfo {
				width: 693rpx;
				background-color: $uni-bg-color;
				border-radius: 26rpx;
				position: absolute;
				top: -48rpx;
				box-shadow: 0 0 10rpx rgba($color: #000, $alpha: 0.1);
				.dItem {
					padding: 22rpx 36rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.dItemL {
						display: flex;
						align-items: center;
						font-size: 26rpx;
						color: #141414;
						image {
							width: 18rpx;
							margin-right: 15rpx;
						}
					}
					image {
						width: 11rpx;
					}
				}
				.nameInfo {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					text {
						font-size: 32rpx;
						color: #1b1b1b;
						margin-bottom: 20rpx;
					}
					label {
						font-size: 26rpx;
						color: #999999;
					}
				}
				>view{
					&:not(:last-child) {
						border-bottom: 1rpx solid #f5f5f5;
					}
				}
			}
			.produce {
				font-size: 28rpx;
				color: #1b1b1b;
				padding-top: 296rpx;
				text-indent: 56rpx;
				line-height: 48rpx;
			}
		}
	}
</style>
