<template>
	<!-- 优惠券 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="优惠券" @clickLeft="goBack"></uni-nav-bar>
		<view class="content">
			<block v-for="(item,index) in list" :key="index">
				<item-coupon-box :info="item" :type="type" @onClick="goDetail(item.id)" @onMake="goMake(item.id)"></item-coupon-box>
			</block>
		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import itemCouponBox from '@/components/itemCoupon.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniLoadMore from '@/components/uni-load-more.vue';
	import {backTo,linkTo,showMsg} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components:{
			itemCouponBox,
			uniNavBar,
			uniLoadMore
		},
		data() {
			return {
				goBack:backTo,
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
				type:''
				
				
			};
		},
		onLoad(options) {
			const _this = this;
			if(options.type == 'mine') {
				this.queryAppUserCouponList(_this);
				this.type = options.type;
			}else {
				this.queryAppCouponList(_this);
			}
			
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			let list = [],
				params = this.params,
				apixkey = this.type == 'mine'?'queryAppUserCouponList':'queryAppCouponList';
			params.pageNum++;
			const paramsPayload = {
				apixkey: apixkey,
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
		methods:{
			goDetail(id) {
				if(this.type == 'mine') {
					linkTo('/pages/couponDetail/couponDetail?id='+id)
				}
			},
			goMake(id) {
				const _this = this;
				this.queryAppUserCouponAdd(_this,id)
			},
			queryAppCouponList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppCouponList",
					payload: _this.params
				}
				executeS(paramsPayload).then(response=>{
					if (response.success) {
						_this.list = response.data.records
						_this.pages = response.data.pages
						if(response.data.total <= 10) {
							_this.loadingType = 2;
						}
					}
				})
			},
			queryAppUserCouponList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppUserCouponList",
					payload: _this.params
				}
				executeS(paramsPayload).then(response=>{
					if (response.success) {
						let list = response.data
						if(!list) return;
						list.forEach(val=>{
							val.useTime = val.use_time
							val.fullReduction = val.full_reduction
						})
						_this.list = list
						_this.pages = Math.ceil(response.count / 10)
						if(response.count <= 10) {
							_this.loadingType = 2;
						}
					}
				})
			},
			queryAppUserCouponAdd: (_this,id) => {
				const paramsPayload = {
					apixkey: "queryAppUserCouponAdd",
					payload: {couponId:id}
				}
				executeS(paramsPayload).then(response=>{
					if (response.success) {
						showMsg(response.message,'success')
						_this.queryAppCouponList(_this)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}
	.content {
		margin: 40rpx 0;
	}

</style>
