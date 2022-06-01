<template>
	<view class="produceBox" @click="onDetail">
		<image :src="imgUrl" mode="aspectFill"></image>
		<view class="infoBox">
			<view class="title">{{title}}</view>
			<view class="pInfo">
				<view class="price">
					预定 ¥<label>{{price}}</label>
				</view>
				<image src="/static/images/common/jiahao.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"itemProduct",
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
			price:{
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
				this.$emit('onDetail')
			}
		}
	}
</script>

<style lang="scss">
	.produceBox {
		width: 339rpx;
		height: 409rpx;
		background-color: $uni-bg-color;
		border-radius: 12rpx;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		margin-bottom: 25rpx;
		overflow: hidden;
		image {
			height: 282rpx;
			width: 100%;
		}
		.infoBox {
			padding: 0 20rpx;
			.title {
				font-size: 30rpx;
			}
			.pInfo {
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.price {
					color: #f74f2a;
					font-size: 24rpx;
					label {
						font-size: 30rpx;
					}
				}
				image {
					width: 36rpx;
				}
			}
		}
		
	}
</style>
