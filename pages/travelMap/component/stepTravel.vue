<template>
	<view class="stepTravelBox">
		<view class="listData">
			<view class="itemData" v-for="(item,index) in listData" :key="index">
				<view class="num" :class="index == listData.length - 1?'':'numLine'">{{index+1}}</view>
				<item-route-map :info="item" @onClick="goMap(item)"></item-route-map>
			</view>
		</view>
	</view>
</template>

<script>
	import itemRouteMap from '@/components/itemRouteMap.vue'
	export default {
		name: 'stepTravelBox',
		components:{itemRouteMap},
		props: {
			listData: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			goMap(info) {
				uni.openLocation({
					latitude:parseInt(info.longitude),
					longitude:parseInt(info.latitude),
					success() {
						console.log('成功')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.listData {
		.itemData {
			display: flex;
			align-items: center;
			padding: 16rpx 0;

			.num {
				width: 52rpx;
				height: 52rpx;
				background-color: #fff;
				border-radius: 50%;
				border: 8rpx solid #f5502c;
				color: #f5502c;
				font-size: 18rpx;
				text-align: center;
				line-height: 36rpx;
				box-sizing: border-box;
				margin-right: 21rpx;
			}
			.numLine {
				position: relative;
				&:after {
					position: absolute;
					content: '';
					width: 5rpx;
					background-color: #f3f3f3;
					height: 146rpx;
					left: 18rpx;
					top: 44rpx;
				}
			}
		}
	}
</style>
