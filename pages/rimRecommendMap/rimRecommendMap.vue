<template>
	<!-- 周边推荐地图 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="周边推荐" @clickLeft="goBack"></uni-nav-bar>
		<view class="mapMain">
			<map :latitude="latitude" :longitude="longitude" class="mapBox" scale="11" :markers="markers" @markertap="onmarkertap"></map>
			<navigator url="../rimRecommendList/rimRecommendList" hover-class="none" class="listBtn">
				<image src="/static/images/common/list.png" mode="widthFix"></image>
				<text>列表</text>
			</navigator>
			<view class="listMenu">
				<view class="menuItem" v-for="(item,index) in menuItem" :key="index" @click="goDetail(item)">
					<image :src="item.iconUrl" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom" :isMask="false">
			<view class="popUbox">
				<view class="imgBox">
					<image :src="info.image" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="name">
						<text>{{info.name}}</text>
						<!-- <text class="labelTxt">超市</text> -->
					</view>
				</view>
				<view class="detailInfo">
					<view class="dItem">
						<view class="dItemL">
							<image src="/static/images/common/didian.png" mode="widthFix"></image>
							<text>{{info.address}}</text>
						</view>
						<image src="/static/images/common/arrowR.png" mode="widthFix"></image>
					</view>
					<view class="dItem">
						<view class="dItemL">
							<image src="/static/images/common/dianhua.png" mode="widthFix"></image>
							<text>{{info.phone}}</text>
						</view>
						<image src="/static/images/common/arrowR.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="btn" @click="goPage(info.id)">查看详情</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import {backTo,linkTo} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	import icon1 from '@/static/images/common/yiyuan.png';
	import icon2 from '@/static/images/common/yinhang.png';
	import icon3 from '@/static/images/common/dayin.png';
	import icon4 from '@/static/images/common/dayin.png';
	export default {
		components: {
			uniNavBar,
			uniPopup
		},
		data() {
			return {
				goBack:backTo,
				latitude: null,
				longitude: null,
				markers: [],
				includePoints: [],
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
						name: '更多',
						type: 2,
						path:'../rimRecommendMapMore/rimRecommendMapMore'
					},
				],
				info:{}
			};
		},
		onLoad() {
			uni.getLocation({
				success(res) {
					console.log(res)
				},
				fail(err) {
					console.log(err)
				},
				complete(a) {
					console.log(a)
				}
			})

		},
		onLoad() {
			const _this = this
			_this.queryAppAroundList(_this)
		},
		mounted() {
			// this.$refs.popup.open()

		},
		methods: {
			queryAppAroundList: async (_this) => {
				
				const paramsPayload = {
					apixkey: "queryAppAroundList",
					payload: {}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data,
						markers = []
					_this.latitude = data[0].longitude
					_this.longitude = data[0].latitude
					data.forEach((val,index)=>{
						let markerObj = {}
						markerObj.id = index
						markerObj.latitude = val.longitude
						markerObj.longitude = val.latitude
						markerObj.iconPath = '/static/images/common/jingdian.png'
						markers.push(markerObj)
					})
					_this.markers = markers
					_this.list = data
				}
			},
			onmarkertap(e) {
				console.log(e)
				let list = this.list
				this.info = list[e.detail.markerId]
				this.$refs.popup.open()
				
			},
			goDetail(item) {
				switch (item.type) {
					case 2:
					linkTo(item.path)
						break;
					default:
						break;
				}
			},
			goPage(id) {
				linkTo('/pages/travelDetail/travelDetail?id='+id+'&type=around')
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

		.listBtn {
			width: 88rpx;
			height: 85rpx;
			background-color: #ffffff;
			border-radius: 18rpx;
			opacity: 0.8;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 22rpx;
			color: #4f4f4f;
			position: absolute;
			top: 30rpx;
			left: 30rpx;

			image {
				width: 31rpx;
				margin-top: 9rpx;
			}
		}

		.listMenu {
			width: 88rpx;
			height: 332rpx;
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////GQAJyAPKSOz6nwAAAABJRU5ErkJggg==');
			border-radius: 18rpx;
			position: absolute;
			top: 30rpx;
			right: 25rpx;
			display: flex;
			flex-direction: column;

			.menuItem {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				font-size: 22rpx;
				color: #4f4f4f;
				height: 83rpx;

				image {
					width: 36rpx;
					height: 34rpx;
				}
			}

			>view {
				&:not(:last-child) {
					border-bottom: 1rpx solid #ddd;
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
