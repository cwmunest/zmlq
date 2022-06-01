<template>
	<view class="itemNewsBox" @click="onDetail">
		<view class="title">{{title}}</view>
		<view class="info">{{info}}</view>
		<view class="date">{{date}}</view>
	</view>
</template>

<script>
	export default {
		name:'itemNews',
		props:{
			title:{
				type:String,
				default() {
					return ''
				}
			},
			info:{
				type:String,
				default() {
					return ''
				}
			},
			date:{
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
			}
		}
	}
</script>

<style lang="scss">
	.itemNewsBox {
		background-color: $uni-bg-color;
		font-size: 24rpx;
		padding: 15rpx 0;
		border-bottom: 1rpx solid $uni-border-color;
		.title {
			font-size: 32rpx;
			color: #0f0f0f;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.info {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			color: #6f6565;
			margin: 15rpx 0;
		}
		.date {
			color: #999999;
		}
	}

</style>
