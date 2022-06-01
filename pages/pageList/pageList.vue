<template>
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" :title="title" @clickLeft="goBack" :background-color="isRed"></uni-nav-bar>
		<view class="bannerBox" v-if="bannerList.length > 0">
			<swiper-banner :info="bannerList" @onClick="goDetail"></swiper-banner>
		</view>
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
	import SwiperBanner from './component/swiper/index.vue';
	import cell from '@/components/cell.vue';
	import executeS from '@/service/executeS.js';							/*		执行网络请求时需要引入	*/
	import uniLoadMore from '@/components/uni-load-more.vue';				/*		翻页加载更多时需要引入	*/
	import {backTo,linkTo,setDateType} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			SwiperBanner,
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
					list = setDateType(response.data.records);
					this.list = this.list.concat(list);
					console.log(this.list)
					this.loadingType = 0;
				}
			}, 800);
		},
		onLoad(options) {
			const _this = this;
			this.title =options.title;
			this.type = options.type?options.type:'';
			this.isRed = options.type == 'red' ? '#cc0000' : '#0289e3';
			_this.params.category = options.category;
			this.queryAppArticleList(_this);
			this.queryAppArticleTop(_this,options.category);
			uni.setNavigationBarTitle({
				title: options.title
			})
		},
		methods: {
			goDetail(id) {
				linkTo('../pageDetail/pageDetail?id='+id+'&title='+this.title+'&type='+this.type)
			},
			queryAppArticleList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppArticleList",
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
			},
			queryAppArticleTop:(_this,category) => {
				const paramsPayload = {
					apixkey: "queryAppArticleTop",
					payload: {
						pageSize:1000,
						pageNum:1,
						category:category
					}
				}
				executeS(paramsPayload).then(response=>{
					if (response.success) {
						_this.bannerList = response.data.records
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
