<template>
	<view class="itemRouteMap">
		<image :src="info.image" mode="aspectFill"></image>
		<view class="info">
			<view class="title">{{info.name}}</view>
			<view class="desc">{{info.address}}</view>
			<view class="mapBtn" @click="onWay">
				<text>带我去</text>
				<image src="/static/images/common/daohang.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name:'itemRouteMap',
		props:{
			info:{
				type:Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				
				
			};
		},
		methods:{
			onWay() {
				this.$emit('onClick')
			}
			
		}
	}
</script>

<style lang="scss">
	.itemRouteMap {
		display: flex;
		align-items: center;
		width: 100%;
	
		image {
			width: 247rpx;
			height: 166rpx;
			border-radius: 14rpx;
		}
		.info {
			padding-top: 22rpx;
			padding-left: 20rpx;
			width: calc(100% - 267rpx);
			height: 166rpx;
			margin-left: 20rpx;
			box-sizing: border-box;
			.title {
				font-size: 28rpx;
				color: #1b1b1b;
				margin-bottom: 20rpx;
			}
			.desc {
				font-size: 24rpx;
				color: #999999;
				margin-bottom: 19rpx;
			}
			.mapBtn {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-size: 24rpx;
				color: #0289e3;
				image {
					width: 48rpx;
					margin-left: 11rpx;
				}
			}
		}
	}

</style>
