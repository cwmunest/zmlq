<template>
	<view class="itemCouponBox" :style="{backgroundImage:'url('+(info.is_used == 1?bg2:bg1)+')'}" @click="onDetail">
		<view class="price">
			<view class="priceInfo">
				<label>¥</label>{{info.price}}
			</view>
			<text>{{info.business}}</text>
		</view>
		<view class="infoBox">
			<text>{{info.name}}</text>
			<view class="date">
				<text>{{info.useTime}}</text>
				<view class="dateLabel" v-if="type == 'mine'" :class="info.is_used == 1?'dateLabelNone':''">{{info.is_used == 1?'已使用':'未使用'}}</view>
				<view class="dateLabel" v-else @click.stop="onMake">领取</view>
			</view>
			<view class="desc">{{info.fullReduction}}</view>
		</view>
	</view>
</template>

<script>
	import bg1 from '@/static/images/common/coupon1.png';
	import bg2 from '@/static/images/common/coupon2.png';
	export default {
		name: 'itemCouponBox',
		props: {
			info: {
				type: Object,
				default () {
					return {}
				}
			},
			type:{
				type: String,
				default () {
					return 'mine'
				}
			}
		},
		data() {
			return {
				bg1: bg1,
				bg2: bg2

			};
		},
		methods:{
			onDetail() {
				this.$emit('onClick')
			},
			onMake() {
				this.$emit('onMake')
			}
		}
	}
</script>

<style lang="scss">
	.itemCouponBox {
		height: 219rpx;
		width: 719rpx;
		background-size: contain;
		margin: 0 auto;
		display: flex;
		align-items: center;

		.price {
			display: flex;
			align-items: center;
			flex-direction: column;
			color: #fff;
			width: 32%;

			.priceInfo {
				font-size: 80rpx;

				label {
					font-size: 24rpx;
				}
			}

			text {
				font-size: 25rpx;
			}
		}

		.infoBox {
			width: 68%;
			padding: 30rpx 33rpx 18rpx;
			box-sizing: border-box;

			text {
				font-size: 32rpx;
			}

			.date {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				padding-bottom: 25rpx;
				border-bottom: 1rpx solid $uni-border-color;

				text {
					font-size: 24rpx;
					color: #999999;
				}

				.dateLabel {
					width: 132rpx;
					height: 38rpx;
					background-color: #f74f2a;
					border-radius: 18rpx;
					font-size: 24rpx;
					color: #ffffff;
					text-align: center;
					line-height: 38rpx;
				}
				.dateLabelNone {
					background-color: #bdbdbd;
				}
			}
			.desc {
				padding-top: 10rpx;
				font-size: 24rpx;
				color: #747474;
			}
		}
	}
</style>
