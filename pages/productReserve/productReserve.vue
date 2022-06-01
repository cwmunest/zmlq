<template>
	<!-- 特产预定 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="特产预定" @clickLeft="goBack"></uni-nav-bar>
		<view class="productBox">
			<lay-out-wrap :title="'当地特产'" :isMoreShow="false">
				<view slot="content">
					<view class="produceList">
						<block v-for="(item,index) in listData" :key="index">
							<item-produce :imgUrl="item.image" :title="item.name" :price="item.price" @onDetail="goDetail(item.id)"></item-produce>
						</block>
					</view>
				</view>
			</lay-out-wrap>
		</view>
		<view class="reserveBox">
			<lay-out-wrap :title="'最新预定'" :isMoreShow="false">
				<view slot="content">
					<view class="rList">
						<view class="itemBox" v-for="(item,index) in list" :key="index">
							<view class="date">{{item.createTime}}</view>
							<view>{{item.username}}</view>
							<view>{{item.specialtyName}}</view>
							<view>预定数量 <label>{{item.num}}</label></view>
						</view>
					</view>
				</view>
			</lay-out-wrap>
		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import LayOutWrap from'@/components/layout.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniLoadMore from '@/components/uni-load-more.vue';
	import itemProduce from "@/components/itemProduct.vue";
	import {backTo,linkTo,setDateType} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar,
			LayOutWrap,
			itemProduce,
			uniLoadMore
		},
		data() {
			return {
				goBack:backTo,
				listData:[],
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
		onLoad() {
			const _this = this;
			_this.queryAppHotelsList(_this)
			_this.queryAppSpecialtyReservationList(_this)
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
				apixkey: "queryAppSpecialtyReservationList",
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
		methods: {
			goDetail(id) {
				linkTo('../productDetail/productDetail?id='+id)
			},
			queryAppHotelsList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppHotelsList",
					payload: {
						pageSize: 1000,
						pageNum: 1,
						type: 'specialty'
					}
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.listData = response.data.records
					}
				})
			},
			queryAppSpecialtyReservationList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppSpecialtyReservationList",
					payload: _this.params
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.list = setDateType(response.data.records)
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
	.produceList {
		padding: 0 25rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.reserveBox {
		margin-top: 32rpx;
	}
	.rList {
		padding: 0 27rpx;
		.itemBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			padding-bottom: 22rpx;
			.date {
				color: #bebdbd;
			}
			label {
				color: #0289e3;
			}
		}
		
	}
</style>
