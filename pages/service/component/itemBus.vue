<template>
	<view class="itemBusBox">
		<view class="infoBox">
			<view class="name">
				<view class="nameInfo">
					<image src="/static/images/common/bus.png" mode="widthFix"></image>
					<text>{{name}}</text>
				</view>
				<view class="openBox" @click="onOpen">
					<text>{{openState?'收起':'展开'}}</text>
					<image :class="openState?'openBoxImg':''" src="/static/images/user/arrowR.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="desc">
				{{desc}}
			</view>
		</view>

		<view class="detailInfo" v-show="openState">
			<view class="data">
				<text>发车时间:</text>
				<view class="dataDetail">
					<text>{{beginBus}}</text>
					<text>{{endDate}}</text>
				</view>
			</view>
			<view class="busStep">
				<text>停靠站:</text>
				<view class="detailBusStep">
					<view class="stepInfo" v-for="(item,index) in busList" :key="index">
						<label></label>
						<text>{{item.name}} </text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'itemBusBox',
		props: {
			name: {
				type: String,
				default () {
					return ''
				}
			},
			desc: {
				type: String,
				default () {
					return ''
				}
			},
			openState: {
				type: Boolean,
				default () {
					return false
				}
			},
			beginDate: {
				type: String,
				default () {
					return ''
				}
			},
			endDate: {
				type: String,
				default () {
					return ''
				}
			},
			beginBus: {
				type: String,
				default () {
					return ''
				}
			},
			endBus: {
				type: String,
				default () {
					return ''
				}
			},
			busList:{
				type:Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			onOpen() {
				this.$emit('onClick')
			}
		}
	}
</script>

<style lang="scss">
	.itemBusBox {
		border-bottom: 1rpx solid $uni-border-color;

		.infoBox {
			padding: 33rpx 28rpx;

			.name {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.nameInfo {
					display: flex;
					align-items: center;

					image {
						width: 22rpx;
						margin-right: 12rpx;
					}

					text {
						font-size: 30rpx;
					}
				}

				.openBox {
					display: flex;
					font-size: 24rpx;
					color: #bebdbd;
					align-items: center;

					image {
						width: 11rpx;
						margin-left: 14rpx;
					}
				}
				.openBoxImg {
					transform: rotate(90deg);
				}
			}

			.desc {
				font-size: 24rpx;
				color: #bebdbd;
				margin-top: 18rpx;
			}
		}


		.detailInfo {
			padding: 23rpx 29rpx;
			box-sizing: border-box;
			background-color: #f6fbff;
			font-size: 28rpx;

			text {
				margin-right: 23rpx;
			}

			.data {
				display: flex;
				align-items: flex-start;
				color: #0289e3;
				margin-bottom: 36rpx;

				.dataDetail {
					display: flex;
					flex-direction: column;
					width: 75%;
				}
			}

			.busStep {
				display: flex;
				align-items: flex-start;
				color: #282828;

				text {
					margin-right: 23rpx;
				}

				.detailBusStep {
					>view {
						&:not(:last-child) {
							margin-bottom: 47rpx;
							position: relative;

							&:after {
								content: '';
								position: absolute;
								width: 2rpx;
								height: 58rpx;
								background-color: #0289e3;
								top: 30rpx;
								left: 17rpx;
							}
						}
					}

					.stepInfo {
						display: flex;
						align-items: center;

						label {
							display: inline-block;
							width: 11rpx;
							height: 11rpx;
							border: 12rpx solid #0289e3;
							border-radius: 50%;
							background-color: #fff;
							margin-right: 13rpx;
						}
					}
				}
			}
		}
	}
</style>
