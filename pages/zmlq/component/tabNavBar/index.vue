<template>
	<view class="tabNavMenu">
		<view class="inner">
			<view class="tabNavHd">
				<view :class="{'item':true,'on': item.key===currentKey }" v-for="(item, index) in tabs" :key="item.key" @tap="titleOnClick(item.key)">
					<view class="name">{{item.name}}</view>
					<view class="line"></view>
				</view>

			</view>
			<view class="tabNavBd">
				<view :class="{'bdCon':true,'hidden': 'meet'!==currentKey }">
					<navigator :url="item.path+'?title='+item.title+'&category='+item.category" hover-class="none" class="item" v-for="(item, index) in info"
					 :key="index">
						<image :src="item.url" mode="scaleToFill">
					</navigator>
				</view>
				<view :class="{'bdCon':true,'hidden': 'walkInto' !== currentKey }">
					<view class="walkIntoTabCon">
						<view class="leftAside">
							<view class="con">
								<view class="b">{{walkIntoData.temperature}}</view>
							</view>
							<view class="brief">
								<view class="icon"></view>
								<view class="text">{{walkIntoData.weather}}</view>
							</view>
						</view>
						<view class="rightCon">
							<image :src="walkIntoData.dayPictureUrl" mode="aspectFill" class="weatherImg"></image>

						</view>

					</view>
				</view>
				<view :class="{'bdCon':true,'hidden': 'overnight'!==currentKey }">
					<view class="stayBox">
						<image :src="overNightData.coverImage" mode="aspectFit"></image>
					</view>
				</view>
				<view :class="{'bdCon':true,'hidden': 'taste'!==currentKey }">
					<view class="tasteBox">
						<navigator :url="item.path" hover-class="none" v-for="(item,index) in tasteData" :key="index">
							<image :src="item.url" mode="aspectFill"></image>
						</navigator>

					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import Customspng from '@/static/images/zmlq/Customs.png';
	import notablepng from '@/static/images/zmlq/notable.png';
	import Historypng from '@/static/images/zmlq/History.png';
	import sourcepng from '@/static/images/zmlq/source.png';
	import sunny2png from '@/static/images/zmlq/weather/sunny-2.png';
	import ad1png from '@/static/images/zmlq/overnight/ad1.png'
	import shoppingpng1 from '@/static/images/zmlq/taste/Delicious.png'
	import shoppingpng2 from '@/static/images/zmlq/taste/shopping.png'
	import shoppingpng3 from '@/static/images/zmlq/taste/entertainment.png'
	export default {
		name: "tabNavBar",
		props: {
			info: {
				type: Array,
				default () {
					return [{
							url: Customspng,
							path: '/pages/pageList/pageList',
							title: '琅岐风俗',
							category: 'lq_custom'
						},
						{
							url: Historypng,
							path: '/pages/pageList/pageList',
							title: '琅岐历史',
							category: 'lq_history'
						},
						{
							url: notablepng,
							path: '/pages/pageImgList/pageImgList',
							title: '琅岐名人',
							category: 'lq_celebrity'
						},
						{
							url: sourcepng,
							path: '/pages/pageImgList/pageImgList',
							title: '同根同源',
							category: 'same_homology'
						}
					]
				}
			},
			walkIntoData: {
				type: Object,
				default () {
					return {
						minDegree: 5,
						maxDegree: 15,
						weatherPic: sunny2png,
					}
				}
			},
			overNightData: {
				type: Object,
				default () {
					return {
						stayPic: ad1png
					}
				}
			},
			tasteData: {
				type: Array,
				default () {
					return [{
							url: shoppingpng1,
							path: '/pages/tastePage/tastePage?cur=0'
						},
						{
							url: shoppingpng2,
							path: '/pages/tastePage/tastePage?cur=1'
						},
						{
							url: shoppingpng3,
							path: '/pages/tastePage/tastePage?cur=2'
						}
					]
				}
			}

		},
		data() {
			return {
				tabs: [{
					key: "meet",
					name: "遇见琅岐"
				}, {
					key: "walkInto",
					name: "走进琅岐"
				}, {
					key: "overnight",
					name: "夜宿琅岐"
				}, {
					key: "taste",
					name: "品味琅岐"
				}],
				currentKey: 'meet',
			}
		},
		mounted() {
			
		},
		methods: {
			titleOnClick(key) {
				this.currentKey = key;
				this.$emit('curTabkey', key);
			},

		}
	}
</script>

<style lang="scss" scoped>
	.tabNavMenu {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;

		.inner {
			width: 100%;

			.tabNavHd {
				height: 60rpx;
				display: flex;
				align-items: center;
				font-size: 30rpx;
				;

				.item {
					flex: 1;
					display: flex;
					text-align: center;
					position: relative;
					height: 100%;
					width: 100%;

					.name {

						display: inline-block;
						width: 100%;
						text-align: center;
					}

					&.on {
						.line {
							display: block;
						}

						color:$uni-color-primary;
						font-weight: bold;
					}

					.line {
						display: none;
						position: absolute;
						z-index: 1;
						left: 0;
						bottom: 2rpx;
						width: 100%;
						height: 5rpx;
						background: $uni-color-primary;

						&::after {
							content: "";
							width: 0;
							height: 0;
							background: $uni-color-primary;
							border-color: rgba(255, 255, 255, 1) rgba(255, 255, 255, 1) $uni-color-primary rgba(255, 255, 255, 1);
							border-style: solid;
							border-width: 0 8rpx 10rpx 8rpx;
							display: inline-block;
							position: absolute;
							z-index: 1;
							left: 50%;
							margin-left: -6rpx;
							bottom: 5rpx;
							// transform: rotate(45deg);
							;
						}
					}
				}
			}

			.tabNavBd {
				width: 100%;
				// overflow: hidden;
				padding-top: 14rpx;

				// height:190rpx;
				.bdCon {
					display: flex;
					flex-wrap: nowra p;
					width: 100%;
					height: 100%;

					&.hidden {
						display: none;
					}

					.item {
						flex: 1;
						flex-basis: 25%;
						padding-right: 10rpx;
						position: relative;
						height: 190rpx;

						uni-image {
							width: 100%;
							height: 100%;
							;
						}
					}

					;
				}


			}
		}
	}

	/*走进琅岐*/
	.walkIntoTabCon {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 190rpx;
		align-items: center;

		.leftAside {
			max-width: calc(100% - 140rpx);
			display: flex;
			flex: 1;
			flex-direction: column;

			.con {
				width: 100%;
				display: flex;
				align-items: center;
				flex: 1;
				height: 60rpx;

				.b {
					font-weight: bold;
					font-size: 36rpx;
				}
			}

			.brief {
				height: 60rpx;
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 28rpx;

				.icon {
					width: 35rpx;
					height: 35rpx;
					background: url("../../../../static/images/zmlq/weather/icon_zwx.png") no-repeat left top;
					background-size: 100%;

				}

			}
		}

		.rightCon {
			width: 110rpx;
			height: 110rpx;
			position: relative;
			padding-left: 30rpx;

			&:after {
				content: '';
				width: 1rpx;
				height: 70rpx;
				position: absolute;
				z-index: 1;
				left: 0;
				top: 50%;
				margin-top: -35rpx;
				background: $uni-border-color;
			}

			.weatherImg {
				width: 100%;
				height: 100%;
				border-radius: 13rpx;
			}
		}

	}

	.stayBox {
		width: 100%;

		image {
			width: 100%;
			height: 325rpx;
		}
	}

	.tasteBox {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		image {
			width: 204rpx;
			height: 257rpx;
		}
	}
</style>
