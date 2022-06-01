<template>
	<!-- 酒店列表 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="酒店" @clickLeft="goBack"></uni-nav-bar>
		<lay-out-wrap :title="'快捷选择'" :isMoreShow="false">
			<view slot="content">
				<view class="listBox">
					<view class="tabsBox">
						<tabs :tabsList="tabsList" :cur="tabsCur" @onClick="getIndex"></tabs>
					</view>
					<view class="listMain">
						<block v-for="(item,index) in list" :key="index">
							<item-hotel @onClick="goDetail(item.id)" :imgUrl="item.image" :title="item.name" :desc="item.address" :stars="item.levelTxt"
							 :price="item.price"></item-hotel>
						</block>
					</view>
				</view>

			</view>
		</lay-out-wrap>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import tabs from "@/components/tabs.vue";
	import LayOutWrap from '@/components/layout.vue';
	import itemHotel from '@/components/itemHotel.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import {
		backTo,
		linkTo
	} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar,
			tabs,
			LayOutWrap,
			itemHotel,
			uniLoadMore
		},
		data() {
			return {
				goBack: backTo,
				tabsList: [{
						name: '高端度假',
						tag: 'high_grade_vacation'
					},
					{
						name: '亲子旅游',
						tag: 'parent_child_travel'
					},
					{
						name: '寻味之旅',
						tag: 'excellent_trip'
					}
				],
				tabsCur: 0,
				list: [],
				page: 1,
				params: {
					pageSize: 10,
					pageNum: 1,
					type: 'hotels',
					tag: 'high_grade_vacation'
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
		onLoad() {
			const _this = this
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
					let data = response.data.records
					data.forEach(val => {
						val.levelTxt = _this.getLevelTxt(val.level) + '星级酒店'
					})
					this.list = this.list.concat(data);
					this.loadingType = 0;
				}
			}, 800);
		},
		methods: {
			getIndex(index) {
				this.tabsCur = index
				let tabsList = this.tabsList,
					_this = this,
					params = this.params;
				params.tag = tabsList[index].tag
				params.pageNum = 1
				this.queryAppHotelsList(_this)
			},
			goDetail(id) {
				linkTo('../hotelDetail/hotelDetail?id=' + id)
			},
			//热门酒店
			queryAppHotelsList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppHotelsList",
					payload: _this.params
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						let data = response.data.records
						data.forEach(val => {
							val.levelTxt = _this.getLevelTxt(val.level) + '星级酒店'
						})
						_this.list = data
						_this.pages = response.data.pages
						if (response.data.total <= 10) {
							_this.loadingType = 2;
						}
					}
				})
			},
			getLevelTxt(level) {
				const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
				return zh[level]
			},

		}
	}
</script>

<style lang="scss">
	.listBox {
		padding: 0 28rpx;

		.tabsBox {}
	}
</style>
