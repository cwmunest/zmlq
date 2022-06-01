<template>
	<view class="cellBox" @click="onDetail">
		<view class="title">{{title}}</view>
		<view class="value" v-if="value">{{value}}</view>
		<view v-else>
			<slot name="value"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:'cell',
		props:{
			title:{
				type:String,
				default() {
					return ''
				}
			},
			value:{
				type:String,
				default() {
					return ''
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			onDetail() {
				this.$emit('onClick')
			},
		}
	}
</script>

<style lang="scss">
	.cellBox {
		padding: 42rpx 0;
		background-color: $uni-bg-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid $uni-border-color;
		.title {
			font-size: 30rpx;
			color: #1b1b1b;
			width: 62%;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
		}
		.value {
			color: $uni-text-color;
			font-size: 24rpx;
		}
	}

</style>
