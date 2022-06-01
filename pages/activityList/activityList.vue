<template>
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" :title="'活动预告'" @clickLeft="goBack" :background-color="isRed"></uni-nav-bar>
		<view class="listBox">
			<block v-for="(item,index) in list" :key="index">
				<cell :title="item.title" :value="item.createTime" @onClick="goDetail(item.id)"></cell>
			</block>

		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import cell from '@/components/cell.vue';
	import executeS from '@/service/executeS.js';							/*		执行网络请求时需要引入	*/
	import uniLoadMore from '@/components/uni-load-more.vue';				/*		翻页加载更多时需要引入	*/
	import {backTo,linkTo,setDateType} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			cell,
			uniLoadMore
		},
		data() {
			return {
				isRed: '#0289e3',
				type:'',
				goBack:backTo,
				title:'',
				bannerList:[],
				list: [],
				page: 1,
				params: {
					pageSize: 10,
					pageNum: 1
				},
				pages: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉加载更多信息",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},

			}
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
				apixkey: "queryAppActivityNoticeList",
				payload: params
			}
			setTimeout(async () => {
				if (params.pageNum > this.pages) {
					this.loadingType = 2;
					return;
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					list = setDateType(response.data.records);
					this.list = this.list.concat(list);
					this.loadingType = 0;
				}
			}, 800);
		},
		onLoad(options) {
			const _this = this;
			this.queryAppActivityNoticeList(_this);
		},
		methods: {
			goDetail(id) {
				linkTo('../activityDetail/activityDetail?id='+id)
			},
			queryAppActivityNoticeList:(_this) => {
				const paramsPayload = {
					apixkey: "queryAppActivityNoticeList",
					payload: _this.params
				}
				executeS(paramsPayload).then(response=>{
					if (response.success) {
						_this.list = setDateType(response.data.records)
						_this.pages = response.data.pages
						if(response.data.total <= 10) {
							_this.loadingType = 2;
						}
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.listBox {
		padding: 0 29rpx;
		box-sizing: border-box;
		background-color: $uni-bg-color;
	}
</style>
