<template>
	<!-- 周边推荐地图更多 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="周边推荐" @clickLeft="goBack"></uni-nav-bar>
		<view class="mapMain">
			<map id="mapBox" :latitude="latitude" :longitude="longitude" class="mapBox" scale="13" :markers="markers"
			 :include-points="includePoints"></map>
			<view class="listMenu">
				<view class="menuItem" v-for="(item,index) in menuItem" :key="index" @click="getQueryItem(item.name)">
					<view class="menuItemImg">
						<image :src="item.iconUrl" mode="aspectFill"></image>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom" :isMask="false">
			<view class="popUbox">
				<view class="imgBox">
					<image src="http://5b0988e595225.cdn.sohucs.com/images/20200101/809d314772fb41cfaa1850263e34ba87.jpeg" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="name">
						<text>永辉超市</text>
						<text class="labelTxt">超市</text>
					</view>
				</view>
				<view class="detailInfo">
					<view class="dItem">
						<view class="dItemL">
							<image src="/static/images/common/didian.png" mode="widthFix"></image>
							<text>福建省福州市马尾区琅岐岛</text>
						</view>
						<image src="/static/images/common/arrowR.png" mode="widthFix"></image>
					</view>
					<view class="dItem">
						<view class="dItemL">
							<image src="/static/images/common/dianhua.png" mode="widthFix"></image>
							<text>0591-83601002</text>
						</view>
						<image src="/static/images/common/arrowR.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="btn">查看详情</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import {
		backTo,
		linkTo
	} from '@/utils/utils.js';
	import icon1 from '@/static/images/common/yiyuan.png'
	import icon2 from '@/static/images/common/yinhang.png'
	import icon3 from '@/static/images/common/dayin.png'
	import icon4 from '@/static/images/common/train.png'
	import icon5 from '@/static/images/common/canting.png'
	import icon6 from '@/static/images/common/cesuo.png'
	import icon7 from '@/static/images/common/xiangyan.png'
	import icon8 from '@/static/images/common/KTV.png'
	export default {
		components: {
			uniNavBar,
			uniPopup
		},
		data() {
			return {
				goBack: backTo,
				latitude: 26.080234,
				longitude: 119.301889,
				markers: [],
				includePoints: [{
						latitude: 26.080234,
						longitude: 119.301889,
					},
					{
						latitude: 26.090618,
						longitude: 119.303326,
					},
					{
						latitude: 26.068616,
						longitude: 119.323233,
					}
				],
				menuItem: [{
						iconUrl: icon1,
						name: '医院',
					},
					{
						iconUrl: icon2,
						name: '银行',
					},
					{
						iconUrl: icon3,
						name: '打印店',
					},
					{
						iconUrl: icon4,
						name: '地铁',
					},
					{
						iconUrl: icon5,
						name: '餐厅',
					},
					{
						iconUrl: icon6,
						name: '厕所',
					},
					{
						iconUrl: icon7,
						name: '香烟店',
					},
					{
						iconUrl: icon8,
						name: 'KTV',
					}
				],
				key : 'qfbWkNxDEIPWb4ZilUybX88szYnv3Y50',
			};
		},
		onLoad() {
			let map = uni.createMapContext('map')
			this.getQueryItem('医院')
			

		},
		mounted() {
			// this.$refs.popup.open()

		},
		methods:{
			getQueryItem(name) {
				this.$jsonp('https://apis.map.qq.com/ws/place/v1/search',{
					key:'7EUBZ-2NICG-UJ2Q3-IKWBX-JF7ZS-I5B5L',
					boundary:`nearby(${this.latitude},${this.longitude},1000)`,
					keyword:name,
					output:'jsonp'
				}).then(res=>{
					let data = res.data
					let markers = []
					data.forEach(val=>{
						let arr = []
						arr.latitude = val.location.lat
						arr.longitude = val.location.lng
						arr.iconPath = '/static/images/common/jingdian.png'
						markers.push(arr)
					})
					this.markers = markers
				})
			}
		}
	}
</script>

<style lang="scss">
	.mapMain {
		position: relative;

		.mapBox {
			width: 100%;
			height: 100vh;
		}

		.listMenu {
			width: 698rpx;
			min-height: 460rpx;
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////GQAJyAPKSOz6nwAAAABJRU5ErkJggg==');
			border-radius: 18rpx;
			position: absolute;
			top: 20rpx;
			left: calc(50% - 349rpx);
			display: flex;
			flex-wrap: wrap;

			.menuItem {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 25%;
				font-size: 22rpx;
				color: #4f4f4f;

				.menuItemImg {
					width: 107rpx;
					height: 107rpx;
					background-color: #f4f4f4;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 13rpx;

					image {
						width: 50rpx;
						height: 50rpx;

					}
				}

			}
		}
	}

	.popUbox {
		width: 100%;
		background-color: #fff;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		box-sizing: border-box;
		overflow: hidden;

		.imgBox {
			height: 345rpx;
			width: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			padding: 30rpx 30rpx 0;

			.name {
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				text {
					font-size: 34rpx;
					color: #1b1b1b;
					margin-bottom: 19rpx;
				}

				.labelTxt {
					border: solid 1rpx #0289e3;
					font-size: 24rpx;
					color: #0289e3;
					padding: 5rpx 10rpx;
				}

			}
		}

		.detailInfo {
			.dItem {
				padding: 22rpx 36rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid $uni-border-color;

				.dItemL {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					color: #141414;

					image {
						width: 18rpx;
						margin-right: 15rpx;
					}
				}

				image {
					width: 11rpx;
				}
			}
		}

		.btn {
			width: 565rpx;
			height: 82rpx;
			background-color: #0289e3;
			border-radius: 12rpx;
			font-size: 30rpx;
			color: #ffffff;
			line-height: 82rpx;
			text-align: center;
			margin: 22rpx auto;
		}

		.popContent {
			height: 100%;
		}
	}
</style>
