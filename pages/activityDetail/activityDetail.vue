<template>
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" :title="'活动预告'" :background-color="isRed" @clickLeft="goBack"></uni-nav-bar>
		<view class="pageInfo">
			<view class="pageTitle">
				<view class="title">{{info.title}}</view>
				<view class="date">{{info.createTime}}</view>
			</view>
			<view class="pageContent" v-html="info.contentHtml">

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
				isRed: '#0289e3',
				title:''


			};
		},
		onLoad(options) {
			const _this = this;
			this.queryAppActivityNoticeDetail(_this, options.id)

		},
		methods: {
			queryAppActivityNoticeDetail: async (_this, id) => {
				const paramsPayload = {
					apixkey: "queryAppActivityNoticeDetail",
					payload: {
						id: id
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data
					let regTime = data.createTime.replace(/\-/g, "/");
					data.createTime = formatTime(regTime,'yyyy-MM-dd')
					_this.info = data
				}
			}
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
