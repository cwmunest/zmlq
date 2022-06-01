<template>
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" :title="title" :background-color="isRed" @clickLeft="goBack"></uni-nav-bar>
		<view class="pageInfo">
			<view class="pageTitle">
				<view class="title">{{info.title}}</view>
				<view class="date">{{info.createTime}}</view>
			</view>
			<view class="pageContent" v-html="info.content">

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
			this.isRed = options.type == 'red' ? '#cc0000' : '#0289e3';
			this.title = options.title
			if (options.category) {
				this.queryAppArticleList(_this,options.category)
			} else {
				this.queryAppArticleDetail(_this, options.id)
			}

		},
		methods: {
			queryAppArticleDetail: async (_this, id) => {
				const paramsPayload = {
					apixkey: "queryAppArticleDetail",
					payload: {
						id: id
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data.article
					let regTime = data.createTime.replace(/\-/g, "/");
					data.createTime = formatTime(regTime,'yyyy-MM-dd')
					_this.info = data
				}
			},
			queryAppArticleList: (_this,category) => {
				const paramsPayload = {
					apixkey: "queryAppArticleList",
					payload: {
						pageSize: 1,
						pageNum: 1,
						category: category
					}
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						let data = response.data.records[0]
						let regTime = data.createTime.replace(/\-/g, "/");
						data.createTime = formatTime(regTime,'yyyy-MM-dd')
						_this.info = data
					}
				})
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
