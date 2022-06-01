<template>
	<!-- 琅岐景点 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="琅岐景点" @clickLeft="goBack"></uni-nav-bar>
		<view class="listBox">
			<block v-for="(item,index) in list" :key="index">
				<item-hotel @onClick="goDetail(item.id)" :imgUrl="item.image" :title="item.name" :desc="item.address" :stars="item.time" :starsBg="'#ff9c00'"></item-hotel>
			</block>
		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import itemHotel from '@/components/itemHotel.vue';
	import {backTo,linkTo} from '@/utils/utils.js';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar,
			itemHotel,
			uniLoadMore
		},
		data() {
			return {
				goBack:backTo,
				list: [],
				page: 1,
				params: {
					pageSize: 10,
					pageNum: 1,
					type: 'scenic'
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
		onLoad(options) {
			const _this = this;
			let params = this.params
			if(options.tag) {
				params.tag = options.tag
			}
			params.type = options.type
			_this.queryAppHotelsList(_this)
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
				apixkey: "queryAppHotelsList",
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
					console.log(this.list)
					this.loadingType = 0;
				}
			}, 800);
		},
		methods: {
			goDetail(id) {
				linkTo('/pages/travelDetail/travelDetail?id='+id)
			},
			queryAppHotelsList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppHotelsList",
					payload: _this.params
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.list = response.data.records
						_this.pages = response.data.pages
						if(response.data.total <= 10) {
							_this.loadingType = 2;
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.pageHomeWrap {
		background-color: $uni-bg-color;
		.listBox {
			padding: 0 30rpx;
		}
	}
	

</style>
