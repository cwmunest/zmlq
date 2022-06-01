<template>
	<view class="tabsBox">
		<view class="itemTabs" :class="cur == index ?'active':''" v-for="(item,index) in tabsList" :key="index" @click="onChiose(index)">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		name:'tabs',
		props:{
			tabsList:{
				type:Array,
				default() {
					return []
				}
			},
			cur:{
				type:Number,
				default() {
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
		height: 90rpx;
		font-size: 28rpx;
		background-color: #fff4f4;
		color: #f30b0b;
		.itemTabs {
			width: 50%;
			height: 100%;
			text-align: center;
			line-height: 90rpx;
		}
		.active {
			border-bottom: 5rpx solid #f30b0b;
		}
	}

</style>
