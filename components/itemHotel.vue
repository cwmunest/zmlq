<template>
	<view class="hotelBox" @click="onDetail">
		<image :src="imgUrl" mode="aspectFill"></image>
		<view class="hotelInfo">
			<view class="hotelT">
				<view class="title">{{title}}</view>
				<view class="address">{{desc}}</view>
			</view>
			<view class="hotelB" :style="{justifyContent:(stars?'space-between':'flex-end')}">
				<view class="stars" v-if="stars" :style="{borderColor:starsBg,color:starsBg}">{{stars}}</view>
				<view class="priceBox" v-if="price">
					¥<text>{{price}}</text>起
				</view>
			</view>
	
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'itemHotel',
		props: {
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
			desc:{
				type:String,
				default() {
					return ''
				}
			},
			stars:{
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
			},
			starsBg:{
				type:String,
				default() {
					return '#0289e3'
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
	.hotelBox {
		display: flex;
		align-items: center;
		padding: 25rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
		background-color: $uni-bg-color;
		
		image {
			width: 307rpx;
			height: 216rpx;
			border-radius: 14rpx;
			margin-right: 23rpx;
		}
	
		.hotelInfo {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 216rpx;
			width: calc(100% - 330rpx);
	
			.hotelT {
				.title {
					font-size: 32rpx;
					color: #1b1b1b;
					margin-bottom: 30rpx;
				}
	
				.address {
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
	
			}
	
			.hotelB {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				.stars {
					padding: 5rpx 7rpx;
					border-style: solid;
					border-width: 1rpx;
					font-size: 24rpx;
					text-align: center;
					line-height: 33rpx;
				}
				.priceBox {
					display: flex;
					align-items: flex-end;
					color: #f74f2a;
					font-size: 24rpx;
					text {
						font-size: 44rpx;
						font-weight: bold;
						line-height: 44rpx;
					}
				}
			}
	
	
	
		}
	}
</style>
