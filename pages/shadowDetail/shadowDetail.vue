<template>
	<!-- 光影效果详情 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="天地混沌" @clickLeft="goBack"></uni-nav-bar>
		<view class="videoBox">
			<image :src="info.image" class="videoPost" mode="aspectFill"></image>
			<image src="/static/images/common/bofang.png" mode="widthFix" class="palyVideo"></image>
		</view>
		<view class="infoBox">
			<view class="title">{{info.name}}</view>
			<view class="desc">
				<text>{{info.intro}}</text>
				<view class="price">
					<label>¥</label>{{info.price}}
				</view>
			</view>
			<view class="playNo">
				<image src="/static/images/common/bofang2.png" mode="widthFix"></image>
				<text>播放次数 {{info.viewCount}}</text>
			</view>
		</view>
		<view class="btnPlay">点播</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import {backTo,linkTo} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				goBack:backTo,
				info: {},
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
	.videoBox {
		width: 100%;
		height: 401rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.videoPost {
			width: 100%;
			height: 100%;
		}

		.palyVideo {
			position: absolute;
			width: 106rpx;
		}
	}

	.infoBox {
		background-color: $uni-bg-color;
		padding: 27rpx;

		.title {
			font-size: 30rpx;
		}

		.desc {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;

			text {
				font-size: 26rpx;
				color: #999999;
			}

			.price {
				font-size: 44rpx;
				color: #f74f2a;

				label {
					font-size: 24rpx;
				}
			}
		}

		.playNo {
			border-top: 1rpx solid #f5f5f5;
			padding-top: 20rpx;
			display: flex;
			align-items: center;

			image {
				width: 17rpx;
				margin-right: 10rpx;
			}

			text {
				font-size: 24rpx;
				color: #141414;
			}
		}
	}

	.btnPlay {
		width: 565rpx;
		height: 82rpx;
		background-color: #28be5a;
		border-radius: 12rpx;
		font-size: 30rpx;
		color: #ffffff;
		text-align: center;
		line-height: 82rpx;
		margin: 74rpx auto;
	}
</style>
