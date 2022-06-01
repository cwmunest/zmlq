<template>
	<view class="pageHomeWrap">

		<!--banner Start-->
		<view class="bannerBox">
			<swiper-banner :info="bannerInfo"></swiper-banner>
		</view>
		<!--banner End-->
		<view class="conBlockItem">
			<menu-nav-box></menu-nav-box>
		</view>
		<view class="wonderfulNewWrap">
			<lay-out-wrap :title="'政务要闻'" @onClick="goMore">
				<view slot="content">
					<block v-for="(item,index) in list" :key="index">
						<block>
							<list-item-l-r :url="item.coverImage" :showLine="true" :title="item.title" :seeNum="item.lookCount" :date="item.createTime" @onClick="goPage(item.id)"></list-item-l-r>
						</block>
						<!-- <block v-else>
							<list-item-t-b :thumbs="thumbs" :title="item.title" :seeNum="item.lookCount" :date="item.updateTime" :showLine="true"  @onClick="goPage(item.id)"></list-item-t-b>
						</block> -->
					</block>
				</view>
			</lay-out-wrap>
		</view>
	</view>
</template>

<script>
	import menuNavBox from './component/menuNavBox.vue';
	import LayOutWrap from '@/components/layout.vue';
	import ListItemLR from '@/components/ListItemLR.vue';
	import ListItemTB from '@/components/ListItemTB.vue';
	import swiperBanner from '@/components/swiper/index.vue';
	import {linkTo,setDateType} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		data() {
			return {
				bannerInfo: [],
				// currentKey:'walkInto',
				pic01Jpg: 'http://www.mwnews.cn/uploaded/c81e72/20191202/15752574058402.png',
				pic02Jpg:'http://www.mwnews.cn/uploaded/c81e72/20191101/15725795519131.jpg',
				thumbs: ['http://www.mwnews.cn/uploaded/c81e72/20191215/15763827255714.jpg',
					'http://www.mwnews.cn/uploaded/c81e72/20191215/15763825315259.jpg',
					'http://www.mwnews.cn/uploaded/c81e72/20191215/1576382548280.jpg'
				],
				list:[]
			}
		},
		onLoad(options) {
			const _this = this;
			_this.queryAppArticleList(_this)
			_this.queryAppAdList(_this)
		},
		methods: {
			queryAppArticleList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppArticleList",
					payload: {
						pageSize: 3,
						pageNum: 1,
						category: 'important_affairs'
					}
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.list = setDateType(response.data.records)
					}
				})
			},
			queryAppAdList:async (_this) => {
				const paramsPayload = {
					apixkey: "queryAppAdList",
					payload: {
						pageSize: 10,
						pageNum: 1,
						adType: '勤政琅岐'
					}
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.bannerInfo = response.data.records
					}
				})
			},
			goMore() {
				linkTo('/pages/pageList/pageList?title=政务要闻&category=important_affairs')
			},
			goPage(id) {
				linkTo('/pages/pageDetail/pageDetail?id='+id+'&title=政务要闻')
			}
		},
		components: {
			menuNavBox,
			LayOutWrap,
			ListItemLR,
			ListItemTB,
			swiperBanner
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/uni.scss";

	.pageHomeWrap {
		width: 100%;
	}

	.bannerBox {
		width: 100%;
		height: 320rpx;
	}

	.conBlockItem {
		padding: 20rpx 0rpx;
		background: $uni-bg-color;
	}

	.wonderfulNewWrap {
		padding-top: 20rpx;
	}

	uni-image {
		width: 100%;
		height: 100%;
	}
</style>
