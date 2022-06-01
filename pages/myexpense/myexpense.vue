<template>
	<view class="x-panel x-full">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="消费记录" @clickLeft="goBack"></uni-nav-bar>
		<view class="x-list x-panel-content x-top-navbar">
			<block v-for="(item,index) in list" :key="index">
				<view class="list-item flex-column">
						<view class="cell-item"><view class="title">订购商品：</view><view class="value">{{item.specialty_name}}</view></view>
						<view class="cell-item"><view class="title">消费价格：</view><view class="value price">￥{{item.price}}</view></view>
						<view class="cell-item"><view class="title">订单时间：</view><view class="value">￥{{item.create_time}}</view></view>
				</view>
			</block>
			<view v-show="recordCount==0" class="x-no-data">暂无消费记录</view>
		<!-- <uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more> -->
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
				recordCount:0,
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
			this.queryAppMyExpenseRecord();
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
				apixkey: "queryAppMyExpenseRecord",
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
					list = response.data;
					//console.log(list)
					this.list = this.list.concat(list);
					this.loadingType = 0;
				}
			}, 800);
		},
		methods:{
			queryAppMyExpenseRecord(){
				const paramsPayload = {
					apixkey: "queryAppMyExpenseRecord",
					payload: this.params,
					param:"userId="+Shell.UserInfo.id,
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						this.list = response.data;
						this.recordCount=this.list.length;
						this.pageCount = response.data.pages
						/* if(response.data.total <= 10) {
							this.loadingType = 2;
						} */
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
