<template>
	<view class="itemRouteBox" @click="onDetail">
		<view class="name">
			<view class="num">{{num}}</view>
			<view class="nameInfo">{{name}}</view>
		</view>
		<view class="mapBox">
			<image :src="imgUrl" mode="aspectFill"></image>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'itemRouteBox',
		props: {
			num: {
				type: Number,
				default () {
					return 1
				}
			},
			name: {
				type: String,
				default () {
					return ''
				}
			},
			imgUrl: {
				type: String,
				default () {
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
	.itemRouteBox {
		display: flex;
		flex-direction: column;
		display: inline-block;
		margin-left: 25rpx;

		.name {
			display: flex;
			margin-bottom: 16rpx;

			.num {
				width: 56rpx;
				height: 55rpx;
				background-color: #f3faff;
				border-radius: 12rpx;
				font-size: 28rpx;
				color: #0289e3;
				margin-right: 11rpx;
				text-align: center;
				line-height: 55rpx;
			}

			.nameInfo {
				font-size: 30rpx;
				color: #3d4042;
			}
		}

		.mapBox {
			width: 367rpx;
			height: 286rpx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
