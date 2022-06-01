<template>
	<view class="tabsBox">
		<view class="itemTabs" :class="cur == index ?'active':''" v-for="(item,index) in tabsList" :key="index" @click="onChiose(index)">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabs",
		props: {
			tabsList: {
				type: Array,
				default () {
					return []
				}
			},
			cur: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			onChiose(index) {
				this.$emit('onClick',index)
			}
		}
		
	}
</script>

<style lang="scss">
	.tabsBox {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.itemTabs {
			font-size: 28rpx;
			color: #1b1b1b;
			padding: 20rpx 27rpx;
			border-radius: 12rpx;
			border: solid 1rpx #bfbfbf;
			background-color: $uni-bg-color;
			margin-right: 17rpx;
			
		}
		.active {
			border-color: #0289e3;
			color: #0289e3;
		}
	}
</style>
