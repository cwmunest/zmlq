<template>
	<!-- 特产预定详情 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="特产预定" @clickLeft="goBack"></uni-nav-bar>
		<view class="imgBox">
			<image :src="info.image" mode="aspectFill"></image>
			<view class="imgBoxInfo">
				<text>{{info.name}}</text>
				<view class="price">
					预定 ￥<label>{{info.price}}</label>
				</view>
			</view>
		</view>
		<view class="produce" v-html="info.detail"></view>
		<view class="btnFixed" @click="onReserve">预定</view>
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
		methods:{
			onReserve() {
				linkTo('../reserve/reserve')
			},
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

			text {
				font-size: 34rpx;
			}

			.price {
				font-size: 24rpx;
				color: #f74f2a;

				label {
					font-size: 34rpx;
				}
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
		margin-bottom: 92rpx;
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
