<template>
	<!-- 习总讲话 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="习总讲话" background-color="#cc0000" @clickLeft="goBack"></uni-nav-bar>
		<view class="adBox">
			<swiper-banner :info="bannerList"></swiper-banner>
		</view>
		<view class="search">
			<search-box @onChange="getYear" @onConfirm="getSearch"></search-box>
		</view>
		<view class="listBox" v-if="list.length > 0">
			<block v-for="(item,index) in list" :key="index">
				<item-news :title="item.title" :info="item.contentMd" :date="item.createTime" @onClick="goDetail(item.id)"></item-news>
			</block>
		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import searchBox from './component/searchBox.vue';
	import itemNews from './component/itemNews.vue';
	import swiperBanner from '@/components/swiper/index.vue';
	import {backTo,formatTime,setDateType} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	import uniLoadMore from '@/components/uni-load-more.vue';
	
	export default {
		components: {
			uniNavBar,
			searchBox,
			itemNews,
			uniLoadMore,
			swiperBanner
		},
		data() {
			return {
				bannerList:[],
				list: [],
				goBack:backTo,
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
				}
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
					list = setDateType(response.data.records);
					this.list = this.list.concat(list);
					this.loadingType = 0;
				}
			}, 800);
		},
		onLoad(options) {
			const _this = this;
			_this.params.category = options.category;
			this.queryAppArticleList(_this);
			this.queryAppArticleTop(_this);
		},
		methods:{
			goDetail(id) {
				uni.navigateTo({
					url: '../pageDetail/pageDetail?id='+id
				})
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
			queryAppArticleTop: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppArticleTop",
					payload: {
						pageSize:10,
						pageNum:1,
						category:'chairman_speech'
					}
				}
				executeS(paramsPayload).then(response=>{
					if (response.success) {
						_this.bannerList = response.data.records
					}
				})
			},
			getYear(val) {
				const _this = this
				let params = this.params
				params.pageNum = 1
				params.year = formatTime(val,'yyyy')
				this.queryAppArticleList(_this)
			},
			getSearch(val) {
				const _this = this
				let params = this.params
				params.pageNum = 1
				params.searchStr = val.searchStr
				this.queryAppArticleList(_this)
			}
		}
	}
</script>

<style lang="scss">
	.adBox {
		width: 100%;
		height: 329rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.listBox {
		background-color: $uni-bg-color;
		padding: 15rpx 30rpx;
	}

</style>
