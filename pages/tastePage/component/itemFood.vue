<template>
	<view class="itemFoodBox">
		<view class="imgBox">
			<image :src="imgUrl" mode="aspectFill"></image>
			<view class="infoTxt">{{infoTxt}}</view>
		</view>
		<text>{{title}}</text>
	</view>
</template>

<script>
	export default {
		name:'itemFood',
		props:{
			imgUrl:{
				type:String,
				default() {
					return ''
				}
			},
			title:{
				type:String,
				default() {
					return ''
				}
			},
			infoTxt:{
				type:String,
				default() {
					return ''
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.itemFoodBox {
		width: 338rpx;
		margin-bottom: 37rpx;
		.imgBox {
			width: 100%;
			height: 247rpx;
			position: relative;
			border-radius: 14rpx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
			.infoTxt {
				height: 70rpx;
				width: 100%;
				line-height: 70rpx;
				padding: 0 24rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				color: #ffffff;
				position: absolute;
				bottom: 0;
				background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBIAwAAawBnG/9pxgAAAABJRU5ErkJggg==');
			}
		}
		text {
			color: #1b1b1b;
			font-size: 28rpx;
		}
	}
</style>
