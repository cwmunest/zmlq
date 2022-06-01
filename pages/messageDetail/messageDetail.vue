<template>
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="消息中心" @clickLeft="goBack"></uni-nav-bar>
		<view class="pageInfo">
			<view class="pageTitle">
				<view class="title">{{info.name}}</view>
				<view class="date">{{info.createTime}}</view>
			</view>
			<view class="pageContent" v-html="info.detail">

			</view>
		</view>

	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import executeS from '@/service/executeS.js';
	import {backTo,formatTime} from '@/utils/utils.js';
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
			this.queryAppMessageDetail(_this,options.id)

		},
		methods: {
			queryAppMessageDetail: async (_this, id) => {
				const paramsPayload = {
					apixkey: "queryAppMessageDetail",
					payload: {
						id: id
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data;
					let regTime = data.createTime.replace(/\-/g, "/");
					data.createTime = formatTime(regTime,'yyyy-MM-dd')
					_this.info = data
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.pageInfo {
		padding: 0 27rpx;

		.pageTitle {
			border-bottom: 1rpx solid $uni-border-color;
			padding: 27rpx 0 15rpx;

			.title {
				font-size: 34rpx;
				color: #1b1b1b;
				margin-bottom: 26rpx;
			}

			.date {
				font-size: 24rpx;
				color: #bebdbd;
			}
		}

		.pageContent {
			padding-top: 42rpx;
			font-size: 28rpx;
		}
	}
</style>
