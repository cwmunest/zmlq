<template>
	<!-- 琅岐名人 同根同源 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" :title="title" @clickLeft="goBack"></uni-nav-bar>
		<view class="popularViewpointBox">
			<view class="PVItemWrap" v-for="(item,index) in list" :key="index" @click="goDetail(item.id)">
				<view class="PVItem">
					<view class="imgCon">
						<image :src="item.coverImage" mode="scaleToFill" class="curImg">
					</view>
					<view class="text">{{item.title}}</view>
					<view class="desc">{{item.contentMd}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import executeS from '@/service/executeS.js';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import {backTo,linkTo} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			uniLoadMore
		},
		data() {
			return {
				goBack:backTo,
				title: '',
				list: [],
				page: 1,
				params: {
					pageSize: 10,
					pageNum: 1,
					category: ''
				},
				pages: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉加载更多信息",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
			};
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			let list = [],
				params = this.params;
			params.pageNum++;
			const paramsPayload = {
				apixkey: "queryAppArticleList",
				payload: params
			}
			setTimeout(async () => {
				if (params.pageNum > this.pages) {
					this.loadingType = 2;
					return;
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					list = response.data.records;
					this.list = this.list.concat(list);
					this.loadingType = 0;
				}
			}, 800);
		},
		onLoad(options) {
			const _this = this;
			this.title = options.title;
			_this.params.category = options.category;
			this.queryAppArticleList(_this);
			uni.setNavigationBarTitle({
				title: options.title
			})
		},
		methods: {
			goDetail(id) {
				linkTo('../pageDetail/pageDetail?id=' + id)
			},
			queryAppArticleList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppArticleList",
					payload: _this.params
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.list = response.data.records
						_this.pages = response.data.pages
						if (response.data.total <= 10) {
							_this.loadingType = 2;
						}
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.popularViewpointBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 30rpx;

		.PVItemWrap {
			width: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-bottom: 10rpx;

			.PVItem {
				width: 340rpx;

				.imgCon {
					width: 340rpx;
					height: 245rpx;
				}

				.curImg {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}

				.desc {
					font-size: 24rpx;
					color: #999999;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;

				}

				.text {
					width: 100%;
					text-align: left;
					font-size: 28rpx;
					height: 70rpx;
					line-height: 70rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

				}
			}
		}

	}
</style>
