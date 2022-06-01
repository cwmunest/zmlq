<template>
	<!-- 周边推荐列表 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" right-text="地图模式" @clickLeft="goBack" @clickRight="goMap">
			<view slot="default" class="searchInput">
				<image src="/static/images/common/sousuo.png" mode="widthFix"></image>
				<input type="text" placeholder="关键字搜索" placeholder-class="pla" />
			</view>
		</uni-nav-bar>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="itemBox">
					<item-route-map :info="item" @onClick="goWay(item)"></item-route-map>
				</view>
				
			</block>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import itemRouteMap from '@/components/itemRouteMap.vue';
	import {backTo,linkTo} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar,
			itemRouteMap
		},
		data() {
			return {
				goBack:backTo,
				list:[]
				
			};
		},
		onLoad() {
			const _this = this
			_this.queryAppAroundList(_this)
		},
		methods:{
			queryAppAroundList: async (_this) => {
				const paramsPayload = {
					apixkey: "queryAppAroundList",
					payload: {}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					_this.list = response.data
				}
			},
			goWay(info) {
				uni.openLocation({
					latitude:parseInt(info.longitude),
					longitude:parseInt(info.latitude),
					success() {
						console.log('成功')
					}
				})
			},
			goMap() {
				linkTo('/pages/rimRecommendMap/rimRecommendMap')
			}
		}
	}
</script>

<style lang="scss">
	.searchInput {
		display: flex;
		align-items: center;
		width: 432rpx;
		height: 64rpx;
		background-color: #ffffff;
		border-radius: 32rpx;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
	
		image {
			width: 33rpx;
		}
	
		input {
			margin-left: 28rpx;
			font-size: 26rpx;
		}
	
		.pla {
			color: #9f9090;
		}
	}
	.list {
		padding: 0 30rpx;
		.itemBox {
			padding: 30rpx 0;
		}
	}

</style>
