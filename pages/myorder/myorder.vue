<template>
	<view class="x-panel x-full">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="我的订单" @clickLeft="goBack"></uni-nav-bar>
		<view class="x-list x-panel-content x-top-navbar">
			<block v-for="(item,index) in list" :key="index">
				<view class="list-item flex-column">
					<view class="cell-box">
						<view class="cell-item"><view class="title">商品名称：</view><view class="value">{{item.specialtyName}}</view></view>
						<view class="cell-item"><view class="title">预订数量：</view><view class="value">{{item.num}}</view></view>
					</view>
					<view class="cell-box">
						<view class="cell-item"><view class="title">订货人：</view><view class="value">{{item.username}}</view></view>
						<view class="cell-item"><view class="title">订货人电话：</view><view class="value">{{item.phone}}</view></view>
					</view>
					<view class="cell-item"><view class="title">备注：</view><view class="value">{{item.remark}}</view></view>
					<view class="cell-item"><view class="title">下单时间：</view><view class="value">{{item.createTime}}</view></view>
				</view>
			</block>
			<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniLoadMore from '@/components/uni-load-more.vue';
	import executeS from '@/service/executeS.js';
	import {backTo,setDateType,linkTo,showMsg, getStorage} from '@/utils/utils.js';
	export default{		
		components: {
			uniNavBar,
			uniLoadMore
		},
		data() {
			return {
				goBack: backTo,
				params: {
					pageSize: 10,
					pageNum: 1,
				},
				pageCount: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉加载更多信息",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [
					/* {image:"http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97,http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97",reportContent:"福建火炬高新技术创业园主楼1号楼3层南4-2"},
					{image:"http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97,http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97",reportContent:"福建火炬高新技术创业园主楼1号楼3层南4-2"}, */
				],
			};
		},
		onLoad() {
			this.queryAppMyExpenseOrder();
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			let list = [],
			params = this.params;
			params.pageIndex++;
			const paramsPayload = {
				apixkey: "queryAppMyExpenseOrder",
				payload: params,
				param:"userId="+Shell.UserInfo.id,
			}
			setTimeout(async () => {
				if (params.pageIndex > this.pageCount) {
					this.loadingType = 2;
					return;
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					list = response.data.records;
					//console.log(list)
					this.list = this.list.concat(list);
					this.loadingType = 0;
				}
			}, 800);
		},
		methods:{
			queryAppMyExpenseOrder(){
				const paramsPayload = {
					apixkey: "queryAppMyExpenseOrder",
					payload: this.params,
					param:"userId="+Shell.UserInfo.id,
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						this.list = response.data.records
						this.pageCount = response.data.pages
						if(response.data.total <= 10) {
							this.loadingType = 2;
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
